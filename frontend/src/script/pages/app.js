import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import {getAccessToken} from "../utils/auth";
import { loginButtonTemplate, logoutButtonTemplate } from "../templates";

let currentPage = null; 

class App {
  #content = null;

  constructor({ content, authbtn }) {
    this.#content = content;
  }

  async renderPage() {
    const url = getActiveRoute();
    const pageFactory = routes[url];
    const page = pageFactory ? pageFactory() : null;
    
    if (currentPage && typeof currentPage.stopCamera === "function") {
      currentPage.stopCamera();
    }

    if (!page) {
      this.#content.classList.remove("show");
      this.#content.classList.add("fade-transition");
      setTimeout(() => {
        this.#content.innerHTML =
          '<h1 class="text-center mt-5">404 - Page Not Found</h1>';
        this.#content.classList.add("show");
      }, 400);
      currentPage = null;
      return;
    }

    const islogin = getAccessToken();
    let btn = document.getElementById("login");
    if (islogin){
      btn.innerHTML = logoutButtonTemplate();

      const logoutBtn = btn.querySelector("#logout-btn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          import("../utils/auth").then(({ removeAccessToken }) => {
            removeAccessToken();
            location.hash = "/login";
          });
        });
      }
    }else{
      btn.innerHTML = loginButtonTemplate();
    }


    this.#content.classList.remove("show");
    this.#content.classList.add("fade-transition");
    setTimeout(async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
      this.#content.classList.add("show");

      // Sembunyikan header di halaman login dan register
      const header = document.querySelector("header");
      if (url === "/login" || url === "/register") {
        header.style.display = "none";
      } else {
        header.style.display = "";
      }

      // Simpan halaman aktif sekarang
      currentPage = page;
    }, 400);
  }
}

export default App;
