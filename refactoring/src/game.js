'use strict';

import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

//reason을 이 오브젝트에 지정된 멤버만 쓸 수 있도록
//문자열을 쓰지 못하도록 한다
export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

//빌더 패턴
//오브젝트를 만들 때 빌더패턴을 이용해서 간단명료하게 가독성 있게 만들 수 있다
export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this; //클래스 자체를 리턴
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  //무언가를 빌드
  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.toggleBtn = document.querySelector('.toggle-play');
    this.gameTimer = document.querySelector('.timer');
    this.gameScore = document.querySelector('.score');
    this.toggleBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick); //함수를 할당해주는 함수

    this.started = false;
    this.timer = undefined;
    this.count = 0;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.toggleBtn.innerHTML = `<i class="fas fa-stop button-stop"></i>`;
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
    this.init();
    this.startTimer();
    sound.playBackground();
  }

  stop(reason) {
    this.started = false;
    this.toggleBtn.style.visibility = 'hidden';
    this.stopTimer();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = (item) => {
    //게임이 start 되고 나면 started는 항상 true가 되므로 !this.started는 항상 false가 된다
    if (!this.started) {
      //false이면 실행안함
      return;
    }
    if (item === ItemType.carrot) {
      this.count++;
      this.gameScore.innerText = this.carrotCount - this.count;
      if (this.carrotCount === this.count) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  };

  stopTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60; //나머지: 5 % 60은 나머지가 5, 60은 0번 들어가므로
    this.gameTimer.innerText =
      seconds >= 10 ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`;
  }

  startTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.carrotCount === this.count ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  init() {
    this.toggleBtn.style.visibility = 'visible';
    this.gameScore.innerText = this.carrotCount;
    this.count = 0;
    this.gameField.init(); //필드 초기화
  }
}
