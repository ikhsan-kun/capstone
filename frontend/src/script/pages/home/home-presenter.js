class HomePresenter {
  constructor(view, model, authService) {
    this.view = view;
    this.model = model;
    this.authService = authService;
  }

  async init() {
    // if (!this.authService.isLoggedIn()) {
    //   window.location.href = '#/login'; // Redirect ke halaman login jika belum login
    //   return;
    // }

    try {
      this.view.render();
      const data = await this.model.fetchData();
      this.view.updateContent(data);
    } catch (error) {
      alert('Failed to load data: ' + error.message); // Tampilkan pesan error jika gagal
    }
  }
}

module.exports = HomePresenter;