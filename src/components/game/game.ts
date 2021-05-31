import delay from '../../shared/delay';
import BaseComponent from '../base-component';
import CardsField from '../card-field/card-field';
import Card from '../card/card';

const FLIP_DELAY = 500;

export default class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    super('div', ['game-container']);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[], bgImage: string) {
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url, index) => new Card(
        `images/${url}`,
        `images/${bgImage}`,
        `${index < 8 ? index : index - 8}`,
      ))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;

    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      await delay(FLIP_DELAY);
      await Promise.all([
        this.activeCard.flipToBack(),
        card.flipToBack(),
      ]);
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
