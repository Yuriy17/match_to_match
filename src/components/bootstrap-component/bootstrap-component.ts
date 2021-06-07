import 'bootstrap-component.scss';
import 'mdc-input.scss';
import { BootstrapType } from '../../utils/constant';
import BaseComponent from '../base-component';

export default class BootstrapComponent extends BaseComponent {
  constructor(type: string) {
    switch (type) {
      case BootstrapType.input:
        super('div', ['form-floating']);

        `
<div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
  <label for="floatingInput">Email address</label>
</div>`;
        break;

      case BootstrapType.select:
        super('div', ['form-floating']);
        break;

      case BootstrapType.list:
        super('div', ['list-group', 'list-group-flush']);
        break;

      default:
        super();
        break;
    }
  }

  createInput() {

  }

  createList() {}

  createSelect() {}
}
