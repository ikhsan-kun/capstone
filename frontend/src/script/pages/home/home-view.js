class HomeView {
  constructor() {
    this.app = document.getElementById("main-content");
  }

  async render() {
    return `
      <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div class="container-fluid">
          <a class="navbar-brand" href="#/">NutriAI</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/register">Register</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card shadow">
              <div class="card-body">
                <h1 class="card-title text-center mb-4">NutriAI</h1>
                <div id="home-content" class="mt-4">
                  <p class="text-center">Welcome to the Food Nutrition Analyzer!</p>
                </div>
                <div id ="navbar"
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="bg-light text-center text-lg-start mt-5 shadow-sm">
        <div class="text-center p-3" style="background-color: #f8f9fa;">
          © 2025 Food Nutrition Analyzer | All rights reserved.
        </div>
      </footer>
    `;
  }
  async afterRender() {}
}
export default HomeView;
