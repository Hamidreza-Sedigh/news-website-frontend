import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Shield,
  Loader2,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import { Transition } from "@headlessui/react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useApi } from "@/hooks/useApi";
import AccessDenied from "@/components/AccessDenied";


export default function UsersPage() {
  const { loading, accessDenied } = useAuthGuard({
    allowedRoles: ["admin"],
    onRoleFail: "deny",
  });

  const api = useApi();

  const [users, setUsers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    if (loading || accessDenied) return;

    const fetchUsers = async () => {
      setLoadingData(true);
      try {
        const data = await api.get(`/api/proxy/dashboard/users/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        console.log("Fetched users:", data);
        setUsers(data.users || []);
        setTotalUsers(data.totalCount || 0);
      } catch (err) {
        console.error("خطا در دریافت کاربران:", err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchUsers();
  }, [loading, accessDenied, pageNumber, pageSize]);

  // Toast
  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type, message: "" }), 3000);
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("آیا از حذف این کاربر مطمئن هستید؟")) return;

    try {
      await api.del(`/api/proxy/dashboard/users/${userId}`);
      setUsers(users.filter((u) => u._id !== userId));
      showToast("success", "✅ کاربر با موفقیت حذف شد.");
    } catch (err) {
      console.error("خطا در حذف کاربر:", err);
      showToast("error", err.message || "❌ خطا در برقراری ارتباط با سرور.");
    }
  };

  const totalPages = Math.ceil(totalUsers / pageSize);

  // Loading تا auth آماده شود یا fetch کامل شود
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="p-6">در حال بارگذاری...</p>
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );

  // AccessDenied اگر نقش admin نیست
  if (accessDenied) return <AccessDenied />;

  // حالا صفحه admin و جدول کاربران
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50 relative">
        {/* Toast */}
        <Transition
          show={toast.show}
          enter="transform transition duration-300"
          enterFrom="translate-y-4 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <div
            className={`fixed top-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 ${
              toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            {toast.message}
          </div>
        </Transition>

        <h1 className="text-2xl font-bold mb-6 text-gray-800">مدیریت کاربران</h1>

        <div className="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 border-separate border-spacing-0">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">نام کاربری</th>
                  <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">نام</th>
                  <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">ایمیل</th>
                  <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">شماره تلفن</th>
                  <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">نقش</th>
                  <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">وضعیت</th>
                  <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">engine admin</th>
                  <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">عملیات</th>
                  <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">حذف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-500" />
                        <span>{user.username}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">{user.name || "-"}</td>
                    <td className="py-3 px-4 whitespace-nowrap flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      {user.email}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">{user.phone || "-"}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
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
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.active ? "فعال" : "غیرفعال"}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.crawlerAdmin ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
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
                        ویرایش
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

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 p-4 border-t">
            <button
              onClick={() => pageNumber > 0 && setPageNumber(pageNumber - 1)}
              disabled={pageNumber === 0}
              className="px-3 py-1 border rounded-lg flex items-center gap-1 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
              قبلی
            </button>

            <span className="text-sm font-medium text-gray-600">
              صفحه {pageNumber + 1} از {totalPages || 1}
            </span>

            <button
              onClick={() => pageNumber < totalPages - 1 && setPageNumber(pageNumber + 1)}
              disabled={pageNumber >= totalPages - 1}
              className="px-3 py-1 border rounded-lg flex items-center gap-1 disabled:opacity-50"
            >
              بعدی
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
