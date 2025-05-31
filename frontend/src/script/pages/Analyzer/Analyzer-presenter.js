import AnalyzerView from './Analyzer-view.js';

export default class AnalyzerPresenter {
  constructor(container) {
    this.view = new AnalyzerView(container, this);
  }

  start() {
    this.view.render();
  }

  // Dummy: ganti dengan request ke backend jika sudah ada API
  analyzeImage(imageDataUrl) {
    // Simulasi hasil analisis
    const nutrition = {
      kalori: Math.floor(Math.random() * 50) + 50,
      protein: Math.floor(Math.random() * 50) + 30,
      lemak: Math.floor(Math.random() * 50) + 20,
      karbo: Math.floor(Math.random() * 50) + 40,
    };
    this.view.showNutrition(nutrition);
    this.view.showInfo('Analisis nutrisi di atas adalah contoh. Integrasikan dengan backend untuk hasil nyata.');
  }
}