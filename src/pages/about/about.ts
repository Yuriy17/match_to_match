import BaseComponent from '../../components/base-component';
import { createElement } from '../../utils/utils';
import './about.scss';

export default class About extends BaseComponent {
  constructor(
    private getRegExample: () => Node,
    private getLogInExample: () => Node,
  ) {
    super('div', ['about']);
    this.initLayout();
  }

  initLayout = (): void => {
    const container = createElement('div', ['container']);
    const aboutList = createElement('ol', ['about__list']);

    const itemsArray: HTMLElement[] = [
      this.createEntryStep('Register new player in game or logging in'),
      this.createSettingsStep('Configure your game settings'),
      this.createGameStep(
        'Start you new game! Remember card positions and match it before times up.',
      ),
    ];
    itemsArray.forEach((item) => {
      const aboutItem = createElement('li', ['about__item']);
      aboutItem.append(item);
      aboutList.append(aboutItem);
    });
    container.append(aboutList);
    this.element.append(container);
  };

  createStepTitle = (text: string): HTMLElement => {
    const colBlock = createElement('div', ['col-md-4', 'col-12']);
    const block = createElement('div', ['step__block']);
    const content = createElement('p', ['step__text']);

    content.innerText = text;
    block.append(content);
    colBlock.append(block);
    return colBlock;
  };

  createEntryStep = (text: string): HTMLElement => {
    const block = createElement('div', ['entry-step', 'step', 'row']);
    const colRegBlock = createElement('div', ['col-md-5', 'col-12']);
    const colLogBlock = createElement('div', ['col-md-3', 'col-12']);
    colRegBlock.append(this.getLogInExample());
    colLogBlock.append(this.getRegExample());
    block.append(
      this.createStepTitle(text),
      colLogBlock,
      colRegBlock,
    );
    return block;
  };

  createSettingsStep = (text: string): HTMLElement => {
    const block = createElement('div', ['settings-step', 'step', 'row']);
    const colBlock = createElement('div', ['col-md-8', 'col-12']);
    block.append(this.createStepTitle(text), colBlock);
    return block;
  };

  createGameStep = (text: string): HTMLElement => {
    const block = createElement('div', ['game-step', 'step', 'row']);
    const colBlock = createElement('div', ['col-md-8', 'col-12']);
    block.append(this.createStepTitle(text), colBlock);
    return block;
  };
}
