class HomeView {
  constructor() {
    this.app = document.getElementById('app');
  }

  render() {
    this.app.innerHTML = `
      <div class="container mt-5">
        <h1 class="text-center">Home Page</h1>
        <div id="home-content" class="mt-4">
          <p>Loading...</p>
        </div>
      </div>
    `;
  }

//   updateContent(data) {
//     const content = document.getElementById('home-content');
//     content.innerHTML = data
//       .map((item) => `<p>${item.title}</p>`)
//       .join('');
//   }
}
module.exports = HomeView;