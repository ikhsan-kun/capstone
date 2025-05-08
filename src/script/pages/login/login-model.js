class LoginModel {
    async login(credentials) {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Login failed');
        }
  
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data.user)); // Simpan data user di localStorage
        return true;
      } catch (error) {
        throw error;
      }
    }
  
    logout() {
      localStorage.removeItem('user'); // Hapus data user dari localStorage
    }
  
    isLoggedIn() {
      return !!localStorage.getItem('user'); // Cek apakah user sudah login
    }
  }
  
  module.exports = LoginModel;