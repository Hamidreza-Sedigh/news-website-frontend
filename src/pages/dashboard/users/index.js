import { useEffect, useState } from "react";
import { User, Mail, Shield, Loader2 } from "lucide-react";
import Sidebar from "../../../components/Sidebar"; // مسیر Sidebar را اصلاح کن
import { useRouter } from "next/router";
import { Edit, Trash2 } from "lucide-react";


export default function UsersPage() {
	const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/proxy/dashboard/users"); // ✅ مسیر صحیح
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("خطا در دریافت کاربران:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!confirm("آیا از حذف این کاربر مطمئن هستید؟")) return;
  
    try {
      const res = await fetch(`/api/proxy/dashboard/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("✅ کاربر با موفقیت حذف شد.");
        setUsers(users.filter((u) => u._id !== userId)); // حذف از state
      } else {
        alert("❌ خطا در حذف کاربر: " + (data.message || "نامشخص"));
      }
    } catch (err) {
      console.error("خطا در حذف کاربر:", err);
      alert("❌ خطا در برقراری ارتباط با سرور.");
    }
  };
  

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          مدیریت کاربران
        </h1>

        <div className="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
              <span className="ml-2 text-gray-600">در حال بارگذاری...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700 border-separate border-spacing-0">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">نام کاربری</th>
                    <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">نام</th>
                    <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">ایمیل</th>
                    <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">نقش</th>
                    <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">وضعیت</th>
                    <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">engine admin</th>
                    <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">عملیات</th>
                    <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">حذف</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user, i) => (
                    <tr
                      key={i}
                      className="hover:bg-blue-50 transition-colors duration-150"
                    >
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-500" />
                          <span>{user.username}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span>{user.name}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{user.email}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-indigo-500" />
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-indigo-100 text-indigo-700"
                                : user.role === "reporter"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {user.role === "admin"
                                  ? "ادمین"
                                  : user.role === "reporter"
                                  ? "خبرنگار"
                                  : "کاربر"}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.active ? "فعال" : "غیرفعال"}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.crawlerAdmin
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.crawlerAdmin ? "هست" : "نیست"}
                        </span>
                      </td>
											<td className="py-3 px-4 whitespace-nowrap">
                        <button
                          onClick={() => router.push(`/dashboard/users/${user._id}`)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                          <span>ویرایش</span>
                        </button>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                           حذف
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
