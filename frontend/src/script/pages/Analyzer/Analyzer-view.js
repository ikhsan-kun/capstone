import AnalyzerPresenter from "./Analyzer-presenter.js";

export default class AnalyzerView {
  #presenter = null;
  #stream = null;
  #facingMode = "environment";

  constructor(container, presenter) {
    this.container = container;
    this.#presenter = presenter;
  }

  async render() {
    return `
      <div class="container py-5" style="min-height: 100vh;">
        <div class="row justify-content-center">
          <div class="col-md-8 text-center">
            <h1 style="font-size: 2.5rem; font-weight: bold;">Food Nutrition Analyzer - Camera</h1>
            <p class="mb-4">Ambil gambar makananmu, lalu lihat analisis nutrisinya!</p>
            <div class="mb-3">
              <button id="openCameraBtn" class="btn btn-success rounded-5 custom-btn mb-2">Buka Kamera</button>
              <button id="switchCameraBtn" class="btn btn-outline-dark rounded-5 custom-btn mb-2" style="display:none;">Switch Camera</button>
            </div>
            <div class="position-relative d-inline-block mb-2">
              <video id="video" autoplay playsinline style="width: 100%; max-width: 400px; border-radius: 1rem; border: 2px solid orange; display:none;"></video>
              <button id="captureBtn" class="btn btn-warning rounded-circle" style="position: absolute; bottom: 10px; right: 10px; display:none;">
                📸
              </button>
            </div>
            <div class="mb-3">
              <label for="uploadInput" class="btn btn-outline-primary rounded-5 custom-btn mb-2">Upload Foto</label>
              <input type="file" id="uploadInput" accept="image/*" style="display:none;">
            </div>
            <canvas id="canvas" style="display:none;"></canvas>
            <div id="result" class="mt-4"></div>
          </div>
        </div>
        <div class="row justify-content-center mt-5">
          <div class="col-md-8">
            <h3 class="mb-3">Nutrisi Terdeteksi</h3>
            <div id="nutrition-bars"></div>
          </div>
        </div>
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" id="saveHistorySwitch" checked>
          <label class="form-check-label" for="saveHistorySwitch">Simpan ke Riwayat</label>
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

    // Kamera hanya aktif setelah tombol ditekan
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
    // Kirim ke backend untuk analisis ML
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
    // Deteksi ekstensi dari filename
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
        // Gunakan nama file asli agar tipe file benar
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

  showNutrition(nutrition) {
    this.nutritionBars.innerHTML = Object.entries(nutrition)
      .map(
        ([key, val]) => `
      <div class="mb-2">
        <div class="d-flex justify-content-between">
          <span style="text-transform:capitalize;">${key}</span>
          <span>${val}%</span>
        </div>
        <div class="progress" style="height: 20px;">
          <div class="progress-bar bg-warning" role="progressbar" style="width: ${val}%;" aria-valuenow="${val}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    `
      )
      .join("");
  }
  stopCamera() {
    if (this.#stream) {
      this.#stream.getTracks().forEach((track) => track.stop());
      this.#stream = null;
    }
  }

  showInfo(message) {
    const resultDiv = this.result;
    if (resultDiv) {
      resultDiv.innerHTML = `
      <div class="alert alert-info" role="alert">
        ${message}
      </div>
    `;
    }
  }
  showFoodName(foodName) {
    if (this.result) {
      this.result.innerHTML =
        `<div class="mb-2" style="font-size:1.2rem;font-weight:bold;">
          Makanan terdeteksi: <span style="color:orange">${foodName}</span>
        </div>` + this.result.innerHTML;
    }
  }
}
