import BaseComponent from '../base-component';
import './card.scss';

const FLIP_CLASS = 'flip';

export default class Card extends BaseComponent {
  isFlipped = false;

  constructor(
    readonly image: string,
    readonly bgImage: string,
    readonly index: string,
  ) {
    super(
      'div',
      ['memory-card'],
      [
        [
          'data-image',
          `${index}`,
        ],
      ],
    );
    this.element.innerHTML = `
      <img class="front-face" src="${image}" alt="image ${index}">
      <img class="back-face" src="${bgImage}" alt="Memory Card">
    `;
  }

  flipToBack() {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront() {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, !isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
