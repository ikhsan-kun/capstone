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
    <div id="profile-content" style="background: linear-gradient(to bottom, #ffffff, #ffecd2, #fcb67d); min-height: 100vh; padding-top: 50px; padding-bottom: 50px;"></div>
  `;
  }

  async afterRender() {
    // Pastikan render() sudah selesai dan elemen ada
    document.getElementById("profile-content").innerHTML = `
    <div class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <div>Memuat profil...</div>
    </div>
  `;
    this.#presenter = new ProfilePresenter({ view: this });
    await this.#presenter.showProfile();
  }
  async showProfileContent(
    history = [],
    username = "Nama Pengguna",
    email = "user@email.com"
  ) {
    const profileContent = document.getElementById("profile-content");
    if (!profileContent) return;

    const today = new Date().toLocaleDateString("en-CA"); // format: YYYY-MM-DD

    const todayHistory = history.filter((h) => h.date === today);

    const total = { kalori: 0, protein: 0, lemak: 0, karbo: 0 };
    todayHistory.forEach((item) => {
      total.kalori += item.nutrition.kalori;
      total.protein += item.nutrition.protein;
      total.lemak += item.nutrition.lemak;
      total.karbo += item.nutrition.karbo;
    });

    // Warning jika ada yang melebihi kebutuhan harian
    const warning = Object.keys(this.dailyNeeds).some(
      (key) => total[key] > this.dailyNeeds[key]
    );

    profileContent.innerHTML = `
    <div class="container py-5">
      <div class="row g-4 mb-4">
        <!-- Profile Info -->
        <div class="col-md-4 text-center">
          <div class="card border-0 shadow-sm p-4 rounded-4 h-100 justify-content-center align-items-center">
            <img src="images/profil.png" alt="Profile" class="rounded-circle mb-3" style="width:200px;height:200px;object-fit:cover;">
            <h4 class="fw-bold mb-1" style="color:#6c4ba6;">${username}</h4>
            <p class="text-muted mb-0">${email}</p>
          </div>
        </div>

        <!-- Nutrisi Info -->
        <div class="col-md-8">
          <div class="card border-0 shadow-sm p-4 rounded-4">
            <h4 class="fw-bold mb-3" style="color:#6c4ba6;">Kebutuhan Nutrisi Harian</h4>
            <div class="row row-cols-2 row-cols-md-4 g-2 mb-4">
              ${Object.entries(this.dailyNeeds)
                .map(
                  ([key, val]) => `
                <div class="col">
                  <div class="text-center bg-light rounded py-2 px-1">
                    <div class="fw-semibold text-uppercase" style="font-size: 0.9rem;">${key}</div>
                    <div style="font-size: 1rem;">${val} ${
                    key === "kalori" ? "kkal" : "g"
                  }</div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>

            <h5 class="fw-bold mb-2" style="color:#6c4ba6;">Konsumsi Hari Ini : ${today}</h5>
            <div class="row row-cols-2 row-cols-md-4 g-2">
              ${Object.entries(total)
                .map(
                  ([key, val]) => `
                <div class="col">
                  <div class="text-center bg-${
                    val > this.dailyNeeds[key] ? "danger" : "success"
                  } bg-opacity-10 rounded py-2 px-1">
                    <div class="fw-semibold text-uppercase" style="font-size: 0.9rem;">${key}</div>
                    <div style="font-size: 1rem;">${val} ${
                    key === "kalori" ? "kkal" : "g"
                  }</div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>

            ${
              warning
                ? `
              <div class="alert alert-danger mt-3 rounded-3 text-center fw-medium">
                ⚠️ Konsumsi nutrisi Anda melebihi batas harian!
              </div>`
                : ""
            }
          </div>
        </div>
      </div>

      <!-- Riwayat -->
      <div class="row">
        <div class="col-12">
          <div class="card border-0 shadow-sm p-4 rounded-4">
            <h4 class="fw-bold mb-3" style="color:#6c4ba6;">Riwayat Deteksi Makanan</h4>
            <div class="table-responsive">
              <table class="table table-hover table-bordered align-middle">
                <thead class="table-light text-center">
                  <tr>
                    <th>Tanggal</th>
                    <th>Nama Makanan</th>
                    <th>Kalori</th>
                    <th>Protein</th>
                    <th>Lemak</th>
                    <th>Karbo</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  ${history
                    .map(
                      (item) => `
                    <tr>
                      <td>${item.date}</td>
                      <td>${item.food}</td>
                      <td>${item.nutrition.kalori}</td>
                      <td>${item.nutrition.protein}</td>
                      <td>${item.nutrition.lemak}</td>
                      <td>${item.nutrition.karbo}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  }
}
