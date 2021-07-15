/* eslint-disable @typescript-eslint/comma-dangle */
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faCog,
  faQuestion,
  faSpinner,
  faTrophy,
  faWarehouse
} from '@fortawesome/free-solid-svg-icons';
import App from './components/app';
import './styles.scss';

// We are only using the usser-astronaut icon
library.add(faTrophy, faCog, faQuestion, faWarehouse, faSpinner, faCheck);

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch();
document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app');
  if (!appElement) throw Error('App root element not found');

  const app = new App(appElement);
  app.init();
});
