import delay from '../../shared/delay';
import BaseComponent from '../base-component';
import CardsField from '../card-field/card-field';
import Card from '../card/card';
import Timer from '../timer/timer';

const FLIP_DELAY = 500;

export default class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private readonly timer: Timer;

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    super('section', ['game', 'container']);
    this.cardsField = new CardsField();
    this.timer = new Timer();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[], bgImage: string) {
    this.cardsField.clear();
    this.timer.clear();
    console.log(this.element);

    this.element.appendChild(this.timer.addTimer());
    const sizedImages = images.slice(0, 5);
    const cards = sizedImages
      .concat(sizedImages)
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

  clear = ():void => {
    this.cardsField.clear();
    this.timer.clear();
    this.element.innerHTML = '';
  };
  // newPreview(){
  // preview images in about page
  // }

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
