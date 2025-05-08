require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');
const routes = require('./script/routes/routes.js');
const { getActiveRoute } = require('./script/routes/url-parser.js');

const router = async () => {
  const routeName = getActiveRoute();
  const route = routes[routeName];

  if (route) {
    await route();
  } else {
    console.error('Route not found:', routeName);
  }
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);