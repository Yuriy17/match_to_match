import BaseComponent from '../base-component';
import Card from '../card/card';
import './card-field.scss';

const SHOW_TIME = 5;

export default class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('section', ['memory-game']);
  }

  clear() {
    this.cards.length = 0;
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, 1000);
  }
}
