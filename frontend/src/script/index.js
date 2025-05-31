require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');
import '../style/style.css';
import App from './pages/app';
import * as AuthModel from './utils/auth';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.getElementById('main-content'),
  });
  await app.renderPage();
  
  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });

  AOS.init();
  // Tambahkan event listener untuk tombol logout
  document.body.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'logout-btn') {
      AuthModel.getLogout();
      location.hash = '/login';
    }
  });
});
