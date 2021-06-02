import BaseComponent from '../base-component';

export default class Timer extends BaseComponent {
  constructor() {
    super('div', ['timer']);
  }

  // createList = () {

  // }
  addTimer = (): HTMLElement => {
    const minites = document.createElement('span');
    const spliter = document.createElement('span');
    const seconds = document.createElement('span');

    minites.classList.add('timer__minites');
    spliter.classList.add('timer__spliter');
    seconds.classList.add('timer__seconds');

    minites.innerText = '12';
    spliter.innerText = ':';
    seconds.innerText = '22';

    this.element.append(minites, spliter, seconds);

    return this.element;
  };

  clear = () => {

  };
}
