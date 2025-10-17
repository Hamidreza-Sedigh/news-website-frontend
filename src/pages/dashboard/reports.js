import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Loader2, CheckCircle } from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchReports = async (page = pageNumber) => {
    setLoading(true);
    const res = await fetch(
      `/api/proxy/reports?pageNumber=${page}&pageSize=${pageSize}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const data = await res.json();

    if (data?.success) {
      setReports(data.data || []);
      setTotal(data.total || 0);
    } else {
      console.warn("⚠️ Failed to load reports:", data);
      setReports([]);
      setTotal(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, [pageNumber]);

  const markAsRead = async (id) => {
    await fetch(`/api/proxy/reports?id=${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchReports();
  };

  const deleteReport = async (id) => {
    if (!confirm("آیا مطمئنی؟")) return;
    await fetch(`/api/proxy/reports?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchReports();
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          📋 گزارش خرابی‌ها
        </h1>

        {loading ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="animate-spin" /> در حال بارگذاری...
          </div>
        ) : reports.length === 0 ? (
          <p className="text-gray-600">هیچ گزارشی یافت نشد.</p>
        ) : (
          <>
            <div className="overflow-x-auto bg-white rounded-xl shadow">
              <table className="min-w-full text-sm text-gray-700 border-separate border-spacing-y-1">
                <thead className="bg-gray-100 text-gray-800 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-2 text-center">#</th>
                    <th className="px-4 py-2 text-center">آدرس صفحه</th>
                    <th className="px-4 py-2 text-center">توضیح</th>
                    <th className="px-4 py-2 text-center">IP</th>
                    <th className="px-4 py-2 text-center">وضعیت</th>
                    <th className="px-4 py-2 text-center">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {reports.map((r, i) => (
                    <tr
                      key={r._id}
                      className={`transition-all ${
                        r.read
                          ? "bg-gray-50 hover:bg-gray-100"
                          : "bg-red-50 hover:bg-red-100"
                      }`}
                    >
                      <td className="px-4 py-2 text-center font-medium text-gray-600">
                        {pageNumber * pageSize + i + 1}
                      </td>
                      <td className="px-4 py-2 text-blue-600 text-center break-all">
                        {r.url}
                      </td>
                      <td className="px-4 py-2 text-center">{r.description}</td>
                      <td className="px-4 py-2 text-center">{r.ip}</td>
                      <td className="px-4 py-2 text-center">
                        {r.read ? (
                          <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                            <CheckCircle size={16} /> خوانده شده
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">
                            خوانده نشده
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-center flex justify-center gap-2">
                        {!r.read && (
                          <button
                            onClick={() => markAsRead(r._id)}
                            className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                          >
                            علامت خوانده شد
                          </button>
                        )}
                        <button
                          onClick={() => deleteReport(r._id)}
                          className="px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
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
