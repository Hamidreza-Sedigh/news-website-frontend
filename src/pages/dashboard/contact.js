// pages/dashboard/contact.js
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Loader2, CheckCircle } from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useApi } from "@/hooks/useApi";
import moment from "moment-jalaali";

moment.loadPersian({ usePersianDigits: true });

export default function ContactMessagesPage() {
  const { loading: authLoading, accessDenied } = useAuthGuard({
    allowedRoles: ["admin"],
    onRoleFail: "deny",
  });
  const api = useApi();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchMessages = async (page = pageNumber) => {
    setLoading(true);
    try {
      const data = await api.get(
        `/api/proxy/contact?pageNumber=${page}&pageSize=${pageSize}`
      );
      setMessages(data.data || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("⚠️ Failed to load messages:", err);
      setMessages([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading || accessDenied) return;
    fetchMessages();
  }, [authLoading, accessDenied, pageNumber]);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/api/proxy/contact?id=${id}`);
      fetchMessages();
    } catch (err) {
      console.error("⚠️ Error marking message as read:", err);
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm("آیا مطمئنی؟")) return;
    try {
      await api.del(`/api/proxy/contact?id=${id}`);
      fetchMessages();
    } catch (err) {
      console.error("⚠️ Error deleting message:", err);
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  if (authLoading || loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <Loader2 className="animate-spin w-6 h-6 mr-2" /> در حال بارگذاری...
      </div>
    );

  if (accessDenied)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        دسترسی مجاز نیست
      </div>
    );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">📨 پیام‌های کاربران</h1>

        {loading ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="animate-spin" /> در حال بارگذاری...
          </div>
        ) : messages.length === 0 ? (
          <p className="text-gray-600">هیچ پیامی یافت نشد.</p>
        ) : (
          <>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-xs uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-center">#</th>
                    <th className="px-4 py-3 text-center">نام</th>
                    <th className="px-4 py-3 text-center">ایمیل</th>
                    <th className="px-4 py-3 text-center">موضوع</th>
                    <th className="px-4 py-3 text-center">پیام</th>
                    <th className="px-4 py-3 text-center">IP</th>
                    <th className="px-4 py-3 text-center">تاریخ</th>
                    <th className="px-4 py-3 text-center">وضعیت</th>
                    <th className="px-4 py-3 text-center">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {messages.map((m, i) => (
                    <tr
                      key={m._id}
                      className={`transition-all duration-200 ${
                        m.read
                          ? "bg-white hover:bg-gray-50"
                          : "bg-yellow-50 hover:bg-yellow-100"
                      } border-b border-gray-100`}
                    >
                      <td className="px-4 py-3 text-center">
                        {pageNumber * pageSize + i + 1}
                      </td>
                      <td className="px-4 py-3 text-center">{m.name}</td>
                      <td className="px-4 py-3 text-center text-blue-600">{m.email}</td>
                      <td className="px-4 py-3 text-center">{m.subject}</td>
                      <td className="px-4 py-3 text-center max-w-[250px] truncate">{m.message}</td>
                      <td className="px-4 py-3 text-center text-gray-500">{m.ip}</td>
                      <td className="px-4 py-3 text-center text-gray-700 whitespace-nowrap">
                        {moment(m.createdAt).format("jYYYY/jMM/jDD HH:mm:ss")}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {m.read ? (
                          <span className="inline-flex items-center gap-1 text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                            <CheckCircle size={14} /> خوانده شده
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-yellow-600 font-medium bg-yellow-50 px-2 py-1 rounded-full">
                            خوانده نشده
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center flex justify-center gap-2">
                        {!m.read && (
                          <button
                            onClick={() => markAsRead(m._id)}
                            className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-xs"
                          >
                            خوانده شد
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(m._id)}
                          className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition text-xs"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* صفحه‌بندی */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-600">
                صفحه {pageNumber + 1} از {totalPages} (کل {total} پیام)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPageNumber((p) => Math.max(0, p - 1))}
                  disabled={pageNumber === 0}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition ${
                    pageNumber === 0
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  قبلی
                </button>
                <button
                  onClick={() =>
                    setPageNumber((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={pageNumber >= totalPages - 1}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition ${
                    pageNumber >= totalPages - 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  بعدی
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
