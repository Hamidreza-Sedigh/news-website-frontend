// pages/dashboard/settings.js
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function Settings() {
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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          تنظیمات
        </h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">
              حالت تاریک
            </span>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={toggleDarkMode}
              className="h-5 w-5"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">
              اعلان ایمیل
            </span>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={toggleEmailNotifications}
              className="h-5 w-5"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
