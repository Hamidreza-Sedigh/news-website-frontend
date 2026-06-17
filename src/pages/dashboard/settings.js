// pages/dashboard/settings.js
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/context/AuthContext";

export default function Settings() {
  const api = useApi();
  const { logout } = useAuth();
  const { loading, accessDenied } = useAuthGuard({
    onRoleFail: "redirect", // نقش‌ها برای همه کاربرها قابل دسترسی
    redirectPath: "/login",
  });

  const [settings, setSettings] = useState({
    darkMode: true,
    emailNotifications: false,
  });

  const toggleDarkMode = () =>
    setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }));

  const toggleEmailNotifications = () =>
    setSettings((prev) => ({
      ...prev,
      emailNotifications: !prev.emailNotifications,
    }));

  if (loading)
    return <p className="p-6">در حال بارگذاری...</p>;

  if (accessDenied) return null; // چون redirect انجام می‌شود

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "آیا از حذف حساب کاربری خود مطمئن هستید؟"
    );

    if (!confirmed) return;

    try {
      const response = await api.delete("/api/proxy/user/me");

      if (!response.success) {
        throw new Error(response.message);
      }

      alert("حساب کاربری با موفقیت حذف شد.");

      await logout();
    } catch (error) {
      alert(error.message || "خطا در حذف حساب کاربری");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          تنظیمات
        </h1>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            منطقه خطر
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            با حذف حساب کاربری، دسترسی شما به پنل قطع خواهد شد.
          </p>

          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            حذف حساب کاربری
          </button>
        </div>
      </main>
    </div>
  );
}
