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
    try {
      const res = await fetchProfile(token);
      if (res.profile) {
        username = res.profile.username;
        email = res.profile.email;
      }
      // Ambil history user
      const historyRes = await fetchUserHistory();
      if (historyRes.history && Array.isArray(historyRes.history)) {
        // Parsing agar sesuai format yang diharapkan showProfileContent
        history = historyRes.history.map(item => ({
          date: item.detected_at ? item.detected_at.slice(0, 10) : "",
          food: item.food,
          nutrition: {
            kalori: Number(item.kalori),
            protein: Number(item.protein),
            lemak: Number(item.lemak),
            karbo: Number(item.karbo),
          }
        }));
      }
    } catch (e) {
      // Optional: tampilkan error
    }
    this.#view.showProfileContent(history, username, email);
  }
}