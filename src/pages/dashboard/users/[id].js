import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import { useApi } from "@/hooks/useApi";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function EditUserPage() {
  const router = useRouter();
  const { id } = router.query;

  const api = useApi();

  const {
    loading: authLoading,
    accessDenied,
    isAuthenticated,
  } = useAuthGuard({
    allowedRoles: ["admin"],
  });


  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 📦 دریافت اطلاعات کاربر
  useEffect(() => {
    if (
      !id ||
      authLoading ||
      accessDenied ||
      !isAuthenticated
    ) {
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);

        const data = await api.get(
          `/api/proxy/dashboard/users/${id}`
        );

        setUser(data);
      } catch (err) {
        console.error("خطا در دریافت اطلاعات کاربر:", err);
        setError("خطا در دریافت اطلاعات کاربر");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [
    id,
    authLoading,
    accessDenied,
    isAuthenticated,
    api,
  ]);

  // 📤 ارسال تغییرات به سرور
    const handleSave = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      await api.put(
        `/api/proxy/dashboard/users/${id}`,
        user
      );

      alert("✅ تغییرات با موفقیت ذخیره شد");

      router.push("/dashboard/users");
    } catch (err) {
      console.error(err);
      setError("❌ ذخیره تغییرات با خطا مواجه شد");
    } finally {
      setSaving(false);
    }
  };

  // 📋 تابع برای بروزرسانی فیلدها
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (
    authLoading ||
    !isAuthenticated
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        دسترسی مجاز نیست
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        در حال بارگذاری اطلاعات...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error || "کاربر یافت نشد"}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-100">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            ویرایش کاربر
          </h1>

          <form onSubmit={handleSave} className="space-y-4">
            {/* نام */}
            <div>
              <label className="block text-sm font-medium mb-1">نام</label>
              <input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* ایمیل */}
            <div>
              <label className="block text-sm font-medium mb-1">ایمیل</label>
              <input
                type="email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* شماره تلفن */}
            <div>
              <label className="block text-sm font-medium mb-1">شماره تلفن</label>
              <input
                type="text"
                name="phone"
                value={user.phone || ""}
                onChange={handleChange}
                placeholder="مثلاً 09123456789"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* نقش */}
            <div>
              <label className="block text-sm font-medium mb-1">نقش</label>
              <select
                name="role"
                value={user.role || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="user">کاربر</option>
                <option value="reporter">خبرنگار</option>
                <option value="admin">ادمین</option>
              </select>
            </div>

            {/* وضعیت فعال */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="active"
                checked={!!user.active}
                onChange={handleChange}
              />
              <label className="text-sm font-medium">فعال</label>
            </div>

            {/* crawlerAdmin */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="crawlerAdmin"
                checked={!!user.crawlerAdmin}
                onChange={handleChange}
              />
              <label className="text-sm font-medium">Crawler Admin</label>
            </div>

            {/* خطا */}
            {error && (
              <p className="text-sm text-red-500 border-t pt-2">{error}</p>
            )}

            {/* دکمه‌ها */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.push("/dashboard/users")}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
              >
                بازگشت
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
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
      </div>
    </div>
  );
}
