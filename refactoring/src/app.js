'use strict';

import PopUp from './popup.js';
import * as sound from './sound.js';
import { GameBuilder, Reason } from './game.js';

const gameFinishBanner = new PopUp();

//정확하게 어떤 값을 설정했는지 한 눈에 알아보기 좋다
const game = new GameBuilder()
  .withGameDuration(15)
  .withCarrotCount(15)
  .withBugCount(15)
  .build();

//화살표 함수안 코드 전체가 전달됨
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'REPLAY?';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'YOU WON';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'YOU LOST';
      sound.playBug();
      break;
    default:
      throw new Error('not valid reason');
  }

  gameFinishBanner.showMsg(message);
});

//인자는 없고 game 클래스의 start 함수를 바로 실행
gameFinishBanner.setClickListener(() => {
  game.start();
});
