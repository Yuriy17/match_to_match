// import '@fortawesome/fontawesome-free/js/brands';
// import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import App from './components/app';
import './styles.scss';

window.addEventListener('load', () => {
  const appElement = document.getElementById('app');
  if (!appElement) throw Error('App root element not found');

  new App(appElement).start();
});
