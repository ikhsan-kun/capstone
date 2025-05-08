class HomeModel {
    async fetchData() {
      try {
        const response = await fetch('http://localhost:3000/me', {
          method: 'GET',
          credentials: 'include', // Kirim cookie session ke server
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = HomeModel;