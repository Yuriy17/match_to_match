import { EntryButtons } from '../../models/elements-model';
import { Observer, Subject } from '../../models/patterns-model';
import { State } from '../../utils/constant';
import { createElement } from '../../utils/utils';
import BaseComponent from '../base-component';
import ConcreteSubject from '../concrete-subject';

export default class HeaderControl extends BaseComponent implements Observer {
  logButtons: EntryButtons;

  constructor(logButtons: EntryButtons) {
    super('div', ['control-container']);
    this.logButtons = logButtons;
    this.element.append(
      this.logButtons.regButton,
      this.logButtons.logInButton,
    );
  }

  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject) {
      if (subject.state === State.loggedOut) {
        const text = createElement('span', ['out']);
        text.innerText = 'out';
        this.element.append(text);
      } else if (subject.state === State.loggedIn) {
        const text = createElement('span', ['in']);
        text.innerText = 'in';
        this.element.append(text);
      } else if (subject.state === State.registered) {
        const text = createElement('span', ['reg']);
        text.innerText = 'reg';
        this.element.append(text);
      }
    }
  }
}
