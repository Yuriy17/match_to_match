import { ModalConfig } from '../../models/elements-model';
/* eslint-disable no-control-regex */
import { BootstrapType } from '../../utils/constant';
import { createElement, createImageElement } from '../../utils/utils';
import BootstrapComponent from '../bootstrap-component/bootstrap-component';
import Modal from '../modal/modal';
import './registration.scss';

/**
 * Resize a base 64 Image
 * @param {String} base64 - The base64 string (must include MIME type)
 * @param {Number} newWidth - The width of the image in pixels
 * @param {Number} newHeight - The height of the image in pixels
 */
const resizeBase64Img = (
  base64:string,
  newMinSize:number,
) => new Promise((resolve) => {
  const img = document.createElement('img');
  img.src = base64;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    let scale;
    if (img.width >= img.height) {
      scale = newMinSize / img.height;
    } else {
      scale = newMinSize / img.width;
    }
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    canvas.style.width = `${(img.width * scale).toString()}px`;
    canvas.style.height = `${(img.height * scale).toString()}px`;
    const context = canvas.getContext('2d');
    context.scale(scale, scale);

    context.drawImage(img, 0, 0);

    resolve(canvas.toDataURL());
  };
});
const patterns = {
  username: /^[a-zA-Z0-9][^0-9]([._-](?![._-])|[a-zA-Z0-9]){3,25}[a-zA-Z0-9][^~!@#$%*()_—+=|:;"'`<>,.?/^\0-\cZ]+$/,
  surname: /^[a-zA-Z0-9][^0-9]([._-](?![._-])|[a-zA-Z0-9]){3,25}[a-zA-Z0-9][^~!@#$%*()_—+=|:;"'`<>,.?/^\0-\cZ]+$/,
  // eslint-disable-next-line max-len
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
};
const clearInputFile = (f: any) => {
  if (f.value) {
    try {
      // eslint-disable-next-line no-param-reassign
      f.value = ''; // for IE11, latest Chrome/Firefox/Opera...
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    if (f.value) { // for IE5 ~ IE10
      const form = document.createElement('form');
      const { parentNode } = f; const
        ref = f.nextSibling;
      form.appendChild(f);
      form.reset();
      parentNode.insertBefore(f, ref);
    }
  }
};

export default class Registration {
  readonly modal: Modal;

  readonly modalForm: HTMLElement;

  private _email: HTMLInputElement;

  private _surname: HTMLInputElement;

  private _name: HTMLInputElement;

  private _photo: string;

  readonly button: HTMLElement;

  readonly element: HTMLElement;

  readonly id: string = 'registration';

  avatarImage: HTMLImageElement;

  avatarLabel:HTMLElement;

  oFReader: FileReader;

  constructor() {
    this.modal = new Modal(this.createModal());
    this.modalForm = this.modal.modalContent;
    // this.formValidation();
    this.element = this.modal.element;
    this.button = this.createLink(this.id);
  }

  validate = (input: HTMLElement, regex: RegExp, errorMessage: string):void => {

  };

  createModal = (): ModalConfig => {
    const col1 = createElement('div', ['col-12', 'col-md-6']);
    const col2 = createElement('div', ['col-12', 'col-md-6']);
    const buttonSubmit = createElement(
      'button',
      ['btn-primary', 'btn'],
      [['type', 'submit']],
    );
    const buttonCancel = createElement(
      'button',
      ['btn-secondary', 'btn'],
      [
        ['type', 'button'],
        ['data-bs-dismiss', 'modal'],
      ],
    );
    const inputName = new BootstrapComponent({
      type: BootstrapType.input,
      typeInput: 'text',
      classes: ['input-name', 'mb-2'],
      id: 'inputName',
      placeholder: 'First Name',
      floatLabel: 'First Name',
      isRequired: true,
      invalid: 'enter without: whitespaces, only numbers, ~ ! @ # $ % * () _ — + = | : ; " \' ` < > , . ? / ^',
      pattern: patterns.username.toString(),
    });
    const inputSurname = new BootstrapComponent({
      type: BootstrapType.input,
      typeInput: 'text',
      classes: ['input-surname', 'mb-2'],
      id: 'inputSurname',
      placeholder: 'Last Name',
      floatLabel: 'Last Name',
      isRequired: true,
      invalid: 'enter without: whitespaces, only numbers, ~ ! @ # $ % * () _ — + = | : ; " \' ` < > , . ? / ^',
      pattern: patterns.surname.toString(),
    });
    const inputEmail = new BootstrapComponent({
      type: BootstrapType.input,
      typeInput: 'email',
      classes: ['input-email'],
      id: 'inputEmail',
      placeholder: 'E-mail',
      floatLabel: 'E-mail',
      isRequired: true,
      invalid: 'enter email in format test@test.com',
      pattern: patterns.email.toString(),
    });
    this._email = <HTMLInputElement>inputEmail.targetElement;
    this._surname = <HTMLInputElement>inputSurname.targetElement;
    this._name = <HTMLInputElement>inputName.targetElement;
    const avatar = createElement('div', ['avatar']);
    this.avatarLabel = createElement('label',
      ['avatar__label'],
      [['for', 'avatar_file']]);
    this.avatarImage = createImageElement(
      'img',
      ['avatar__image'],
      [
        ['src', 'data:,'],
        ['alt', 'avatar placeholder'],
      ],
    );
    const avatarDefaultImage = createImageElement(
      'img',
      ['avatar__image_default'],
      [
        ['src', 'images/avatar.png'],
        ['alt', 'avatar placeholder default'],
      ],
    );
    const avatarImageHover = createElement(
      'img',
      ['avatar__hover'],
      [
        ['src', 'images/avatar-hover.png'],
        ['alt', 'avatar placeholder hover'],
      ],
    );
    const avatarTrashIcon = createElement(
      'img',
      ['avatar__preview-trash'],
      [
        ['src', 'images/ic_trash.svg'],
        ['alt', 'icon trash'],
      ],
    );
    const fileInput = createElement(
      'input',
      ['avatar__file'],
      [
        ['id', 'avatar_file'],
        ['name', 'avatar file'],
        ['type', 'file'],
        ['hidden', ''],
        ['accept', 'image/png, image/jpeg, image/jpg'],
      ],
    );
    if (fileInput) {
      fileInput.addEventListener('change', this.previewListener);
      if (avatarTrashIcon) {
        avatarTrashIcon.addEventListener('click', () => {
          clearInputFile(fileInput);
          this.avatarLabel.classList.remove('loaded');
        });
      }
    }
    const loadingIcon = createElement('i', ['fas', 'fa-spinner', 'fa-spin', 'fa-5x']);
    this.avatarLabel.append(this.avatarImage, avatarDefaultImage, avatarImageHover, loadingIcon);
    avatar.append(this.avatarLabel, avatarTrashIcon, fileInput);

    buttonCancel.innerText = 'cancel';
    buttonSubmit.innerText = 'submit';

    col1.append(inputName.element, inputSurname.element, inputEmail.element);
    col2.append(avatar);

    return {
      id: this.id,
      body: {
        elements: [col1, col2],
      },
      header: {
        title: 'Register new Player',
      },
      footer: {
        isSpaceBetween: false,
        elements: [buttonCancel, buttonSubmit],
      },
      isForm: true,
    };
  };

  createLink = (id: string): HTMLElement => {
    const link = createElement(
      'button',
      ['auth-button', 'btn'],
      [
        ['data-bs-toggle', 'modal'],
        ['data-bs-target', `#${id}`],
      ],
    );
    link.innerText = 'register new player';
    return link;
  };

  previewListener = (e: Event):void => {
    const uploadInput = <HTMLInputElement>e.currentTarget;

    if (this.avatarLabel && this.avatarImage && uploadInput.value !== '') {
      this.oFReader = new FileReader();
      this.oFReader.readAsDataURL(uploadInput.files[0]);

      this.oFReader.onload = (oFREvent) => {
        if (typeof oFREvent.target.result === 'string') {
          if (uploadInput.files[0].size > 307200) {
            this.avatarLabel.classList.add('loading');
            resizeBase64Img(oFREvent.target.result, 307).then((value: any): void | PromiseLike<void> => {
              this._photo = value.toString();
              this.avatarImage.src = this._photo;
              this.avatarLabel.classList.add('loaded');
              this.avatarLabel.classList.remove('loading');
            });
          } else {
            this._photo = oFREvent.target.result;
            this.avatarLabel.classList.add('loaded');
            this.avatarImage.src = this._photo;
          }
        }
      };
    }
  };

  public get email(): string {
    return this._email.value;
  }

  public set email(value: string) {
    this._email.value = value;
  }

  public get surname(): string {
    return this._surname.value;
  }

  public set surname(value: string) {
    this._surname.value = value;
  }

  public get name(): string {
    return this._name.value;
  }

  public set name(value: string) {
    this._name.value = value;
  }

  public get photo(): string {
    return this._photo;
  }

  public set photo(value: string) {
    this._photo = value;
  }
}
