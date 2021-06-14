import { BootstrapType } from '../../utils/constant';
import { createElement } from '../../utils/utils';
import './bootstrap-component.scss';

export default class BootstrapComponent {
  readonly element: HTMLElement;

  constructor(properties: {
    type: string,
    classes: Array<string>,
    floatLabel?: string,
    id?:string,
    typeInput?:string,
    placeholder?: string,
    selectAriaLabel?: string,
    selectOptions?: Array<string>,
    selectDefaultOption?: string,
    listItems?: Array<string>,
    invalid?: string,
    isRequired?: boolean
  }) {
    const {
      type,
      typeInput,
      classes,
      id,
      placeholder,
      selectAriaLabel,
      selectOptions,
      selectDefaultOption,
      floatLabel,
      listItems,
      invalid,
      isRequired,
    } = properties;
    const { input, select, list } = BootstrapType;

    if (type === input) {
      const inputElement = isRequired ? createElement('input', ['form-control', ...classes],
        [['id', id], ['placeholder', placeholder], ['type', typeInput], ['required', '']])
        : createElement('input', ['form-control', ...classes],
          [['id', id], ['placeholder', placeholder], ['type', typeInput]]);
      const label = createElement('label', [], [['for', id]]);
      let errorText:HTMLElement;

      label.innerText = floatLabel;
      this.element = createElement('div', ['form-floating']);
      this.element.append(inputElement, label);
      if (invalid) {
        errorText = createElement('div', ['invalid-feedback']);
        errorText.innerText = invalid;
        this.element.append(errorText);
      }
    } else if (type === select) {
      const selectElement = createElement('select', ['form-select'], [['id', id], ['aria-label', selectAriaLabel]]);
      const label = createElement('label', [], [['for', id]]);
      const optionSelectedElement = createElement('option', [], [['selected', '']]);

      label.innerText = floatLabel;
      optionSelectedElement.innerText = selectDefaultOption;
      selectOptions.forEach((option, i) => {
        const optionElement = createElement('option', [], [['value', i.toString()]]);

        optionElement.innerText = option.toString();
        selectElement.append(optionElement);
      });
      this.element = createElement('div', ['form-floating']);
      this.element.append(selectElement, label);
    } else if (type === list) {
      this.element = createElement('div', ['list-group', 'list-group-flush']);
      listItems.forEach((item) => {
        const listItem = createElement('li', ['list-group-item']);
        listItem.innerText = item;
        this.element.append(listItem);
      });
    }
  }
}
