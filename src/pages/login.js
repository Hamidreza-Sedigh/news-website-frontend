//src/pages/login.js
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from "jwt-decode";

export default function LoginPage() {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/proxy/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        try {
          const decoded = jwtDecode(data.token);
          if (decoded.role) {
            localStorage.setItem('userRole', decoded.role);
          }
        } catch (err) {
          console.error("JWT decode error:", err);
        }

        router.push('/dashboard');
      } else {
        setError(data.message || data.error || 'ورود ناموفق بود');
      }
    } catch (err) {
      console.error(err);
      setError('خطا در ارتباط با سرور');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🔐 ورود</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="identifier"
            type="text"
            placeholder="ایمیل، شماره تلفن یا نام کاربری"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            name="password"
            type="password"
            placeholder="رمز عبور"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            ورود
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600">
          حساب ندارید؟{" "}
          <Link href="/register" className="text-green-600 hover:underline">
            ثبت‌نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}
