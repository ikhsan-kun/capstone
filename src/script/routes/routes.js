const HomeView = require("../pages/home/home-view");
const HomeModel = require("../pages/home/home-model");
const HomePresenter = require("../pages/home/home-presenter");
const LoginView = require("../pages/login/login-view");
const LoginModel = require("../pages/login/login-model");
const LoginPresenter = require("../pages/login/login-presenter");

const routes = {
  "/home": () => {
    const view = new HomeView();
    const model = new HomeModel();
    const authService = new LoginModel(); // Gunakan LoginModel sebagai authService
    const presenter = new HomePresenter(view, model, authService);

    presenter.init();
  },
  "/login": () => {
    const view = new LoginView();
    const model = new LoginModel();
    const presenter = new LoginPresenter(view, model);
    presenter.init();
  },
};

module.exports = routes;
