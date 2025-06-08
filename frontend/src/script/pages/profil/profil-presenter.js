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
        const historyRes = await fetchUserHistory();
        if (historyRes.status === "success") {
          history = historyRes.history;
        }
      }
    } catch (e) {}
    await this.#view.showProfileContent(history, username, email);
  }
}