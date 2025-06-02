export default class ProfilePresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async showProfile() {
    // Dummy data, ganti dengan fetch dari backend jika sudah ada API
    const history = [
      {
        date: new Date().toISOString().slice(0, 10),
        food: "Nasi Goreng",
        nutrition: { kalori: 350, protein: 8, lemak: 10, karbo: 60 }
      },
      {
        date: new Date().toISOString().slice(0, 10),
        food: "Ayam Bakar",
        nutrition: { kalori: 250, protein: 20, lemak: 15, karbo: 5 }
      },
      {
        date: "2025-05-31",
        food: "Sate",
        nutrition: { kalori: 200, protein: 12, lemak: 8, karbo: 10 }
      }
    ];

    await this.#view.showProfileContent(history);
  }
}