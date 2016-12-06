'use strict';

import Menu from './menu';
import Game from './game';

let menu = new Menu({
  title: "Меню",
  items: [{
    title: "Конфеты",
    href:  "candy"
  }, {
    title: "Пирожки",
    href:  "pie"
  }, {
    title: "Пряники",
    href:  "cookies"
  }]
});

document.body.appendChild(menu.getElem());

menu.getElem().addEventListener('menu-select', function(event) {
  alert(event.detail.value);
});

let game = new Game({
  title: "Сапер",
  height: 15,
  width: 15,
  bombCount: 9
});

document.body.appendChild(game.getElem());
game.getElem().addEventListener('miner-cell', function(event) {
  console.log("module");
  console.log(event.detail.value);
});