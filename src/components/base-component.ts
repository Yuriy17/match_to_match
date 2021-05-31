export default class BaseComponent {
  readonly element: HTMLElement;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    attributes: [string, string][] = [],
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    attributes?.forEach((attribute) => this.element.setAttribute(attribute[0], attribute[1]));
  }
}
