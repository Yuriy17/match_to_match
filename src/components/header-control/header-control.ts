import { EntryButtons } from '../../models/elements-model';
import { Observer, Subject } from '../../models/patterns-model';
import { State } from '../../utils/constant';
import { createElement, getRandomInt } from '../../utils/utils';
import BaseComponent from '../base-component';
import ConcreteSubject from '../concrete-subject';
import './header-control.scss';

const defaultAvatarImages = [
  'images/default-avatars/jaina.png',
  'images/default-avatars/man.png',
  'images/default-avatars/molot.png',
  'images/default-avatars/murloc.png',
  'images/default-avatars/paladin.png',
  'images/default-avatars/thief.png',
];

export default class HeaderControl extends BaseComponent implements Observer {
  constructor(
    private logButtons: EntryButtons,
    private getPhoto: () => string,
    private gameButton: HTMLElement,
    private resetPerson: () => void,
  ) {
    super('div', ['control-container', 'header__item']);
    this.element.append(this.logButtons.regButton, this.logButtons.logInButton);
  }

  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject) {
      if (subject.state === State.loggedOut) {
        this.afterLogOut();
      } else if (subject.state === State.loggedIn) {
        this.afterLogIn();
      } else if (subject.state === State.registered) {
        console.log(1);

        this.afterLogIn();
      }
    }
  }

  private afterLogIn() {
    const photo = createElement('div', ['log-photo']);
    const photoSrc = this.getPhoto();
    const photoImage = createElement(
      'img',
      ['log-photo__image'],
      [
        [
          'src',
          photoSrc || defaultAvatarImages[getRandomInt(defaultAvatarImages.length)],
        ],
        ['alt', 'photo'],
      ],
    );

    photo.append(photoImage);

    this.element.innerHTML = '';
    this.element.append(photo, this.gameButton, this.logButtons.logOutButton);
  }

  private afterLogOut() {
    this.resetPerson();
    this.element.innerHTML = '';
    this.element.append(
      this.logButtons.regButton,
      this.logButtons.logInButton,
    );
  }
}
