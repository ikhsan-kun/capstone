import HomePresenter from "./home-presenter";


export default class HomeView {
  #presenter = null;

  async render() {
    return `<div
      id="home"
      class="container-fluid pt-5"
      style="
        background: linear-gradient(to bottom, #fff 40%, orange 100%, #fff 0%);
        position: relative;
      "
    >
      <div class="container" style="min-height: 100vh">
        <div class="row h-100 align-items-center py-5">
          <div class="col-md-6 d-flex flex-column gap-3" data-aos="fade-right">
            <h1 class="hero-title" style="font-size: 3.5rem; font-weight: bold">
              Food <br />
              Nutrition <br />
              Analyzer
            </h1>
            <p style="font-size: 1rem">
              Analyze your food's nutritional content and get personalized
              insights to improve your health
            </p>
            <div>
              <a
                href="#/analyzer"
                class="btn btn-outline-dark rounded-5 custom-btn"
                style="
                  background: transparent;
                  border-width: 2px;
                  width: 250px;
                  font-size: 1rem;
                "
              >
                Get Started
              </a>
            </div>
          </div>
          <div
            class="col-md-6 d-flex flex-column align-items-center hero-img-group"
            style="min-height: 400px"
          >
            <img
              src="images/image-10.png"
              alt="img nutri ai"
              style="
                position: absolute;
                top: 6%;
                right: 40%;
                width: 140px;
                height: 140px;
                z-index: 2;
              "
              data-aos="fade-left"
              class="d-none d-md-block"
            />
            <img
              src="images/image-20.png"
              alt="image-20"
              style="
                position: absolute;
                top: 20%;
                right: -10px;
                width: 80px;
                height: 200px;
                z-index: 2;
              "
              data-aos="fade-left"
              class="d-none d-md-block"
            />
            <!-- Gambar utama tetap di tengah -->
            <img
              src="images/bottom-img1.png"
              alt="NutriAi Image"
              style="
                width: 70%;
                max-width: 500px;
                height: auto;
                position: relative;
                z-index: 1;
              "
              data-aos="fade-left"
              class="img-fluid"
            />
            <!-- Versi mobile: gambar absolut jadi inline -->
            <div class="w-100 d-flex justify-content-between d-md-none mt-3">
              <img
                src="images/image-10.png"
                alt="img nutri ai"
                style="width: 80px; height: 90px"
              />
              <img
                src="images/image-20.png"
                alt="image-20"
                style="width: 50px; height: 130px; position: absolute; right: 0;"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-md-8 text-center pt-4" data-aos="zoom-in">
            <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem">
              Kenali Makananmu dengan <br />
              Analisis yang Dipersonalisasi
            </h2>
            <p style="font-size: 1rem">
              Temukan rahasia tersembunyi dalam makananmu dengan analisis AI
              canggih kami. Dapatkan rincian makronutrien, mikronutrien, serta
              potensi risiko kesehatan dari setiap makanan yang kamu konsumsi.
            </p>
          </div>
        </div>
        <div class="row g-4 mt-4">
          <div
            class="col-md-6 d-flex flex-column align-items-center gap-3"
            data-aos="zoom-out-right"
          >
            <img
              src="images/image-item1-removebg-preview.png"
              alt="NutriAi Image"
              class="img-fluid mb-3"
              style="max-width: 350px"
            />
            <div class="card w-100" style="max-width: 35rem">
              <div class="card-body">
                <h5 class="card-title" style="font-weight: bold">
                  Makanan Tinggi Kalori & Rendah Nutrisi
                </h5>
                <p class="card-text">
                  Makanan seperti burger, gorengan, dan makanan cepat saji
                  umumnya tinggi lemak jenuh, kalori, serta gula dan garam
                  berlebih. Konsumsi berlebihan dapat meningkatkan risiko
                  obesitas, diabetes, dan penyakit jantung. Aplikasi kami
                  membantumu mengontrol porsi dan memahami dampaknya terhadap
                  tubuh.
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-md-6 d-flex flex-column align-items-center gap-3"
            data-aos="zoom-out-left"
          >
            <img
              src="images/image-item0-removebg-preview.png"
              alt="NutriAi Image"
              class="img-fluid mb-3"
              style="max-width: 457px"
            />
            <div class="card w-100" style="max-width: 35rem">
              <div class="card-body">
                <h5 class="card-title" style="font-weight: bold">
                  Makanan Rendah Kalori & Tinggi Nutrisi
                </h5>
                <p class="card-text">
                  Buah, sayuran, telur, dan makanan alami lainnya kaya akan
                  vitamin, serat, dan antioksidan. Konsumsi makanan ini secara
                  rutin dapat meningkatkan energi, mendukung metabolisme, dan
                  menjaga kesehatan jangka panjang. Aplikasi ini membantumu
                  memilih makanan yang tepat sesuai kebutuhan nutrisi harianmu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container" style="padding-top: 6rem">
        <div class="row align-items-center justify-content-center">
          <div
            class="col-lg-6 col-md-12 mb-4 mb-lg-0 text-center text-lg-start"
            data-aos="fade-right"
          >
            <h2 style="font-size: 4rem; font-weight: bold; margin-bottom: 1rem" class="hero-title">
              Cutting-Edge <br />
              Nutrition Insights
            </h2>
            <p style="font-size: 1rem; max-width: 450px; margin: 0 0 0 0">
              Our state-of-the-art machine learning algorithms analyze the
              composition of your food with unparalleled accuracy. Get detailed
              breakdowns of macronutrients, micronutrients, and potential
              dietary concerns tailored to your individual needs.
            </p>
            <a
              href="#"
              class="btn btn-outline-dark rounded-5 custom-btn mt-4"
              style="
                background: transparent;
                border-width: 2px;
                width: 250px;
                font-size: 1rem;
              "
            >
              Get More
            </a>
          </div>
          <div class="col-lg-6 col-md-12 text-center" data-aos="fade-left">
            <img
              src="images/undraw_teaching_58yg.svg"
              alt="Nutrition Insights Illustration"
              class="img-fluid"
              style="max-width: 500px; width: 100%;"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      style="
        background: linear-gradient(to bottom, orange 0%, #fff 100%);
        padding-top: 12rem;
      "
      class="container-fluid"
      id="features"
    >
      <div class="container text-center">
        <div class="row text-center" data-aos="fade-up" data-aos-delay="300">
          <h4 style="font-weight: bold">KNOW MORE ABOUT LIFE!</h4>
          <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem" class="hero-title">
            Personalisasi Gaya Hidup
          </h1>
          <p style="font-size: 1rem; max-width: 600px; margin: 0 auto">
            Kesehatan seseorang umumnya ditentukan oleh tiga faktor utama
            berikut:
          </p>
        </div>
        <div class="row justify-content-center mt-5 g-4">
          <div class="col-12 col-md-6 col-lg-4">
            <div
              class="card h-100"
              data-aos="zoom-in-down"
              data-aos-delay="300"
            >
              <img
                src="images/Team spirit-amico.svg"
                class="card-img-top"
                alt="..."
                style="height: 220px; object-fit: contain"
              />
              <div class="card-body">
                <h5 class="card-title">Heredity</h5>
                <p class="card-text">
                  Warisan gen dari orang tua yang memepengaruhi resiko penyakit
                  tertentu seperti diabetes, jantung, dan kanker.
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div
              class="card h-100"
              data-aos="zoom-in-down"
              data-aos-delay="300"
            >
              <img
                src="images/Team spirit-pana.svg"
                class="card-img-top"
                alt="..."
                style="height: 220px; object-fit: contain"
              />
              <div class="card-body">
                <h5 class="card-title">Lifestyle</h5>
                <p class="card-text">
                  termasuk pola makan , aktivitas fisik, tidur, dan kebiasaan
                  sehari-hari yang mempengaruhi kesehatan secara keseluruhan.
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div
              class="card h-100"
              data-aos="zoom-in-down"
              data-aos-delay="300"
            >
              <img
                src="images/Healthy lifestyle-pana.svg"
                class="card-img-top"
                alt="..."
                style="height: 220px; object-fit: contain"
              />
              <div class="card-body">
                <h5 class="card-title">Environment</h5>
                <p class="card-text">
                  Lingkungan tempat tinggal, termasuk polusi, akses ke layanan
                  kesehatan, dan kondisi sosial ekonomi yang dapat mempengaruhi
                  kesehatan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="container text-center py-5 align-items-center"
        style="height: max-content; position: relative"
      >
        <img
          src="images/relative0.png"
          alt=""
          srcset=""
          width="50px"
          class="leaf-responsive"
          style="
            position: absolute;
            top: 0;
            left: 100px;
         
            transform: rotate(180deg);
          "
        />
        <img
          src="images/relative0.png"
          alt=""
          srcset=""
          class="leaf-responsive"
          width="50px"
          style="
            position: absolute;
            top: 3rem;
            right: 100px;
          
            transform: rotate(90deg);
          "
        />

        <h2
          style="font-size: 2rem; font-weight: bold; margin-bottom: 3rem; z-index: 4;"
          data-aos="fade-up"
        >
          Manfaat yang Diperhitungkan dari <br />
          Setiap Makanan
        </h2>
        <div class="row justify-content-center g-4">
          <div class="col-12 col-md-6">
            <div
              class="card mb-3 h-100"
              style="max-width: 540px; margin: 0 auto"
              data-aos="fade-right"
            >
              <div class="row g-0">
                <div
                  class="col-md-4"
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <img
                    src="images/image-80.png"
                    class="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Keseimbangan Gizi</h5>
                    <p class="card-text">
                        Asupan seimbang antara karbohidrat, protein,
                        dan lemak untuk tubuh yang optimal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div
              class="card mb-3 h-100"
              style="max-width: 540px; margin: 0 auto"
              data-aos="fade-left"
            >
              <div class="row g-0">
                <div
                  class="col-md-4"
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <img
                    src="images/icons-8-we-can-do-it-48-10.png"
                    class="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Pemberi Energi Sehat</h5>
                    <p class="card-text">
                          Mendukung aktivitas harian tanpa menyebabkan kelebihan kalori atau rasa lemas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div
              class="card mb-3 h-100"
              style="max-width: 540px; margin: 0 auto"
              data-aos="fade-right"
            >
              <div class="row g-0">
                <div
                  class="col-md-4"
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <img
                    src="images/icons-8-courage-50-10.png"
                    class="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Daya Tahan Tubuh</h5>
                    <p class="card-text">
                         Kaya vitamin, mineral, dan antioksidan untuk menjaga sistem imun tetap kuat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div
              class="card mb-3 h-100"
              style="max-width: 540px; margin: 0 auto"
              data-aos="fade-left"
            >
              <div class="row g-0">
                <div
                  class="col-md-4"
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <img
                    src="images/image-90.png"
                    class="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Pencegahan Penyakit</h5>
                    <p class="card-text">
                      Nutrisi yang membantu menurunkan resiko penyakit kronis seperti diabetes dan jantung.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="container-fluid text-center"
      style="
        background-color: #3a4161;
        color: #fff;
        min-height: 30vh;
        position: relative;
      "
    >
      <img
        src="images/bottom-img0.png"
        alt=""
        srcset=""
        width="150px"
        class="footer-bottom-img"
        style="position: absolute; bottom: 0; right: 0; z-index: 2"
      />
      <img
        src="images/relative0.png"
        alt=""
        srcset=""
        width="50px"
        class="footer-relative-img"
        style="position: absolute; top: -20px; left: 20px; z-index: 2"
      />

      <h3 class="mb-4">Feedback Pengguna</h3>
      
      <div class="mb-4" id="feedback-list" style="max-height: 300px; overflow-y: auto">
       
      </div>
      <button
        type="button"
        class="btn btn-outline-light rounded-5 custom-btn"
        data-bs-toggle="modal"
        data-bs-target="#feedbackModal"
        style="margin-bottom:20px;"
      >
        Beri Feedback
      </button>
    </div>
    <!-- Modal Feedback -->
    <div
      class="modal fade"
      id="feedbackModal"
      tabindex="-1"
      aria-labelledby="feedbackModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content" style="border-radius:1.2rem;">
          <form>
            <div class="modal-header" style="background:linear-gradient(90deg,#ff9800,#ffb74d);color:#fff;border-top-left-radius:1.2rem;border-top-right-radius:1.2rem;">
              <h5 class="modal-title" id="feedbackModalLabel">
                Kirim Feedback Anda
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Tutup"
                style="filter:invert(1);"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="feedbackText" class="form-label">Feedback</label>
                <textarea
                  class="form-control"
                  id="feedbackText"
                  rows="3"
                  required
                  maxlength="200"
                  placeholder="Tulis feedback Anda di sini (max 200 karakter)"
                  style="resize:none;"
                ></textarea>
              </div>
              <div class="mb-3 text-center">
                <label class="form-label mb-2">Rating</label>
                <div id="feedbackRating" class="d-flex justify-content-center gap-2 mb-2">
                  <!-- Bintang rating -->
                  <span class="star" data-value="1" style="font-size:2rem;cursor:pointer;">&#9733;</span>
                  <span class="star" data-value="2" style="font-size:2rem;cursor:pointer;">&#9733;</span>
                  <span class="star" data-value="3" style="font-size:2rem;cursor:pointer;">&#9733;</span>
                  <span class="star" data-value="4" style="font-size:2rem;cursor:pointer;">&#9733;</span>
                  <span class="star" data-value="5" style="font-size:2rem;cursor:pointer;">&#9733;</span>
                </div>
              </div>
            </div>
            <div class="modal-footer d-flex flex-column gap-2">
              <button
                type="submit"
                class="btn btn-warning w-100"
                style="font-weight:bold;font-size:1.1rem; margin-bottom:5px;"
              >
                Kirim Feedback
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary w-100"
                data-bs-dismiss="modal"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <footer class="container-fluid py-4 " style="background-color: #fff; border-top: 3px solid #ff9800;">
  <div class="container text-center">
    <div style="font-size: 1.25rem; font-weight: 600; color: #ff9800;">
      Food Nutrition Analyzer &copy; <span id="year"></span>
    </div>
    <div style="font-size: 1rem; color: #555; margin-top: 4px;">
      Made with <span style="color: #ff5722;">&#10084;</span> by <strong>capstone tim CC25-CF313</strong>
    </div>
    <div class="mt-3" style="font-size: 0.9rem; color: #999;">
      All rights reserved. Empowering healthy choices through smart nutrition.
    </div>
  </div>
</footer>`;
  }
  async afterRender() {
    this.#presenter = new HomePresenter({ view: this });
    this.#presenter.loadFeedback();

   
    const stars = document.querySelectorAll("#feedbackRating .star");
    let selectedRating = 0;
    stars.forEach((star) => {
      star.addEventListener("click", function () {
        selectedRating = Number(this.dataset.value); // pastikan Number, bukan parseInt
        stars.forEach((s, idx) => {
          s.style.color = idx < selectedRating ? "orange" : "#ccc";
        });
      });
    });

    // Submit feedback
    const form = document.querySelector("#feedbackModal form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = document.getElementById("feedbackText").value;
        if (!selectedRating) {
          alert("Pilih rating terlebih dahulu!");
          return;
        }
        this.#presenter.submitFeedback(message, selectedRating);
      });
    }
  }

  showLoginMessage() {
    const feedbackListDiv =
      document.querySelectorAll("#feedback-list")[1] ||
      document.getElementById("feedback-list");
    if (feedbackListDiv) {
      feedbackListDiv.innerHTML = `<div class="alert alert-warning" style="z-index :4;">Anda harus login untuk melihat dan mengirim feedback.</div>`;
    }
    const btn = document.querySelector(
      'button[data-bs-target="#feedbackModal"]'
    );
    if (btn) btn.disabled = true;
  }

  showFeedbackList(feedback) {
    const feedbackListDiv =
      document.querySelectorAll("#feedback-list")[1] ||
      document.getElementById("feedback-list");
    if (feedbackListDiv) {
      feedbackListDiv.innerHTML = feedback.length
        ? feedback
            .map(
              (fb) => `
  <div class="card mb-3 shadow-sm border-0 mx-auto feedback-card-responsive" style="border-radius: 1rem;">
    <div class="card-body d-flex align-items-center gap-3">
      <div class="rounded-circle bg-warning d-flex align-items-center justify-content-center" style="width:48px;height:48px;font-size:1.6rem;">
         <img src="images/profil.png" alt="Profile" class="rounded-circle"  style="width:48px;height:48px;">
      </div>
      <div class="flex-grow-1">
        <div class="d-flex align-items-center mb-1">
          <strong class="me-2" style="color:#ff9800;">${fb.users?.username || "Anonim"}</strong>
          <div>
            ${[...Array(5)]
              .map(
                (_, i) =>
                  `<span style="font-size:1.2rem;color:${
                    i < fb.rating ? "#ffb300" : "#e0e0e0"
                  }">&#9733;</span>`
              )
              .join("")}
          </div>
        </div>
        <p class="card-text mb-0" style="font-size:1.05rem;">${fb.message}</p>
        <small class="text-muted">${fb.created_at ? new Date(fb.created_at).toLocaleDateString() : ""}</small>
      </div>
    </div>
  </div>
`
            )
            .join("")
        : `<div class="alert alert-info">Belum ada feedback. Jadilah yang pertama!</div>`;
    }
    const btn = document.querySelector(
      'button[data-bs-target="#feedbackModal"]'
    );
    if (btn) btn.disabled = false;
  }

  showFeedbackError() {
    const feedbackListDiv =
      document.querySelectorAll("#feedback-list")[1] ||
      document.getElementById("feedback-list");
    if (feedbackListDiv) {
      feedbackListDiv.innerHTML = `<div class="alert alert-danger" style="z-index :4;">Gagal memuat feedback.</div>`;
    }
  }
  onFeedbackSubmitted() {
    window.location.reload();

  }
}
