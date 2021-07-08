import { PersonFields } from '../models/person-model';

export default class CurrentPerson {
  private _email: string;

  private _name: string;

  private _surname: string;

  private _photo: string;

  private _created: number;

  setCurrentPerson(
    props: PersonFields,
  ): void {
    this._email = props.email;
    this._name = props.name;
    this._surname = props.surname;
    this._photo = props.photo;
    this._created = props.created;
  }

  public get photo(): string {
    return this._photo;
  }

  public set photo(value: string) {
    this._photo = value;
  }

  public get surname(): string {
    return this._surname;
  }

  public set surname(value: string) {
    this._surname = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get created(): number {
    return this._created;
  }

  public set created(value: number) {
    this._created = value;
  }
}
