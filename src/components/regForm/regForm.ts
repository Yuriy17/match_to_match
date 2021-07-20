import { ModalConfig } from '../../models/elements-model';
import { PersonFields } from '../../models/person-model';
import {
  BootstrapType, Icons, patterns, Popups, State
} from '../../utils/constant';
import { clearInputFile, createElement, createImageElement } from '../../utils/utils';
import BootstrapComponent from '../bootstrap-component/bootstrap-component';
import InfoPopup from '../info-popup/infoPopup';
import Modal from '../modal/modal';

/**
 * Resize a base 64 Image
 * @param {String} base64 - The base64 string (must include MIME type)
 * @param {Number} newWidth - The width of the image in pixels
 * @param {Number} newHeight - The height of the image in pixels
 */
const resizeBase64Img = (base64: string, newMinSize: number) => new Promise((resolve) => {
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

export default class RegForm {
  readonly element: HTMLElement;

  readonly regId: string = 'registration';

  readonly modalForm: HTMLElement;

  readonly modal: Modal;

  private regEmailElement: HTMLInputElement;

  private regSurnameElement: HTMLInputElement;

  private regNameElement: HTMLInputElement;

  avatarImage: HTMLImageElement;

  avatarLabel: HTMLElement;

  oFReader: FileReader;

  successPopup: InfoPopup;

  constructor(
    private addPerson: (
      personFields: PersonFields,
      successCallback: (personFields: PersonFields) => void,
      errorCallback: () => void
    ) => void,
    private changeEntryState: (state: string) => void,
    public setCurrentPerson: (props: PersonFields) => void,
  ) {
    this.modal = new Modal(this.createRegModal());
    this.modalForm = this.modal?.modalContent;

    this.addRegFormValidation();

    this.successPopup = new InfoPopup(
      Popups.success,
      'Success! You are registered!',
    );
    this.addRegFormValidation();
  }

  getExample = (): Node => this.modalForm.cloneNode(true);

  addRegFormValidation = (): void => {
    const { modalForm: regModalForm, modal: regModal, successPopup } = this;
    regModalForm.onsubmit = (event: Event): boolean => {
      const email = this.regEmailElement.value;
      const surname = this.regSurnameElement.value;
      const name = this.regNameElement.value;

      if (!(<HTMLFormElement>regModalForm).checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else if (email.length && surname.length && name.length) {
        this.addPerson(
          {
            email,
            surname,
            name,
            photo: this.avatarLabel.classList.contains('loaded')
              ? this.avatarImage.src
              : null,
            created: new Date().getTime(),
          },
          (personFields: PersonFields) => {
            this.setCurrentPerson(personFields);
            this.changeEntryState(State.registered);
            regModal.jsModal.hide();
            successPopup.modal.jsModal.show();
            console.log('Woot! Did it We are registered ( ͡° ͜ʖ ͡°)');
          },
          () => {
            console.log("'Error' ಠ~ಠ");
          },
        );
      }

      regModalForm.classList.add('was-validated');
      return false;
    };
  };

  createRegModal = (): ModalConfig => {
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
      invalid:
        'enter without: whitespaces, only numbers, ~ ! @ # $ % * () _ — + = | : ; " \' ` < > , . ? / ^',
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
      invalid:
        'enter without: whitespaces, only numbers, ~ ! @ # $ % * () _ — + = | : ; " \' ` < > , . ? / ^',
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
    this.regEmailElement = <HTMLInputElement>inputEmail.targetElement;
    this.regSurnameElement = <HTMLInputElement>inputSurname.targetElement;
    this.regNameElement = <HTMLInputElement>inputName.targetElement;
    const avatar = createElement('div', ['avatar']);
    this.avatarLabel = createElement(
      'label',
      ['avatar__label'],
      [['for', 'avatar_file']],
    );
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
    const loadingIcon = createElement('i', [
      'fas',
      Icons.faSpinner,
      'fa-spin',
      'fa-5x',
    ]);
    this.avatarLabel.append(
      this.avatarImage,
      avatarDefaultImage,
      avatarImageHover,
      loadingIcon,
    );
    avatar.append(this.avatarLabel, avatarTrashIcon, fileInput);

    buttonCancel.innerText = 'cancel';
    buttonSubmit.innerText = 'register';

    col1.append(inputName.element, inputSurname.element, inputEmail.element);
    col2.append(avatar);

    return {
      id: this.regId,
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

  previewListener = (e: Event): void => {
    const uploadInput = <HTMLInputElement>e.currentTarget;

    if (this.avatarLabel && this.avatarImage && uploadInput.value !== '') {
      this.oFReader = new FileReader();
      this.oFReader.readAsDataURL(uploadInput.files[0]);

      this.oFReader.onload = (oFREvent) => {
        if (typeof oFREvent.target.result === 'string') {
          if (uploadInput.files[0].size > 307200) {
            this.avatarLabel.classList.add('loading');
            resizeBase64Img(oFREvent.target.result, 307).then(
              (value: any): void | PromiseLike<void> => {
                this.avatarImage.src = value.toString();
                this.avatarLabel.classList.add('loaded');
                this.avatarLabel.classList.remove('loading');
              },
            );
          } else {
            this.avatarLabel.classList.add('loaded');
            this.avatarImage.src = oFREvent.target.result;
          }
        }
      };
    }
  };
}
