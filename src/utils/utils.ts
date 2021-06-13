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
export const createImageElement = (
  tag: keyof HTMLElementTagNameMap = 'img',
  styles: string[] = [],
  attributes: [string, string][] = [],
):HTMLImageElement => {
  const element = document.createElement(tag) as HTMLImageElement;
  element.classList.add(...styles);
  attributes?.forEach((attribute) => element.setAttribute(attribute[0], attribute[1]));
  return element;
};
export const addClass = (
  elements: Array<HTMLElement>, style: string,
):void => elements.forEach((element) => element.classList.add(style));

export const removeClass = (
  elements: Array<HTMLElement>, style: string,
):void => elements.forEach((element) => element.classList.remove(style));

export const toggleClass = (
  elements: Array<HTMLElement>, style: string,
):void => elements.forEach((element) => element.classList.toggle(style));
