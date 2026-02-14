//pages/dashboard/profile.js
import { useEffect, useState, useRef  } from "react";
import { Loader2, Save, Upload } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useApi } from "@/hooks/useApi";

const imageBase = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function Profile() {
  // ✅ همه کاربران لاگین شده می‌توانند ببینند
  const { loading: authLoading, accessDenied } = useAuthGuard();

  const api = useApi();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  // 🟢 دریافت اطلاعات کاربر
  useEffect(() => {
    if (authLoading || accessDenied) return;

    const fetchProfile = async () => {
      try {
        const data = await api.get("/api/proxy/user/me");
        setUser(data.user || data); // بستگی به بک‌اند
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت اطلاعات کاربر");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authLoading, accessDenied]);

  // پیش‌نمایش آواتار انتخاب شده
  useEffect(() => {
    if (avatarFile) {
      const url = URL.createObjectURL(avatarFile);
      setAvatarPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setAvatarPreview(null);
    }
  }, [avatarFile]);

  const handleChooseAvatar = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return alert("لطفاً فقط فایل تصویری انتخاب کنید.");
    if (file.size > 2 * 1024 * 1024) return alert("حجم فایل نباید بیشتر از 2MB باشد.");

    setAvatarFile(file);
  };

  const handleUploadAvatar = async () => {
    if (!avatarFile) return alert("ابتدا یک تصویر انتخاب کنید.");
    setSaving(true);

    try {
      const form = new FormData();
      form.append("avatar", avatarFile);

      const data = await api.post("/api/proxy/user/me", form, {
        // Content-Type را نریزید
      });

      setUser((prev) => ({ ...prev, avatar: data.avatar }));
      setAvatarFile(null);
      alert("تصویر پروفایل با موفقیت آپلود شد.");
    } catch (err) {
      console.error(err);
      alert("خطا در آپلود تصویر.");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.put("/api/proxy/user/me", user);
      alert("✅ تغییرات ذخیره شد");
    } catch (err) {
      console.error(err);
      setError("❌ ذخیره تغییرات با خطا مواجه شد");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  if (authLoading || loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        در حال بارگذاری پروفایل...
      </div>
    );

  if (accessDenied)
    return <div className="flex items-center justify-center h-screen text-red-500">دسترسی مجاز نیست</div>;

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error || "کاربر یافت نشد"}
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
            پروفایل من
          </h1>

          {/* تصویر آواتار */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={
                avatarPreview || 
                (user?.avatar 
                  ? `${imageBase}${user.avatar}` 
                  : "/images/default-avatar.jpg"
                )
              }
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 mb-3"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleChooseAvatar}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
              >
                <Upload className="w-4 h-4" />
                انتخاب تصویر
              </button>

              {avatarFile && (
                <>
                  <button
                    type="button"
                    onClick={handleUploadAvatar}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                    disabled={saving}
                  >
                    {saving ? "در حال آپلود..." : "آپلود"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setAvatarFile(null)}
                    className="px-3 py-1 bg-gray-300 text-sm rounded"
                  >
                    لغو
                  </button>
                </>
              )}
            </div>
          </div>


          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                نام
              </label>
              <input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                ایمیل
              </label>
              <input
                type="email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                شماره تلفن
              </label>
              <input
                type="text"
                name="phone"
                value={user.phone || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* 🔹 تاریخ ثبت‌نام (غیرقابل ویرایش) */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                تاریخ ثبت‌نام
              </label>
              <input
                type="text"
                value={
                  user.createdAt
                    ? `${new Date(user.createdAt).toLocaleDateString("fa-IR")} ساعت ${new Date(
                        user.createdAt
                      ).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })}`
                    : "-"
                }
                readOnly
                className="w-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-400 cursor-not-allowed"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 border-t pt-2">{error}</p>
            )}

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> در حال ذخیره
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> ذخیره تغییرات
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
