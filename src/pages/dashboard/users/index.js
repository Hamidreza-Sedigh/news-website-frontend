// pages/dashboard/users/index.js
import { useEffect, useState, Fragment } from "react";
import { User, Mail, Shield, Loader2, Edit, Trash2 } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "", success: true });

  // Confirm delete modal
  const [deleteModal, setDeleteModal] = useState({ open: false, userId: null, username: "" });

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/proxy/dashboard/users/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        const data = await res.json();
        setUsers(data.users);
        setTotalUsers(data.totalCount);
      } catch (err) {
        console.error("خطا در دریافت کاربران:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [pageNumber, pageSize]);

  const handleDeleteUser = async () => {
    const userId = deleteModal.userId;
    try {
      const res = await fetch(`/api/proxy/dashboard/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUsers(users.filter((u) => u._id !== userId));
        setToast({ show: true, message: "✅ کاربر با موفقیت حذف شد.", success: true });
      } else {
        setToast({ show: true, message: `❌ خطا: ${data.message || "نامشخص"}`, success: false });
      }
    } catch (err) {
      console.error("خطا در حذف کاربر:", err);
      setToast({ show: true, message: "❌ خطا در برقراری ارتباط با سرور.", success: false });
    } finally {
      setDeleteModal({ open: false, userId: null, username: "" });
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">مدیریت کاربران</h1>

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
                    <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">ویرایش</th>
                    <th className="py-3 px-4 text-right font-semibold whitespace-nowrap">حذف</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {Array.isArray(users) && users.map((user, i) => (
                    <tr key={i} className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="py-3 px-4 whitespace-nowrap flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-500" />
                        <span>{user.username}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">{user.name}</td>
                      <td className="py-3 px-4 whitespace-nowrap flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span>{user.email}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap flex items-center gap-2">
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
                          <span>ویرایش</span>
                        </button>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-right">
                        <button
                          onClick={() =>
                            setDeleteModal({ open: true, userId: user._id, username: user.username })
                          }
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

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <span>
                  نمایش {pageNumber * pageSize + 1} تا{" "}
                  {Math.min((pageNumber + 1) * pageSize, totalUsers)} از {totalUsers} کاربر
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
                    disabled={pageNumber === 0}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    قبلی
                  </button>
                  <button
                    onClick={() =>
                      setPageNumber((prev) => (prev + 1) * pageSize < totalUsers ? prev + 1 : prev)
                    }
                    disabled={(pageNumber + 1) * pageSize >= totalUsers}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    بعدی
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Transition.Root show={deleteModal.open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => setDeleteModal({ open: false, userId: null, username: "" })}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      حذف کاربر
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        آیا مطمئن هستید که می‌خواهید کاربر <b>{deleteModal.username}</b> را حذف کنید؟
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse gap-2">
                  <button
                    type="button"
                    onClick={handleDeleteUser}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    حذف
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteModal({ open: false, userId: null, username: "" })}
                    className="mt-3 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Toast notification */}
      {toast.show && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow text-white ${
            toast.success ? "bg-green-600" : "bg-red-600"
          }`}
          onAnimationEnd={() => setToast({ ...toast, show: false })}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
