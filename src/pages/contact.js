import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("در حال ارسال...");

    const res = await fetch("/api/proxy/other/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("✅ پیام با موفقیت ارسال شد.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("❌ خطا در ارسال: " + data.message);
    }
  };

  return (
    <>
      <Head>
        <title>تماس با ما | سایت خبری</title>
        <meta name="description" content="با ما در تماس باشید. اطلاعات تماس و فرم ارسال پیام برای ارتباط با سایت خبری." />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">تماس با ما</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* اطلاعات تماس */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPinIcon className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold">آدرس</p>
                <p className="text-sm text-gray-600">تهران، خیابان مثال، پلاک ۱۲۳</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <PhoneIcon className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold">تلفن</p>
                <p className="text-sm text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <EnvelopeIcon className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold">ایمیل</p>
                <p className="text-sm text-gray-600">info@news-site.ir</p>
              </div>
            </div>
          </div>

          {/* فرم تماس */}
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                placeholder="نام شما"
                name="name" value={form.name} onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ایمیل</label>
              <input
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                placeholder="your@email.com"
                name="email" value={form.email} onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">موضوع پیام</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                defaultValue=""
                name="subject" value={form.subject} onChange={handleChange}
              >
                <option value="" disabled>لطفاً انتخاب کنید</option>
                <option value="suggestion">پیشنهاد</option>
                <option value="complaint">انتقاد</option>
                <option value="request">درخواست اضافه شدن به سایت‌های خبری</option>
                <option value="ads">تبلیغات</option>
                <option value="other">سایر</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">پیام</label>
              <textarea
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring focus:ring-blue-200"
                placeholder="پیام خود را بنویسید..."
                name="message" value={form.message} onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              ارسال پیام
            </button>
            {status && <p className="text-sm mt-2">{status}</p>}

          </form>
        </div>
      </main>
    </>
  );
}
