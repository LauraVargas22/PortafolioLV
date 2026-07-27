import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './styles/home-page.css';
import './styles/home-styles.css';
import './components/portfolio-home-page.js';
import './components/portfolio-personality-page.js';
import './components/portfolio-studies-page.js';
import './components/portfolio-experience-page.js';
import { getCurrentLanguage, setCurrentLanguage } from './i18n';

setCurrentLanguage(getCurrentLanguage());
