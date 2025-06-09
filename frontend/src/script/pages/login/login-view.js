import LoginPresenter from "./login-presenter";
import * as api from "../../data/api";
import * as AuthModel from "../../utils/auth";
import { removeAccessToken } from "../../utils/auth";

export default class LoginPage {
  #presenter = null;

  async render() {
    removeAccessToken(); 
    return `
    <section class="login-section d-flex align-items-center justify-content-center min-vh-100" style="background: #f6ede5;">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-12 col-md-10">
            <div class="text-center mb-4">
              <h1 class="fw-bold mb-2" style="font-family: 'Montserrat', sans-serif; letter-spacing: 1px; font-size: clamp(1.8rem, 2.5vw, 2.5rem);">NUTRITION INSIGHTS</h1>
              <p class="text-muted mx-auto" style="max-width: 600px; font-size: clamp(0.9rem, 2vw, 1rem); line-height: 1.6;">Dive deep into the nutritional content of your meals, with detailed information on calories, macronutrients, vitamins, and minerals</p>
            </div>
            <div class="row g-0 shadow-lg rounded-4 overflow-hidden bg-white">
              <div class="col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center p-0 bg-white">
                <img src="/images/image-regist.jpg" alt="Nutrition Bowl" class="img-fluid w-100 h-100" style="object-fit: cover; min-height: 100%; min-width: 100%;" />
              </div>
              <div class="col-12 col-md-6 p-4 p-md-5 bg-white d-flex flex-column justify-content-center" style="min-width: 280px; max-width: 480px;">
                <div class="mb-4 text-center">
                  <h2 class="fw-bold mb-3" style="font-family: 'Montserrat', sans-serif; letter-spacing: 1px; font-size: clamp(1.3rem, 2vw, 1.6rem);">Masuk</h2>
                </div>
                <form id="login-form" autocomplete="on">
                  <div class="mb-3">
                    <label for="email-input" class="form-label fw-semibold" style="letter-spacing: 1px;">Email</label>
                    <input id="email-input" type="email" name="email" autocomplete="email" class="form-control form-control-lg" placeholder="Masukkan email" required>
                  </div>
                  <div class="mb-4">
                    <label for="password-input" class="form-label fw-semibold" style="letter-spacing: 1px;">Password</label>
                    <input id="password-input" type="password" name="current-password" autocomplete="current-password" class="form-control form-control-lg" placeholder="Masukkan password" required>
                  </div>
                  <div id="submit-button-container" class="d-grid mb-3">
                    <button class="btn fw-bold" type="submit" style="background: #6c4ba6; border: none; color: #fff; font-size: 1.1rem; padding: 0.7rem 0; border-radius: 8px; transition: background 0.3s ease;">
                      Masuk
                    </button>
                  </div>
                  <p class="text-center mb-0" style="font-size: 1rem;">Belum punya akun? <a href="#/register" class="text-decoration-none" style="color: #6c4ba6; font-weight: 600;">Daftar</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}


  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
      authModel: AuthModel,
      model: api,
    });

    this.#setupForm();
  }

  #setupForm() {
    document
      .getElementById("login-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
          email: document.getElementById("email-input").value,
          password: document.getElementById("password-input").value,
        };
        await this.#presenter.getLogin(data);
      });
  }

  loginSuccessfully(message) {
    console.log(message);
    location.hash = "/";
  }

  loginFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Masuk
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit">Masuk</button>
    `;
  }
}
