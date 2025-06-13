import { getAccessToken } from "../../utils/auth";
import { fetchProfile, fetchUserHistory } from "../../data/api";

export default class ProfilePresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async showProfile() {
    const token = getAccessToken();
    let username = "Nama Pengguna";
    let email = "user@email.com";
    let history = [];
    let totalToday = { kalori: 0, protein: 0, lemak: 0, karbo: 0 };
    try {
      const res = await fetchProfile(token);
      if (res.profile) {
        username = res.profile.username;
        email = res.profile.email;
      }

      const historyRes = await fetchUserHistory();
      if (historyRes.history && Array.isArray(historyRes.history)) {
        history = historyRes.history.map((item) => {
          const parsedDate = item.detected_at
            ? new Date(item.detected_at).toLocaleDateString("en-CA")
            : "";
          return {
            date: parsedDate,
            food: item.food,
            nutrition: {
              kalori: Number(item.kalori),
              protein: Number(item.protein),
              lemak: Number(item.lemak),
              karbo: Number(item.karbo),
            },
          };
        });

        // Hitung total konsumsi hari ini
        const today = new Date().toLocaleDateString("en-CA");
        history.forEach((item) => {
          if (item.date === today) {
            totalToday.kalori += item.nutrition.kalori;
            totalToday.protein += item.nutrition.protein;
            totalToday.lemak += item.nutrition.lemak;
            totalToday.karbo += item.nutrition.karbo;
          }
        });
      }
    } catch (e) {
      // Optional: tampilkan error
    }
    this.#view.showProfileContent(history, username, email, totalToday);
  }
}
