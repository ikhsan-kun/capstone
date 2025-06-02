import { fetchAllFeedback, postFeedback } from '../../data/api';
import { getAccessToken } from '../../utils/auth';

export default class HomePresenter {
  constructor({ view }) {
    this.view = view;
  }

  async loadFeedback() {
    const token = getAccessToken();
    if (!token) {
      this.view.showLoginMessage();
      return;
    }
    try {
      const data = await fetchAllFeedback(token);
      this.view.showFeedbackList(data.feedback || []);
    } catch (e) {
      this.view.showFeedbackError();
    }
  }

  async submitFeedback(message, rating) {
    const token = getAccessToken();
    if (!token) {
      this.view.showLoginMessage();
      return;
    }
    try {
      await postFeedback(token, { message, rating });
      this.view.onFeedbackSubmitted();
    } catch (e) {
      this.view.showFeedbackError();
    }
  }
}