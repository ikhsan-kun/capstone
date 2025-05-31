import HomeView from '../pages/home/home-view';
import LoginView from '../pages/login/login-view';
import RegisterView from '../pages/register/register-view';
import AnalyzerView from '../pages/Analyzer/Analyzer-view';
const routes = {
  '/': new HomeView(),
  '/login': new LoginView(),
  '/register': new RegisterView(),
  '/analyzer': new AnalyzerView(),
};

export default routes;
