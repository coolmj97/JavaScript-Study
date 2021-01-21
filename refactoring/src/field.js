'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this._createItem('carrot', this.carrotCount, 'img/carrot.png');
    this._createItem('bug', this.bugCount, 'img/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick; //함수안에서 선언됨
  }

  _createItem(className, count, imgPath) {
    const x1 = 0; //min
    const y1 = 0; //min
    const x2 = this.fieldRect.width - CARROT_SIZE; //max
    const y2 = this.fieldRect.height - CARROT_SIZE; //max

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.src = imgPath;
      item.classList.add(className);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    if (event.target.className === 'carrot') {
      event.target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (event.target.className === 'bug') {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

//클래스와 상관없는 함수들은 밖으로 뺀다
//이렇게 하면 반복해서 오브젝트에 만들어지지 않아 효율적
//static function
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
