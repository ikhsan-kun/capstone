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
      </div>
      <div id="maskot-jeruk-fixed">
        <img src="images/maskot-jeruk.png" alt="Maskot Jeruk" class="maskot-img">
        <div class="maskot-cloud">
          <div class="fw-semibold mb-1">Saran:</div>
          <div style="font-size:0.95rem;">
            Perhatikan asupan nutrisi harian Anda.<br>
            <a href="https://www.halodoc.com/artikel/mengenal-pedoman-gizi-seimbang-dan-manfaat-untuk-kesehatan?srsltid=AfmBOoq7nXmZnpnyAdFOQmNLpYNnEVtrBQbsdeFEynuUrDvMiCUwx6r3" target="_blank" style="color:#6c4ba6;text-decoration:underline;">
              Pentingnya Nutrisi & Kesehatan
            </a>
          </div>
        </div>
      </div>
      <style>
        #maskot-jeruk-fixed {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 9999;
          display: flex;
          align-items: flex-end;
          gap: 12px;
          animation: maskot-pop 0.5s;
        }
        .maskot-img {
          width: 80px;
          height: 80px;
          object-fit: contain;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.15));
        }
        .maskot-cloud {
          background: #fffbe7;
          border-radius: 24px 24px 24px 0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          padding: 16px 20px;
          min-width: 210px;
          max-width: 270px;
          font-size: 1rem;
          color: #6c4ba6;
          border: 1.5px solid #fcb67d;
        }
        @keyframes maskot-pop {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 600px) {
          #maskot-jeruk-fixed { right: 8px; bottom: 8px; }
          .maskot-img { width: 56px; height: 56px; }
          .maskot-cloud { min-width: 120px; padding: 10px 12px; font-size:0.92rem;}
        }
      </style>
    `
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
                    .slice(0, 10) // Hanya ambil 10 item pertama
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
                    `).join("")}
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
