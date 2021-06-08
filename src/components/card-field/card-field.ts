import BaseComponent from '../base-component';
import Card from '../card/card';
import './card-field.scss';

const SHOW_TIME = 5;

export default class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['game__cards']);
  }

  clear() {
    this.cards.length = 0;
  }

  addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));

    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, 1000);
  }

  isComplete = ():boolean => {
    let isComplete = true;
    this.cards.forEach((card) => {
      if (!card.element.classList.contains('right')) {
        isComplete = false;
      }
    });
    return isComplete;
  };
}
