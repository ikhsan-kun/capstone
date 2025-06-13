import AnalyzerPresenter from "./Analyzer-presenter.js";

export default class AnalyzerView {
  #presenter = null;
  #stream = null;
  #facingMode = "environment";

  constructor(container, presenter) {
    this.container = container;
    this.#presenter = presenter;

    // Tambahkan gaya langsung
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        font-family: 'Arial', sans-serif;
      }

      .custom-btn {
        padding: 10px 20px;
        font-weight: 600;
        border-radius: 999px;
        font-size: 1rem;
        transition: all 0.2s ease-in-out;
      }

      .btn-orange {
        background-color: orange;
        color: white;
        border: none;
      }

      .btn-orange:hover {
        background-color: darkorange;
      }

      .btn-outline-orange {
        color: orange;
        border: 2px solid orange;
        background-color: transparent;
      }

      .btn-outline-orange:hover {
        background-color: orange;
        color: white;
      }

      .rounded-pill {
        border-radius: 999px !important;
      }

      .icon-animate {
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 100px;
        height: 100px;
        animation: bounce 2s infinite;
      }

      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  async render() {
    return `
      <div class="container py-5" style="min-height: 100vh; background-color: #fff; color: #333; position: relative;">
        <img src="images/icon jeruk.png" class="icon-animate" alt="Icon Jeruk" />
        <div class="row justify-content-center">
          <div class="col-md-10 text-center">
            <h1 class="mb-2" style="font-size: 2.7rem; font-weight: bold; color: orange;">Food Nutrition Analyzer</h1>
            <p class="mb-4" style="font-size: 1.2rem;">Ambil gambar makananmu atau unggah foto, dan lihat analisis nutrisinya secara instan!</p>
            
            <div class="mb-4 d-flex flex-column flex-sm-row justify-content-center gap-2">
              <button id="openCameraBtn" class="btn btn-orange custom-btn shadow">Buka Kamera</button>
              <button id="switchCameraBtn" class="btn btn-outline-orange custom-btn shadow" style="display:none;">Ganti Kamera</button>
            </div>

            <div class="position-relative d-inline-block mb-3" style="max-width: 100%; width: 400px;">
              <video id="video" autoplay playsinline style="width: 100%; border-radius: 1rem; border: 3px solid orange; display:none;"></video>
              <button id="captureBtn" class="btn btn-orange rounded-circle shadow" style="position: absolute; bottom: 10px; right: 10px; width: 56px; height: 56px; display:none; font-size: 1rem;">
                Ambil
              </button>
            </div>

            <div class="mb-4">
              <label for="uploadInput" class="btn btn-outline-orange custom-btn shadow">Upload Foto</label>
              <input type="file" id="uploadInput" accept="image/*" style="display:none;">
            </div>

            <canvas id="canvas" style="display:none;"></canvas>
            <div id="result" class="mt-4"></div>
          </div>
        </div>

        <div class="row justify-content-center mt-5">
          <div class="col-md-10">
            <h3 class="mb-3 text-center" style="color: orange;">Nutrisi Terdeteksi</h3>
            <div id="nutrition-bars"></div>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-4">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="saveHistorySwitch" checked>
            <label class="form-check-label ms-2 fw-semibold" for="saveHistorySwitch" style="color: orange;">Simpan ke Riwayat</label>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.video = document.getElementById("video");
    this.canvas = document.getElementById("canvas");
    this.result = document.getElementById("result");
    this.nutritionBars = document.getElementById("nutrition-bars");
    this.captureBtn = document.getElementById("captureBtn");
    this.switchCameraBtn = document.getElementById("switchCameraBtn");
    this.uploadInput = document.getElementById("uploadInput");
    this.openCameraBtn = document.getElementById("openCameraBtn");

    this.#presenter = new AnalyzerPresenter({ view: this });

    this.openCameraBtn.addEventListener("click", async () => {
      await this.startCamera();
      this.video.style.display = "block";
      this.captureBtn.style.display = "inline-block";
      this.switchCameraBtn.style.display = "inline-block";
      this.openCameraBtn.style.display = "none";
    });

    this.switchCameraBtn.addEventListener("click", async () => {
      this.#facingMode =
        this.#facingMode === "environment" ? "user" : "environment";
      await this.startCamera();
    });

    this.captureBtn.addEventListener("click", () => {
      this.captureImage();
    });

    this.uploadInput.addEventListener("change", (e) => {
      this.handleUpload(e);
    });
  }

  async startCamera() {
    if (this.#stream) {
      this.#stream.getTracks().forEach((track) => track.stop());
    }
    try {
      this.#stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: this.#facingMode },
      });
      this.video.srcObject = this.#stream;
    } catch (e) {
      this.video.poster = "";
      this.video.style.background = "#eee";
      this.video.style.display = "block";
      this.video.setAttribute("alt", "Camera not available");
      alert("Tidak dapat mengakses kamera!");
    }
  }

  captureImage() {
    const video = this.video;
    const canvas = this.canvas;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    this.result.innerHTML = `
      <img src="${canvas.toDataURL(
        "image/png"
      )}" alt="Captured" class="img-fluid rounded mb-3" style="max-width: 300px; border: 2px solid orange;" />
    `;

    const saveHistory = document.getElementById("saveHistorySwitch").checked;
    this.#presenter.analyzeImageFile(
      this.dataURLtoFile(canvas.toDataURL("image/png"), "capture.png"),
      saveHistory
    );
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let ext = filename.split(".").pop().toLowerCase();
    let type = mime;
    if (ext === "jpg" || ext === "jpeg") type = "image/jpeg";
    if (ext === "png") type = "image/png";
    return new File([u8arr], filename, { type });
  }

  handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = this.canvas;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        this.result.innerHTML = `
          <img src="${canvas.toDataURL(
            "image/png"
          )}" alt="Uploaded" class="img-fluid rounded mb-3" style="max-width: 300px; border: 2px solid orange;" />
        `;

        const saveHistory =
          document.getElementById("saveHistorySwitch").checked;
        if (!this.#presenter || !this.#presenter.analyzeImageFile) {
          alert("Presenter tidak terinisialisasi dengan benar!");
          return;
        }
        this.#presenter.analyzeImageFile(
          this.dataURLtoFile(canvas.toDataURL("image/png"), file.name),
          saveHistory
        );
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  showFoodName(foodName) {
    if (this.result) {
      const foodHtml = `
        <div class="mb-3">
          <div class="px-4 py-2 rounded-pill text-white" style="background-color: orange; display: inline-block; font-size: 1.1rem;">
            Makanan terdeteksi: <strong>${foodName}</strong>
          </div>
        </div>
      `;
      this.result.innerHTML = foodHtml + this.result.innerHTML;
    }
  }

  showNutrition(nutrition) {
    
    const maxKalori = 500;
    const maxProtein = 50;
    const maxKarbo = 100;
    const maxLemak = 50;

    const kaloriPct = Math.min((nutrition.kalori / maxKalori) * 100, 100);
    const proteinPct = Math.min((nutrition.protein / maxProtein) * 100, 100);
    const karboPct = Math.min((nutrition.karbo / maxKarbo) * 100, 100);
    const lemakPct = Math.min((nutrition.lemak / maxLemak) * 100, 100);

    this.nutritionBars.innerHTML = `
      <div class="card shadow border-0 mb-3" style="background-color: #fff; max-width: 600px; margin: auto;">
        <div class="card-body">
          <div class="row">
            <div class="col-12 mb-3">
              <label class="form-label fw-semibold">Kalori</label>
              <div class="progress" style="height: 22px;">
                <div class="progress-bar bg-warning" role="progressbar" style="width: ${kaloriPct}%" aria-valuenow="${kaloriPct}" aria-valuemin="0" aria-valuemax="100">
                  ${nutrition.kalori} kkal )
                </div>
              </div>
            </div>

            <div class="col-12 mb-3">
              <label class="form-label fw-semibold">Protein</label>
              <div class="progress" style="height: 22px;">
                <div class="progress-bar bg-primary" role="progressbar" style="width: ${proteinPct}%" aria-valuenow="${proteinPct}" aria-valuemin="0" aria-valuemax="100">
                  ${nutrition.protein} %)
                </div>
              </div>
            </div>

            <div class="col-12 mb-3">
              <label class="form-label fw-semibold">Karbohidrat</label>
              <div class="progress" style="height: 22px;">
                <div class="progress-bar bg-success" role="progressbar" style="width: ${karboPct}%" aria-valuenow="${karboPct}" aria-valuemin="0" aria-valuemax="100">
                  ${nutrition.karbo}%)
                </div>
              </div>
            </div>

            <div class="col-12 mb-3">
              <label class="form-label fw-semibold">Lemak</label>
              <div class="progress" style="height: 22px;">
                <div class="progress-bar bg-danger" role="progressbar" style="width: ${lemakPct}%" aria-valuenow="${lemakPct}" aria-valuemin="0" aria-valuemax="100">
                  ${nutrition.lemak}%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  showInfo(message) {
    const infoDivId = "info-message";
    let infoDiv = document.getElementById(infoDivId);
    if (!infoDiv) {
      infoDiv = document.createElement("div");
      infoDiv.id = infoDivId;
      infoDiv.className = "mt-3 text-center";
      this.result.parentNode.insertBefore(infoDiv, this.result.nextSibling);
    }
    infoDiv.innerHTML = `
      <div class="alert alert-warning shadow-sm border-0" role="alert" style="max-width:350px;margin:auto; background-color: #fff3cd; color: #856404;">
        ${message}
      </div>
    `;
  }

  stopCamera() {
    if (this.#stream) {
      this.#stream.getTracks().forEach((track) => track.stop());
      this.#stream = null;
    }
  }
}
