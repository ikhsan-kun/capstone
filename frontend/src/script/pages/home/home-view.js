class HomeView {
  constructor() {
    this.app = document.getElementById("main-content");
  }

  async render() {
    return `
       <nav
      class="navbar navbar-expand-lg"
      style="background-color: fffff;"
    >
      <div class="container">
        <h3 class="navbar-brand">NutriAi</h3>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div
      id="home"
      class="container-fluid"
      style="background: linear-gradient(to bottom, #fff 0%, #fff 60%, orange 100%); height: max-content;"
    >
      <div class="container" style="height: 100vh;">
        <div class="row h-100 align-items-center">
          <div class="col-md-6 d-flex flex-column gap-3">
            <h1 style="font-size: 4rem; font-weight: bold">
              Food <br> Nutrition <br> Analyzer
            </h1>
            <p style="font-size: 1rem;">
              Analyze your food's nutritional content and get personalized
              insights to improve your health
            </p>
            <div>
              <a
                href="/upload"
                class="btn btn-outline-dark rounded-5 custom-btn"
                style="background: transparent; border-width: 2px; width: 250px; font-size: 1rem;"
              >
                Get Started
              </a>
            </div>
          </div>
          <div class="col-md-6 d-flex justify-content-center align-items-center">
            <img src="images/image-10.png" alt="img nutri ai" style="position:absolute; top: 180px; right: 550px; width: 130px; height: 150px;">
            <img src="images/image-20.png" alt="image-10" style="position:absolute; top: 300px; right: 0; width: 70px; height: 200px;">
            <img
              src="images/bottom-img1.png" 
              alt="NutriAi Image"
              width="500px"
              height="460px"
            />
          </div>
        </div>
      </div>
      <div class="container" style="height: 100vh;">
        <div class="row justify-content-center">
          <div class="col-md-8 text-center pt-4">
            <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem;">Kenali Makananmu dengan <br> Analisis yang Dipersonalisasi</h2>
            <p style="font-size: 1rem; ">Temukan rahasia tersembunyi dalam makananmu dengan analisis AI canggih kami. Dapatkan rincian makronutrien, mikronutrien, serta potensi risiko kesehatan dari setiap makanan yang kamu konsumsi.</p>
          </div>
        </div>
        <div class="row">
         
        </div>
      </div>
    </div>
    `;
  }
  async afterRender() {}
}
export default HomeView;
