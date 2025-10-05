import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // داده کام نمونه برای پروفایل
  const [user, setUser] = useState({
    name: "حمیدرضا صدیق",
    email: "hamidreza@example.com",
    membershipDate: "۱۴۰۲/۰۷/۱۵",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else setLoading(false);
  }, [router]);

  if (loading) return <p className="p-6">در حال بارگذاری...</p>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          پروفایل من
        </h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-200">نام:</span>{" "}
            <span className="text-gray-800 dark:text-gray-100">{user.name}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-200">ایمیل:</span>{" "}
            <span className="text-gray-800 dark:text-gray-100">{user.email}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-200">تاریخ عضویت:</span>{" "}
            <span className="text-gray-800 dark:text-gray-100">{user.membershipDate}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
