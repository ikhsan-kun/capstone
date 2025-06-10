import AnalyzerView from "./Analyzer-view.js";
import { analyzeFoodImage } from "../../data/api.js";

export default class AnalyzerPresenter {
  constructor({ view }) {
    this.view = view;
  }

  async analyzeImageFile(file, saveHistory = true) {
    this.view.showInfo("menganalisis gambar...");
    const result = await analyzeFoodImage(file, saveHistory);
    if (result.status === "success" && result.data && result.data.food) {
      this.view.showFoodName(result.data.food);
      this.view.showNutrition(result.data);
      this.view.showInfo(
        saveHistory
          ? "Analisis berhasil dan tersimpan di riwayat Anda."
          : "Analisis berhasil (tidak disimpan ke riwayat)."
      );
    } else {
      this.view.showInfo(
        "Gagal analisis: " + (result.message || "Data tidak valid")
      );
    }
  }
}
