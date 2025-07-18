import { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function ReportButton({ newsId, link }) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [message, setMessage] = useState('');

  const storageKey = `report_${newsId}`;

  const resetForm = () => {
    setDescription('');
    setMessage('');
    setStatus(null); // چون null یعنی هیچ پیامی نمایش داده نشه
  };

  const closeModal = () => {
    resetForm();
    setOpen(false);
  };

  const alreadyReported = () => {
    const lastTime = localStorage.getItem(storageKey);
    if (!lastTime) return false;
    const diff = Date.now() - parseInt(lastTime);
    return diff < 1 * 60 * 60 * 1000;
  };

  const handleSubmit = async () => {
    if (alreadyReported()) {
      setStatus('error');
      setMessage('شما قبلاً این خبر را گزارش کرده‌اید.');
      return;
    }

    setLoading(true);
    setStatus(null);
    setMessage('');

    try {
      const res = await fetch('/api/proxy/other/reportProblem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newsId, url: link, description }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('گزارش با موفقیت ثبت شد.');
        localStorage.setItem(storageKey, Date.now().toString());
        setTimeout(() => {
          setOpen(false);
          setDescription('');
          setStatus(null);
          setMessage('');
        }, 1500);
      } else {
          setStatus('error');
        setMessage(data.message || 'خطایی رخ داد.');
      }
    } catch {
      setStatus('error');
      setMessage('ارتباط با سرور برقرار نشد.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        // className="text-sm text-red-600 hover:text-red-700 underline"
        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
      >
        گزارش خرابی لینک
      </button>

      <Dialog open={open} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold mb-3">گزارش خرابی</Dialog.Title>
            <p className="text-sm text-gray-600 mb-4">
              اگر لینک بالا باز نمی‌شود یا محتوای خبر مشکل دارد، لطفاً به ما اطلاع دهید.
            </p>
            <textarea
              className="w-full text-sm border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="توضیحات اختیاری..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {message && (
              <p
                className={`text-sm font-medium mb-4 ${
                  status === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {message}
              </p>
            )}

            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal} 
                className="px-4 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                انصراف
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-1.5 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
              >
                ارسال
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
