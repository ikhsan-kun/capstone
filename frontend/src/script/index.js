require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');
import '../style/style.css';
import App from './pages/app';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import "bootstrap-icons/font/bootstrap-icons";
// import 'sweetalert2/src/sweetalert2.scss'

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
 
});
