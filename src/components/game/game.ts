import delay from '../../shared/delay';
import { addClass, removeClass } from '../../utils/utils';
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

  private isPause = true;

  constructor() {
    super('section', ['game', 'container']);
    this.timer = new Timer(
      this.pauseHandler,
    );
    this.cardsField = new CardsField();
    this.element.appendChild(this.timer.element);
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[], bgImage: string):void {
    this.timer.clear();
    this.cardsField.clear();
    const sizedImages = images.slice(0, 5);
    const cards = sizedImages
      .concat(sizedImages)
      .map(
        (url, index) => new Card(
          `images/${url}`,
          `images/${bgImage}`,
          `${index < 8 ? index : index - 8}`,
        ),
      )
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    this.cardsField.addCards(cards);
  }

  pauseHandler = ():void => {
    if (this.isPause) {
      this.element.classList.add('game_on');
      this.isPause = false;
      this.timer.startTimer();
    } else {
      this.element.classList.remove('game_on');
      this.isPause = true;
      this.timer.stopTimer();
    }
  };

  clear = (): void => {
    this.cardsField.clear();
    this.timer.clear();
    this.element.innerHTML = '';
  };
  // newPreview(){
  // preview images in about page
  // }

  private async cardHandler(card: Card) {
    if (this.isPause
      || this.isAnimation
      || !card.isFlipped) return;

    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      addClass([this.activeCard.element, card.element], 'wrong');
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      removeClass([this.activeCard.element, card.element], 'wrong');
    } else {
      addClass([this.activeCard.element, card.element], 'right');
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
