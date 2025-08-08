// pages/login.js
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../lib/auth';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const data = await login(form.email, form.password);

    if (data.token) {
      router.push('/dashboard');
    } else {
      setError(data.error || 'ورود ناموفق بود');
    }
    
    // const res = await login(form.email, form.password);
    // const res = await fetch('http://localhost:8000/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form),
    // });

    // const data = await res.json();
    // if (res.ok && data.token) {
    //   localStorage.setItem('token', data.token);
    //   router.push('/dashboard');
    // } else {
    //   setError(data.error || 'ورود ناموفق بود');
    // }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🔐 ورود</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" type="email" placeholder="ایمیل" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input name="password" type="password" placeholder="رمز عبور" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">ورود</button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600">
          حساب ندارید؟{' '}
          {/* <a href="/register" className="text-green-600 hover:underline">ثبت‌نام کنید</a> */}
          <Link href="/register" className="text-green-600 hover:underline">
            ثبت‌نام کنید
          </Link>

        </p>
      </div>
    </div>
  );
}
