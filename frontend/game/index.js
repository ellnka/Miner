
import template from './game.jade';

import './game.styl';

export default class Game {

  constructor({title, height, width, bombCount}) {
    this._title = title;
    this._status = "0"; // 0 = game in progress, 1 = win, -1 = loose
    this._height = height;
    this._width = width;

    this._square = [];

    this._bombCount = bombCount;
    this._cellQueue = [];
    
    this.openedBombCount = 0;

    this._render();
    this._initSquare();
    this._initBombs();

    this._gameFieldElem.onclick = this.cellOnClick.bind(this);
    this._gameFieldElem.addEventListener('contextmenu', this.bombOnRightClick.bind(this), false);
    this._settingsDialog.onclick = this.settingsOnClick.bind(this);
    this._menuElem.onclick = this.menuOnClick.bind(this);

  }

  _render() {
    let tmp = document.createElement('div');
    tmp.innerHTML = template({
      title: this._title,
      width: this._width,
      height: this._height,
      bombCount: this._bombCount
    });
    this._elem = tmp.firstElementChild;
    this._gameFieldElem = this._elem.querySelector(".miner-field");
    this._settingsDialog = this._elem.querySelector(".miner-settings");
    this._menuElem = this._elem.querySelector(".miner-menu");
  }


  getElem() {
    return this._elem;
  }

  /*******
   * 
   *
   */
  static _getRandomInt_v1(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  _getRandomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  _isCellInQueue(queue, row, column) {
    let result = false;
    for(let i = 0; i < queue.length; i++) {
      if (queue[i][0] == row && queue[i][1] == column) {
        result = true;
        break;
      }
    }
    return result;
  }
  
  _initSquare() {
    //0 - empty cell; -1 - bomb; number - count of bombs around the cell
    for(let i =0; i < this._height; i++) {
      this._square[i] = [];
      for(let j = 0; j < this._width; j++) {
        this._square[i][j] = 0;
      }
    }
  }

  _initBombs(){
    let mines = [];
    let r, c;
    for(let i = 0; i <  this._bombCount; i++) {
      mines[i] = [];
      do {
        r = this._getRandomInt(0, this._height-1);
        c = this._getRandomInt(0, this._width-1);
      } while (this._square[r][c] < 0 );
      mines[i][0] = r;
      mines[i][1] = c;
      this._square[r][c] = -1;
      this._updateCountersAroundBomb(r,c);
    }
    this._mines = mines;
  }

  _isCellBomb( r, c ) {
    return (this._square[r][c] < 0)?true : false;
  }

  _isCellNextToBomb( r, c ) {
    return (this._square[r][c] > 0)?true : false;
  }

  _isCellVisited( r, c ) {
    let cell = this._gameFieldElem.querySelector("#id"+r+"-"+c+"");
    if(cell.classList.contains('visited') || cell.classList.contains('nearby') || cell.classList.contains('mined') || cell.classList.contains('opened')|| cell.classList.contains('opened-bomb')) {
      return true;
    } else {
      return false;
    }
  }

  _isCellMarkedAsBomb( r, c ) {
      let cell = this._gameFieldElem.querySelector("#id"+r+"-"+c+"");
      return (cell.classList.contains('opened-bomb'))? true : false;
  }

  _isGameCompleted() {
    return (this._status == 0)?false:true;
  }

  _looseGame() {
    this._status = -1;
    let minerTitleElem = this._elem.querySelector(".miner-title");
    minerTitleElem.innerHTML = "You Loose!";
    minerTitleElem.classList.remove("alert-info");
    minerTitleElem.classList.add("alert-danger");
  }

  _winGame() {
    this._status = 1;
    let minerTitleElem = this._elem.querySelector(".miner-title");
    minerTitleElem.innerHTML = "You Win!";
    minerTitleElem.classList.remove("alert-info");
    minerTitleElem.classList.add("alert-success");
  }

  _updateCountersAroundBomb(r, c) {
    for (let i = -1; i <= 1; i++){
      for (let j = -1; j<=1; j++) {
        let tr = r + i;
        let tc = c + j;
        if(tr >= 0 && tc >= 0 && tr < this._width && tc < this._height && !this._isCellBomb(tr,tc) ) {
          this._square[tr][tc]++;
        }

      }
    }
  }

  _openFreeCells(startRow, startColumn) {
    //init
    let cell;

    let cellQueue = [];
    let visitedQueue = [];

    if(this._isCellVisited(startRow, startColumn) ) return ;

    cellQueue[0] = [startRow, startColumn];

    while ( cellQueue.length > 0 ) {
      let cellCoords = cellQueue.shift();
      visitedQueue[visitedQueue.length] = cellCoords;

      cell = this._gameFieldElem.querySelector("#id" + cellCoords[0] + "-" + cellCoords[1] + "");

      if (this._square[cellCoords[0]][cellCoords[1]] > 0 ) {
        this._openNextToBombCell(cell,this._square[cellCoords[0]][cellCoords[1]]);
      } else {
        cell.classList.add('opened');
      }
      if (this._isCellNextToBomb(cellCoords[0], cellCoords[1])) continue;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let tr = +cellCoords[0] + i;
          let tc = +cellCoords[1] + j;

          if (  tr >= 0 && tc >= 0 && tr < this._width && tc < this._height && !this._isCellBomb( tr, tc) && !this._isCellInQueue(cellQueue, tr, tc) && !this._isCellInQueue(visitedQueue, tr, tc)) {
            if(this._isCellNextToBomb(tr, tc) ){
              cell = this._gameFieldElem.querySelector("#id" +tr +"-"+ tc + "");
              this._openNextToBombCell(cell, this._square[tr][tc]);

            } else {
              if(i != j) {
                cellQueue[cellQueue.length] = [tr, tc];
              }
              //cellQueue[cellQueue.length][0] = tr;
              //cellQueue[cellQueue.length][1] = tc;
            }
          }
        }
      }



      console.log(cellQueue.toString());
    }
  }
  
  _openAllCells () {
    for(let i = 0; i < this._width; i++) {
      for (let j = 0; j < this._height; j++) {
        let cell = this._gameFieldElem.querySelector("#id"+i+"-"+j+"");
        if(!this._isCellVisited(i, j )) {
          if (this._square[i][j] < 0) cell.classList.toggle('mined');
          if (this._square[i][j] == 0)cell.classList.toggle('opened');
          if (this._square[i][j] > 0) {
            this._openNextToBombCell(cell, this._square[i][j]);
          }
        }
      }
    }
  }

  _openNextToBombCell(cell, aroundBombCount) {
    let spanTag = document.createElement('span');
    spanTag.innerHTML = aroundBombCount;

    cell.classList.add('nearby');
    cell.innerHTML = "";
    cell.appendChild(spanTag);
  }

  _updateScoreElem() {
    let minerCounterElem = this._elem.querySelector(".miner-counter");
    minerCounterElem.innerHTML = this.openedBombCount+"/"+this._bombCount;
  }

  /****
   *
   *
   */
  _openSettingsDialog() {
    this._settingsDialog.style.display = "block";
  }

  _closeSettingsDialog(){
    this._settingsDialog.style.display = "none";
  }


  /****
   *
   *
   */
  _startNewGame() {
    let height = this._settingsDialog.querySelector(".miner-row-count").lastChild.value;
    let width = this._settingsDialog.querySelector(".miner-column-count").lastChild.value;
    let bombCounter = this._settingsDialog.querySelector(".miner-bomb-count").lastChild.value;
    if(width*height < bombCounter) {
      this._showError("Error! Incorrect Settings!");
    } else {
      if (this._elem)this._elem.innerHTML = "";
      this.constructor({"title": "", "height": height, "width": width, "bombCount": bombCounter})
      document.body.appendChild(this._elem);
    }
  }

  _showError(message) {
    let minerTitleElem = this._elem.querySelector(".miner-title");
    minerTitleElem.innerHTML = message;
    minerTitleElem.classList.remove("alert-info");
    minerTitleElem.classList.add("alert-danger");
  }

  /****
   *
   *
   */

  cellOnClick(e) {

    if(this._isGameCompleted()) return;

    let cell = e.target.closest('div');
    if (cell.id == undefined) return; 
    let id = (cell.id.replace("id","")).split("-");
    let row = id[0];
    let column = id[1];
    console.log(id);

    if (this._isCellVisited(row, column)) return;

    if(this._isCellBomb(row, column)) {
      this._openAllCells();
      this._looseGame();
    } else {
      this._openFreeCells(row, column);
    }


  }
  
  bombOnRightClick (e) {
    e.preventDefault();
    if(this._isGameCompleted()) return;

    let cell = e.target.closest('div');
    if (cell.id == undefined) return;
    let id = (cell.id.replace("id","")).split("-");
    let row = id[0];
    let column = id[1];
    console.log(id);

    if(!this._isCellVisited(row, column ) || this._isCellMarkedAsBomb(row, column) ) {
      cell.classList.toggle('opened-bomb');
      this.openedBombCount += (cell.classList.contains('opened-bomb'))?+1:-1;
      if(this.openedBombCount == this._bombCount) {
        let fakeBombCount = 0;
        for (let i = 0; i < this._mines.length; i++) {
          let cell = this._gameFieldElem.querySelector("#id"+this._mines[i][0]+"-"+this._mines[i][1]+"");
          if(!cell.classList.contains('opened-bomb'))fakeBombCount++;
        }
        if(fakeBombCount == 0) this._winGame();
      }
    }

    this._updateScoreElem();
  }

  settingsOnClick(e) {
    let elem = e.target;
    if(elem.tagName != 'BUTTON') return;
    this._closeSettingsDialog();
  }

  menuOnClick(e) {
    let elem = e.target;
    if(elem.tagName != 'BUTTON') return;
    if(elem.classList.contains("miner-menu-settings")){
      this._openSettingsDialog();
    }
    if(elem.classList.contains("miner-menu-new-game")){
      this._startNewGame();
    }
  }


}