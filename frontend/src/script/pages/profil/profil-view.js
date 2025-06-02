import ProfilePresenter from "./profil-presenter.js";

export default class ProfileView {
  #presenter = null;

  constructor() {
    this.dailyNeeds = {
      kalori: 2000,
      protein: 50,
      lemak: 70,
      karbo: 300,
    };
  }

  async render() {
    return `
      <div id="profile-content"></div>
    `;
  }

  async afterRender() {
    this.#presenter = new ProfilePresenter({ view: this });
    await this.#presenter.showProfile();
  }

  async showProfileContent(history = []) {
    const today = new Date().toISOString().slice(0, 10);
    const todayHistory = history.filter(h => h.date === today);
    const total = { kalori: 0, protein: 0, lemak: 0, karbo: 0 };
    todayHistory.forEach(item => {
      total.kalori += item.nutrition.kalori;
      total.protein += item.nutrition.protein;
      total.lemak += item.nutrition.lemak;
      total.karbo += item.nutrition.karbo;
    });

    const warning = Object.keys(this.dailyNeeds).some(
      key => total[key] > this.dailyNeeds[key]
    );

    document.getElementById("profile-content").innerHTML = `
      <div class="container py-5">
        <div class="row mb-4">
          <div class="col-md-4 text-center">
            <img src="images/profile-default.png" alt="Profile" class="rounded-circle mb-3" style="width:120px;height:120px;">
            <h3>Nama Pengguna</h3>
            <p class="text-muted">user@email.com</p>
          </div>
          <div class="col-md-8">
            <h4>Kebutuhan Nutrisi Harian</h4>
            <ul class="list-group mb-3">
              <li class="list-group-item">Kalori: ${this.dailyNeeds.kalori} kkal</li>
              <li class="list-group-item">Protein: ${this.dailyNeeds.protein} g</li>
              <li class="list-group-item">Lemak: ${this.dailyNeeds.lemak} g</li>
              <li class="list-group-item">Karbohidrat: ${this.dailyNeeds.karbo} g</li>
            </ul>
            <h5>Konsumsi Hari Ini</h5>
            <ul class="list-group mb-3">
              <li class="list-group-item">Kalori: ${total.kalori} kkal</li>
              <li class="list-group-item">Protein: ${total.protein} g</li>
              <li class="list-group-item">Lemak: ${total.lemak} g</li>
              <li class="list-group-item">Karbohidrat: ${total.karbo} g</li>
            </ul>
            ${warning ? `<div class="alert alert-danger">⚠️ Konsumsi nutrisi harian Anda melebihi batas yang disarankan!</div>` : ''}
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <h4>Riwayat Deteksi Makanan</h4>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Nama Makanan</th>
                  <th>Kalori</th>
                  <th>Protein</th>
                  <th>Lemak</th>
                  <th>Karbo</th>
                </tr>
              </thead>
              <tbody>
                ${history.map(item => `
                  <tr>
                    <td>${item.date}</td>
                    <td>${item.food}</td>
                    <td>${item.nutrition.kalori}</td>
                    <td>${item.nutrition.protein}</td>
                    <td>${item.nutrition.lemak}</td>
                    <td>${item.nutrition.karbo}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}