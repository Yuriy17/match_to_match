import { PersonFields } from '../models/person-model';

export default class CurrentPerson {
  private _email: string;

  private _name: string;

  private _surname: string;

  private _photo: string;

  private _created: number;

  setCurrentPerson = (props: PersonFields): void => {
    this._email = props.email;
    this._name = props.name;
    this._surname = props.surname;
    this._photo = props.photo;
    this._created = props.created;
  };

  reset = ():void => {
    this._email = null;
    this._name = null;
    this._surname = null;
    this._photo = null;
    this._created = null;
    console.log(
      this._email,
      this._name,
      this._surname,
      this._photo,
      this._created,
    );
  };

  getPhoto = (): string => this._photo;

  setPhoto = (value: string): void => {
    this._photo = value;
  };

  getSurname = (): string => this._surname;

  setSurname = (value: string): void => {
    this._surname = value;
  };

  getName = (): string => this._name;

  setName = (value: string): void => {
    this._name = value;
  };

  getEmail = (): string => this._email;

  setEmail = (value: string): void => {
    this._email = value;
  };

  getCreated = (): number => this._created;

  setCreated = (value: number): void => {
    this._created = value;
  };
}
