import BaseComponent from '../base-component';
import './timer.scss';

export default class Timer extends BaseComponent {
  private timerInterval: number;

  private elapsedTime: number;

  private spliter: HTMLSpanElement = document.createElement('span');

  private minites: HTMLSpanElement = document.createElement('span');

  private seconds: HTMLSpanElement = document.createElement('span');

  constructor(
    private pauseHandler: () => void,
  ) {
    super('button', ['timer'],
      [['title', 'click to start / stop game']]);
    this.initTimer();
    this.elapsedTime = 0;
  }

  initTimer = ():void => {
    const {
      spliter, minites, seconds, element,
    } = this;

    spliter.classList.add('timer__spliter');
    minites.classList.add('timer__minites');
    seconds.classList.add('timer__seconds');
    spliter.innerText = ':';
    minites.innerText = '00';
    seconds.innerText = '00';

    element.append(minites, spliter, seconds);
    element.addEventListener('click', this.pauseHandler);
  };

  startTimer = ():void => {
    const startTime = Date.now() - this.elapsedTime;
    this.timerInterval = window.setInterval(():void => {
      this.elapsedTime = Date.now() - startTime;
      this.timeToString();
    }, 10);
    this.element.classList.add('timer_active');
  };

  stopTimer = ():void => {
    window.clearInterval(this.timerInterval);
    this.element.classList.remove('timer_active');
  };

  timeToString(): void {
    const diffInHrs = this.elapsedTime / 3600000;
    const hh = Math.floor(diffInHrs);

    const diffInMin = (diffInHrs - hh) * 60;
    const mm = Math.floor(diffInMin);

    const diffInSec = (diffInMin - mm) * 60;
    const ss = Math.floor(diffInSec);

    this.minites.innerText = mm.toString().padStart(2, '0');
    this.seconds.innerText = ss.toString().padStart(2, '0');
  }

  clear = ():void => {
    this.minites.innerText = '00';
    this.seconds.innerText = '00';
  };
}
