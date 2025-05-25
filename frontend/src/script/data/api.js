export async function loginUser({ email, password }) {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  // Agar sesuai dengan login-presenter.js, tambahkan loginResult jika login sukses
  if (!data.error && data.token) {
    return { ...data, loginResult: { token: data.token } };
  }
  return data;
}
