export const createElement = (
  tag: keyof HTMLElementTagNameMap = 'div',
  styles: string[] = [],
  attributes: [string, string][] = [],
):HTMLElement => {
  const element = document.createElement(tag);
  element.classList.add(...styles);
  attributes?.forEach((attribute) => element.setAttribute(attribute[0], attribute[1]));
  return element;
};
