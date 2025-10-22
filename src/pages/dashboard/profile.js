import { useEffect, useState } from "react";
import { Loader2, Save, Upload } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 🟢 دریافت اطلاعات کاربر لاگین‌شده
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/proxy/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "خطا در دریافت اطلاعات");
        setUser(data);
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت اطلاعات کاربر");
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchProfile();
  }, [token]);

  // 📤 بروزرسانی اطلاعات کاربر
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/proxy/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "خطا در ذخیره تغییرات");
      alert("✅ تغییرات ذخیره شد");
    } catch (err) {
      console.error(err);
      setError("❌ ذخیره تغییرات با خطا مواجه شد");
    } finally {
      setSaving(false);
    }
  };

  // تغییر مقدار فیلدها
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        در حال بارگذاری پروفایل...
      </div>
    );

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
              src={user.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 mb-3"
            />
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <Upload className="w-4 h-4" />
              تغییر تصویر
            </button>
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
