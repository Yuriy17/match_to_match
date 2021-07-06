import BaseComponent from '../base-component';
import './footer.scss';

export default class Footer extends BaseComponent {
  constructor() {
    super('footer', ['footer']);
  }

  initLayout = (): void => {
    this.element.innerHTML = `
      <p class="footer-text">
        by <a href="https://github.com/Yuriy17" target="_blank">Yuriy</a>
        thanks to <a href="https://github.com/rolling-scopes-school" target="_blank" ,>RS School</a>
      </p>`;
  };
}
