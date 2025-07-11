export const login = async (email, password) => {
  const res = await fetch('http://localhost:8000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token); // یا ذخیره در cookie
  }
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login'; // یا استفاده از useRouter().push
};
