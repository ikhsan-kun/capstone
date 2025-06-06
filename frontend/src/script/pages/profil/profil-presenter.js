import { getAccessToken } from "../../utils/auth";
import { fetchProfile } from "../../data/api";

export default class ProfilePresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async showProfile() {
    const token = getAccessToken();
    let username = "Nama Pengguna";
    let email = "user@email.com";
    try {
      const res = await fetchProfile(token);
      if (res.profile) {
        username = res.profile.username;
        email = res.profile.email;
      }
    } catch (e) {
      // handle error, bisa tampilkan pesan error
    }
    await this.#view.showProfileContent([], username, email);
  }
}
