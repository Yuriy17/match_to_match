import BaseComponent from '../../components/base-component';
import CardsField from '../../components/card-field/card-field';
import Card from '../../components/card/card';
import Timer from '../../components/timer/timer';
import { ImageCategoryModel } from '../../models/image-category-models';
import delay from '../../shared/delay';
import { Pages } from '../../utils/constant';
import { addClass, createElement, removeClass } from '../../utils/utils';

const FLIP_DELAY = 500;

export default class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private readonly timer: Timer;

  private activeCard?: Card;

  private isAnimation = false;

  private isPause = true;

  private _gameButton: HTMLElement;

  constructor(public goToPage: (page: string) => void) {
    super('section', ['game', 'container']);
    this.timer = new Timer(this.pauseHandler);
    this.cardsField = new CardsField();
    this._gameButton = this.createGameButton();
    // this.start = this.start.bind(this);
  }

  private createGameButton(): HTMLElement {
    const button = createElement('button', ['game-button', 'btn']);
    button.innerText = 'Start Game';
    button.addEventListener('click', () => this.start());
    return button;
  }

  newGame(images: string[], bgImage: string): void {
    this.element.appendChild(this.timer.element);
    this.element.appendChild(this.cardsField.element);
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

  pauseHandler = (): void => {
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
    if (this.isPause || this.isAnimation || !card.isFlipped) return;

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

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    console.log(this);
    console.log(images);
    console.log(cat.bgImage);

    this.newGame(images, cat.bgImage);
    this.goToPage(Pages.game);
  }

  public get gameButton(): HTMLElement {
    return this._gameButton;
  }

  public set gameButton(value: HTMLElement) {
    this._gameButton = value;
  }
}
