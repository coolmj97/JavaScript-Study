'use strict';

export default class PopUp {
  constructor() {
    //생성자 안에서 초기화 상태 정의
    this.popUp = document.querySelector('.pop-up');
    this.popUpMsg = document.querySelector('.pop-up-message');
    this.resetBtn = document.querySelector('.button-reset');
    this.resetBtn.addEventListener('click', () => {
      this.onClick && this.onClick(); //받아오는 콜백함수가 있으면 그 함수를 실행해라
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showMsg(text) {
    this.popUpMsg.innerText = text;
    this.popUp.classList.remove('pop-up-hide');
  }

  hide() {
    this.popUp.classList.add('pop-up-hide');
  }
}
