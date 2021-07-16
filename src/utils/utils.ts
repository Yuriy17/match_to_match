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

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export const clearInputFile = (f: any) => {
  if (f.value) {
    try {
      // eslint-disable-next-line no-param-reassign
      f.value = ''; // for IE11, latest Chrome/Firefox/Opera...
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    if (f.value) {
      // for IE5 ~ IE10
      const form = document.createElement('form');
      const { parentNode } = f;
      const ref = f.nextSibling;
      form.appendChild(f);
      form.reset();
      parentNode.insertBefore(f, ref);
    }
  }
};
// export const errorPopup = ():void => {
//   const modal = new Modal({
//       id: this.id,
//       body: {
//         elements: [col1, col2],
//       },
//       header: {
//         title: 'Error',
//       },
//       footer: {
//         isSpaceBetween: false,
//         elements: [buttonCancel, buttonSubmit],
//       },
//       isForm: false,
//     }
// });
// export const preventForm = (form: HTMLFormElement):void => {
//   form.addEventListener('submit', (event) => {
//     if (!form.checkValidity()) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     form.classList.add('was-validated');
//   }, false);
// };
