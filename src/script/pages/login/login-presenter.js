class LoginPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init() {
    this.view.render();
    this.view.bindLoginHandler(async (credentials) => {
      try {
        await this.model.login(credentials);
        window.location.href = '#/home'; // Redirect ke halaman home setelah login
      } catch (error) {
        console.log(error.message); // Tampilkan pesan error jika login gagal
      }
    });
  }
}

module.exports = LoginPresenter;