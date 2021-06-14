import App from './components/app';
import './styles.scss';

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app');
  if (!appElement) throw Error('App root element not found');

  new App(appElement).start();
});
