import { Observer, Subject } from '../models/patterns-model';

/**
 * Издатель владеет некоторым важным состоянием и оповещает наблюдателей о его
 * изменениях.
 */
export default class ConcreteSubject implements Subject {
  /**
   * @type {number} Для удобства в этой переменной хранится состояние
   * Издателя, необходимое всем подписчикам.
   */
  public state: number;

  /**
   * @type {Observer[]} Список подписчиков. В реальной жизни список
   * подписчиков может храниться в более подробном виде (классифицируется по
   * типу события и т.д.)
   */
  private observers: Observer[] = [];

  /**
   * Методы управления подпиской.
   */
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }

    console.log('Subject: Attached an observer.');
    this.observers.push(observer);
    return null;
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }

    this.observers.splice(observerIndex, 1);
    console.log('Subject: Detached an observer.');
    return null;
  }

  /**
   * Запуск обновления в каждом подписчике.
   */
  public notify(): void {
    console.log('Subject: Notifying observers...');
    this.observers.forEach((observer) => observer.update(this));
    // for (const observer of this.observers) {
    //   observer.update(this);
    // }
  }

  /**
   * Обычно логика подписки – только часть того, что делает Издатель. Издатели
   * часто содержат некоторую важную бизнес-логику, которая запускает метод
   * уведомления всякий раз, когда должно произойти что-то важное (или после
   * этого).
   */
  public someBusinessLogic(): void {
    console.log("\nSubject: I'm doing something important.");
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: My state has just changed to: ${this.state}`);
    this.notify();
  }
}
