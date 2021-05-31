import App from './components/app';
import './styles.scss';

window.addEventListener('load', () => {
  const appElement = document.getElementById('app');
  if (!appElement) throw Error('App root element not found');

  new App(appElement).start();
});
