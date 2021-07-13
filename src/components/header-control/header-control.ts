import { EntryButtons } from '../../models/elements-model';
import { Observer, Subject } from '../../models/patterns-model';
import { State } from '../../utils/constant';
import { createElement } from '../../utils/utils';
import BaseComponent from '../base-component';
import ConcreteSubject from '../concrete-subject';

export default class HeaderControl extends BaseComponent implements Observer {
  // logButtons: EntryButtons;

  constructor(
    private logButtons: EntryButtons,
    private photo: string,
    private gameButton: HTMLElement,
  ) {
    super('div', ['control-container']);
    this.element.append(this.logButtons.regButton, this.logButtons.logInButton);
  }

  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject) {
      if (subject.state === State.loggedOut) {
        this.afterLogOut();
      } else if (subject.state === State.loggedIn) {
        this.afterLogIn();
      } else if (subject.state === State.registered) {
        this.afterLogIn();
      }
    }
  }

  private afterLogIn() {
    const photo = createElement('div', ['log-photo']);
    const photoImage = createElement(
      'img',
      ['log-photo__image'],
      [
        ['src', this.photo],
        ['alt', 'photo'],
      ],
    );

    photo.append(photoImage);

    this.element.innerHTML = '';
    this.element.append(photo, this.gameButton, this.logButtons.logOutButton);
  }

  private afterLogOut() {
    this.element.innerHTML = '';
    this.element.append(
      this.logButtons.regButton,
      this.logButtons.logOutButton,
    );
  }
}
