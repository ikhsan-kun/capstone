export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getRegistered({ username, email, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.registerUser({ username, email, password });

      if (response.error) {
        console.error('getRegistered: response:', response);
        this.#view.registeredFailed(response.error);
        return;
      }

      this.#view.registeredSuccessfully(response.message, response.user); 
    } catch (error) {
      console.error('getRegistered: error:', error);
      this.#view.registeredFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
