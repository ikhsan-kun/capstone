import HomeView from '../pages/home/home-view';
import LoginView from '../pages/login/login-view';
import RegisterView from '../pages/register/register-view';
import AnalyzerView from '../pages/Analyzer/Analyzer-view';
import ProfilView from '../pages/profil/profil-view';
import {checkAuthenticatedRoute} from '../utils/auth'

const routes = {
  '/': new HomeView(),
  '/login': new LoginView(),
  '/register': new RegisterView(),
  '/analyzer': checkAuthenticatedRoute(new AnalyzerView()),
  '/profil': checkAuthenticatedRoute(new ProfilView()), 
};

export default routes;
