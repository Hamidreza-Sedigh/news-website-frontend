// pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      router.push('/login');
    } else {
      setError(data.error || 'ثبت‌نام با خطا مواجه شد');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📝 ثبت‌نام</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" type="text" placeholder="نام کاربری" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input name="email" type="email" placeholder="ایمیل" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input name="password" type="password" placeholder="رمز عبور" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">ثبت‌نام</button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600">
          حساب دارید؟{' '}
          <a href="/login" className="text-blue-600 hover:underline">وارد شوید</a>
        </p>
      </div>
    </div>
  );
}
