// pages/dashboard/reports.js
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Loader2, CheckCircle } from "lucide-react";
import moment from "moment-jalaali";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useApi } from "@/hooks/useApi";

moment.loadPersian({ usePersianDigits: true });

export default function ReportsPage() {
  const { loading: authLoading, accessDenied } = useAuthGuard({
    allowedRoles: ["admin"],
    onRoleFail: "deny",
  });
  const api = useApi();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchReports = async (page = pageNumber) => {
    setLoading(true);
    try {
      const data = await api.get(
        `/api/proxy/reports?pageNumber=${page}&pageSize=${pageSize}`
      );

      setReports(data.data || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.warn("⚠️ Failed to load reports:", err);
      setReports([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading || accessDenied) return;
    fetchReports();
  }, [authLoading, accessDenied, pageNumber]);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/api/proxy/reports/?id=${id}`);
      fetchReports();
    } catch (err) {
      console.error("⚠️ Error marking report as read:", err);
    }
  };

  const deleteReport = async (id) => {
    if (!confirm("آیا مطمئنی؟")) return;
    try {
      await api.del(`/api/proxy/reports?id=${id}`);
      fetchReports();
    } catch (err) {
      console.error("⚠️ Error deleting report:", err);
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
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          📋 گزارش خرابی‌ها
        </h1>

        {reports.length === 0 ? (
          <p className="text-gray-600">هیچ گزارشی یافت نشد.</p>
        ) : (
          <>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-xs uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-center">#</th>
                    <th className="px-4 py-3 text-center">آدرس صفحه</th>
                    <th className="px-4 py-3 text-center">توضیح</th>
                    <th className="px-4 py-3 text-center">IP</th>
                    <th className="px-4 py-3 text-center">وضعیت</th>
                    <th className="px-4 py-3 text-center">تاریخ</th>
                    <th className="px-4 py-3 text-center">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {reports.map((r, i) => (
                    <tr
                      key={r._id}
                      className={`transition-all duration-200 ${
                        r.read
                          ? "bg-white hover:bg-gray-50"
                          : "bg-red-50 hover:bg-red-100"
                      } border-b border-gray-100`}
                    >
                      <td className="px-4 py-3 text-center font-medium text-gray-600">
                        {pageNumber * pageSize + i + 1}
                      </td>
                      <td className="px-4 py-3 text-blue-600 text-center break-all max-w-[220px] truncate">
                        {r.url}
                      </td>
                      <td className="px-4 py-3 text-center max-w-[250px] truncate">
                        {r.description || "-"}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500">{r.ip}</td>
                      <td className="px-4 py-3 text-center">
                        {r.read ? (
                          <span className="inline-flex items-center gap-1 text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                            <CheckCircle size={14} /> خوانده شده
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600 font-medium bg-red-50 px-2 py-1 rounded-full">
                            خوانده نشده
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700 whitespace-nowrap">
                        {moment(r.createdAt).format("jYYYY/jMM/jDD HH:mm:ss")}
                      </td>
                      <td className="px-4 py-3 text-center flex justify-center gap-2">
                        {!r.read && (
                          <button
                            onClick={() => markAsRead(r._id)}
                            className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-xs"
                          >
                            خوانده شد
                          </button>
                        )}
                        <button
                          onClick={() => deleteReport(r._id)}
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
                صفحه {pageNumber + 1} از {totalPages} (کل {total} گزارش)
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
