import RegisterPresenter from "./register-presenter";
import * as nutriai from "../../data/api";

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
    <section class="register-section d-flex align-items-center justify-content-center min-vh-100 px-3" style="background: #f6ede5;">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-12 col-md-10">
            <div class="text-center mb-4">
              <h1 class="fw-bold mb-2" style="font-family: 'Montserrat', sans-serif; letter-spacing: 1px; font-size: 2.2rem;">NUTRITION INSIGHTS</h1>
              <p class="text-muted mx-auto" style="max-width: 600px; font-size: 1rem;">Dive deep into the nutritional content of your meals, with detailed information on calories, macronutrients, vitamins, and minerals</p>
            </div>
            <div class="row g-0 shadow-lg rounded-4 overflow-hidden bg-white mx-auto" style="max-width: 800px;">
              <!-- Gambar di sisi kiri -->
              <div class="col-md-6 d-none d-md-block">
                <img src="/images/image-regist.jpg" alt="Nutrition Bowl" class="img-fluid w-100 h-100" style="object-fit: cover; height: 100%;">
              </div>
              
              <!-- Form register -->
              <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <div class="p-4 p-md-5 w-100" style="max-width: 400px;">
                  <div class="mb-4 text-center">
                    <h2 class="fw-bold mb-3" style="font-family: 'Montserrat', sans-serif; letter-spacing: 1px; font-size: 1.5rem;">REGISTER</h2>
                  </div>
                  <form id="register-form" autocomplete="on">
                    <div class="mb-3">
                      <label for="username-input" class="form-label fw-semibold" style="letter-spacing: 1px;">USERNAME</label>
                      <input id="username-input" type="text" name="username" autocomplete="username" class="form-control" placeholder="Enter your username" required style="font-size: 1.05rem; padding: 0.7rem 1rem;">
                    </div>
                    <div class="mb-3">
                      <label for="email-input" class="form-label fw-semibold" style="letter-spacing: 1px;">EMAIL</label>
                      <input id="email-input" type="email" name="email" autocomplete="email" class="form-control" placeholder="Enter your email" required style="font-size: 1.05rem; padding: 0.7rem 1rem;">
                    </div>
                    <div class="mb-4">
                      <label for="password-input" class="form-label fw-semibold" style="letter-spacing: 1px;">PASSWORD</label>
                      <input id="password-input" type="password" name="new-password" autocomplete="new-password" class="form-control" placeholder="Enter your password" required style="font-size: 1.05rem; padding: 0.7rem 1rem;">
                    </div>
                    <div id="submit-button-container" class="d-grid mb-3">
                      <button class="btn fw-bold" type="submit" style="background: #6c4ba6; border: none; color: #fff; font-size: 1.1rem; padding: 0.7rem 0; border-radius: 8px;">REGISTER</button>
                    </div>
                    <p class="text-center mb-0" style="font-size: 1rem;">Have account? <a href="#/login" class="text-decoration-none" style="color: #6c4ba6; font-weight: 600;">Login here</a></p>
                  </form>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </section>
  `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: nutriai,
    });

    this.#setupForm();
  }

  #setupForm() {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
          username: document.getElementById("username-input").value,
          email: document.getElementById("email-input").value,
          password: document.getElementById("password-input").value,
        };
        await this.#presenter.getRegistered(data);
      });
  }

  registeredSuccessfully(message, user) {
    console.log(message);
    console.log(user); // opsional
    location.hash = "/login";
  }

  registeredFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Daftar akun
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit">Daftar akun</button>
    `;
  }
}
