import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Bookmark,
  Settings,
  Heart,
  LogOut,
  BookOpen,
  LayoutDashboard,
  Users,
  FileWarning,
} from "lucide-react";
import { logout } from "../lib/session";

export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserRole(localStorage.getItem("userRole"));
    }
  }, []);

  const menuItems = [
    { label: "خانه", path: "/", icon: <Home size={18} /> },
    { label: "داشبورد", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "پروفایل من", path: "/dashboard/profile", icon: <User size={18} /> },
    { label: "خبرهای ذخیره‌شده", path: "/dashboard/saved", icon: <Bookmark size={18} /> },
    { label: "علاقه‌مندی‌ها", path: "/dashboard/favorites", icon: <Heart size={18} /> },
    { label: "تاریخچه خبرهای خوانده شده", path: "/dashboard/history", icon: <BookOpen size={18} /> },

    // ⚡ فقط برای ادمین‌ها
    ...(userRole === "admin"
      ? [
          { label: "مدیریت کاربران", path: "/dashboard/users", icon: <Users size={18} /> },
          { label: "گزارش خرابی‌ها", path: "/dashboard/reports", icon: <FileWarning size={18} /> },
          { label: "تماس با ما", path: "/dashboard/contact", icon: <FileWarning size={18} /> },
        ]
      : []),

    { label: "تنظیمات", path: "/dashboard/settings", icon: <Settings size={18} /> },
  ];

  return (
    <>
      {/* دکمه همبرگری (فقط موبایل) */}
      <button
        className="lg:hidden fixed top-[72px] right-4 z-50 bg-gray-800 text-white p-2 rounded-md shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className="flex flex-col lg:flex-row">
        {/* سایدبار دسکتاپ */}
        <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4 mt-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span
                  className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition text-right ${
                    router.pathname === item.path
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.icon}
                </span>
              </Link>
            ))}
          </nav>

          {/* دکمه خروج */}
          <div className="mt-auto sticky bottom-4 px-4">
            <button
              onClick={logout}
              className="flex items-center justify-between w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <span>خروج</span>
              <LogOut size={18} />
            </button>
          </div>
        </aside>

        {/* منوی موبایل */}
        {open && (
          <div className="lg:hidden fixed top-[80px] right-0 w-64 h-[calc(100vh-80px)] bg-white dark:bg-gray-800 shadow-lg border-l border-gray-200 dark:border-gray-700 z-40 p-4 flex flex-col">
            <nav className="space-y-3">
              {menuItems.map((item) => (
                <Link key={item.path} href={item.path} onClick={() => setOpen(false)}>
                  <span
                    className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition text-right ${
                      router.pathname === item.path
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.icon}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-4">
              <button
                onClick={logout}
                className="flex items-center justify-between w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                <span>خروج</span>
                <LogOut size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
