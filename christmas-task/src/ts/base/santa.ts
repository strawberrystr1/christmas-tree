import { State } from '../../index';
import {HTMLBuilder} from '../components/html-builder';

export default class SantaGame extends HTMLBuilder{
  elemToDestroy: HTMLElement | null;
  timer: number;
  catchCounter: number;
  timeCounter: number;
  previousSide: string;
  showCounter: number;

  constructor() {
    super();
    this.elemToDestroy = null;
    this.timer = 0;
    this.catchCounter = 0;
    this.timeCounter = 0;
    this.showCounter = 0;
    this.previousSide = '';
  }

  createSanta() {
    let positionOfSanta = this.randomSide();

    while(this.previousSide === positionOfSanta) {
      positionOfSanta = this.randomSide();
    }

    const coordinates = this.randomPosition(positionOfSanta)
    const santa = this.createElem({tag: 'div', className: `santa ${positionOfSanta} hidden-${positionOfSanta}`});
    this.elemToDestroy = santa;
    const [width, height] = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    const gotcha = this.createElem({tag: 'div', className: 'gotcha', textContent: 'Поймал!'});
    
    if (positionOfSanta === 'top') {
      santa.style.top = `calc(${coordinates.top}% - 50px)`;
      if (coordinates.left < width / 2) {
        santa.style.left =  `calc(${coordinates.left}px + 150px)`;
      } else {
        santa.style.left =  `calc(${coordinates.left}px - 150px)`;
      }
      santa.classList.add('santaMovetop');
      
      gotcha.style.top = '50px';
      gotcha.style.left = coordinates.left + 50 + 'px';
    } else if (positionOfSanta === 'bottom') {
      santa.style.top = `calc(${coordinates.top}% - 100px)`;
      if (coordinates.left < width / 2) {
        santa.style.left =  `calc(${coordinates.left}px + 150px)`;
      } else {
        santa.style.left =  `calc(${coordinates.left}px - 150px)`;
      }

      gotcha.style.bottom = '50px';
      gotcha.style.left = coordinates.left + 50 + 'px';
      santa.classList.add('santaMovebottom');
    } else if (positionOfSanta === 'right') {
      santa.style.left = `calc(${coordinates.left}% - 62px)`;
      if (coordinates.top < height / 2) {
        santa.style.top =  `calc(${coordinates.top}px + 200px)`;
      } else {
        santa.style.top =  `calc(${coordinates.top}px - 200px)`;
      }

      gotcha.style.top = coordinates.top + 50 + 'px';
      gotcha.style.right = '70px';
      santa.classList.add('santaMoveright');
    } else {
      santa.style.left = `calc(${coordinates.left}% - 20px)`;
      if (coordinates.top < height / 2) {
        santa.style.top =  `calc(${coordinates.top}px + 200px)`;
      } else {
        santa.style.top =  `calc(${coordinates.top}px - 200px)`;
      }

      gotcha.style.top = coordinates.top + 50 + 'px';
      gotcha.style.left = '70px';
      santa.classList.add('santaMoveleft');
    }

    santa.addEventListener('click', ()=> {
      const currentTime = Date.now();
      santa.classList.remove(`santaMove${positionOfSanta}`);
      santa.classList.add(`hidden-${positionOfSanta}`);


      window.setTimeout(() => {
        clearTimeout(this.timer);
        this.destroy();
        this.startGame();
        gotcha.remove();
      }, 500);


      if (currentTime - this.timeCounter > 1500) {
        clearTimeout(this.timer);
        this.destroy();
        gotcha.remove();
        return;
      }

      document.body.append(gotcha);
      this.catchCounter++;
    })

    document.body.append(santa);
    setTimeout(() => {
      santa.classList.remove(`hidden-${positionOfSanta}`);
    }, 100)
    return positionOfSanta;
  }

  randomSide() {
    const positions = ['left', 'right', 'bottom', 'top'];
    const randomNumber = Math.floor(Math.random() * 4);
    return positions[randomNumber];
  }

  destroy() {
    (this.elemToDestroy as Element).remove();
  }

  randomPosition(pos: string): {left: number, right: number, top: number, bottom: number} {
    const coordinates = {
      left: 0,
      right: 0, 
      top: 0,
      bottom: 0
    }

    switch(pos) {
      case 'left': {
        coordinates.left = 0;
        const size = document.documentElement.clientHeight - 150;
        coordinates.top = Math.floor(Math.random() * size)
        break;
      }
      case 'right': {
        coordinates.left = 100;
        const size = document.documentElement.clientHeight - 150;
        coordinates.top = Math.floor(Math.random() * size)
        break;
      }
      case 'top': {
        const size = document.documentElement.clientWidth - 100;
        coordinates.left = Math.floor(Math.random() * size);
        coordinates.top = 0
        break;
      }
      case 'bottom': {
        const size = document.documentElement.clientWidth - 100;
        coordinates.left = Math.floor(Math.random() * size);
        coordinates.top = 100
        break;
      }
    }
    return coordinates;
  }

  createWinPopup() {
    const winPopup = this.createElem({tag: 'div', className: 'santa-popup win'});
    const santaPopupText = this.createElem({tag: 'p', className: 'santa-popup-text', textContent: 'Поздравляю, ты меня поймал!'});
    winPopup.append(santaPopupText);
    document.body.append(winPopup);
    setTimeout(() => {
      winPopup.remove();
    },3000);
  }

  createLosePopup() {
    const losePopup = this.createElem({tag: 'div', className: 'santa-popup lose'});
    const santaPopupText = this.createElem({tag: 'p', className: 'santa-popup-text', textContent: 'Ты слишком медленный'});
    losePopup.append(santaPopupText);
    document.body.append(losePopup);
    setTimeout(() => {
      losePopup.remove();
    },3000);
  }

  playGame() {
    this.showCounter = 0;
    this.catchCounter = 0;
    this.timeCounter = 0;
    this.showCounter = 0;
    this.startGame();
  }

  startGame() {
    this.timeCounter = Date.now();

    if (this.showCounter >= 15) {
      clearTimeout(this.timer);
      this.showCounter = 0;
      State.state.santaGame = false;
      State.utils.setLocalStorage();
      this.destroy();
      this.createLosePopup();
      (document.querySelector('.santa-button') as HTMLElement).classList.remove('active');
      (document.querySelector('.santa-button-popup-rules') as HTMLElement).remove();
      return;
    }

    this.showCounter++;

    if (this.catchCounter >= 5) {
      clearTimeout(this.timer);
      this.catchCounter = 0;
      State.state.santaGame = false;
      State.utils.setLocalStorage();
      this.destroy();
      this.createWinPopup();
      (document.querySelector('.santa-button') as HTMLElement).classList.remove('active');
      (document.querySelector('.santa-button-popup-rules') as HTMLElement).remove();
      return;
    }

    if (!State.state.santaGame) {
      clearTimeout(this.timer);
      this.destroy();
      return
    }
    
    if (this.elemToDestroy) this.destroy();
    
    const santaPosition = this.createSanta();
    this.previousSide = santaPosition;
    this.timer = window.setTimeout(() => {
      (this.elemToDestroy as Element).classList.add(`before-${santaPosition}`, 'before');
      window.setTimeout(() => {
        this.startGame();
      }, 500)
    }, 20000000)
  }
}