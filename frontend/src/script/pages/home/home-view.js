class HomeView {
  constructor() {
    this.app = document.getElementById('main-content');
  }

  async render() {
     return `
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="card shadow">
              <div class="card-body">
                <h1 class="card-title text-center mb-4">Home Page</h1>
                <div id="home-content" class="mt-4">
                  <p class="text-center">Welcome to the Food Nutrition Analyzer!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  async afterRender() {
    
  }
}
export default HomeView;