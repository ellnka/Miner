
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

    this._elem.onclick = this.cellOnClick.bind(this);
    this._elem.addEventListener('contextmenu', this.bombOnRightClick.bind(this), false);



  /* this._titleElem = this._elem.querySelector('.title');

    this._titleElem.onclick = () => {
      this.toggle();
    };
*/

   /* this._elem.onclick = event => {
    let cell = event.target.closest('div');
      if (cell ) { //&& this._elem.contains(div)
        event.preventDefault();
        console.log("module");
        this._elem.dispatchEvent(new CustomEvent('miner-cell', {
          bubble: true,
          detail: {
            value: cell.innerHTML
          }
        }));
      }
    };*/
  }

  _render() {
    let tmp = document.createElement('div');
    tmp.innerHTML = template({
      title: this._title,
      width: this._width,
      height: this._height
    });
    this._elem = tmp.firstElementChild;
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
        r = this._getRandomInt(0, this._bombCount-1);
        c = this._getRandomInt(0, this._bombCount-1);
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
    console.log("#id"+r+"-"+c+"");
    let cell = this._elem.querySelector("#id"+r+"-"+c+"");
    if(cell.classList.contains('visited') || cell.classList.contains('nearby') || cell.classList.contains('mined') || cell.classList.contains('opened')|| cell.classList.contains('opened-bomb')) {
      return true;
    } else {
      return false;
    }
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

  _getRandomInt_v1(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  _getRandomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  _fillNumbers() {
    for(let i = 0; i < this._square.length; i++) {
      for (let j = 0; j < this._square[i].length; j++){
        let cell = this._elem.querySelector("#id" + i +"-"+ j + "");
        cell.innerHTML = this._square[i][j];
      }
    }
  }

  _openAllCells () {
    for(let i = 0; i < this._width; i++) {
      for (let j = 0; j < this._height; j++) {
        let cell = this._elem.querySelector("#id"+i+"-"+j+"");
        if(!this._isCellVisited(i, j )) {
          if (this._square[i][j] < 0) cell.classList.toggle('mined');
          if (this._square[i][j] == 0)cell.classList.toggle('opened');
          if (this._square[i][j] > 0) {
            this._openNextToBombCell(cell);
          }
        }
      }
    }
  }

  refreshBombCounter() {
    let minerCounterElem = this._elem.querySelector(".miner-counter");
    minerCounterElem.innerHTML = this.openedBombCount;
  }

  cellOnClick(e) {

 //   this._fillNumbers();
    if(this._isGameCompleted()) return;

    let cell = e.target.closest('div');
    if (cell.id == undefined) return; 
    let id = (cell.id.replace("id","")).split("-");
    let row = id[0];
    let column = id[1];
    console.log(id);

    let isBomb = this._isCellBomb(row, column);
    if (this._isCellVisited(row, column)) return;

    if(isBomb) {
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

    if(!this._isCellVisited(row, column )) {
      cell.classList.toggle('opened-bomb');
      this.openedBombCount += (cell.classList.contains('opened-bomb'))?+1:-1;
      if(this.openedBombCount == this._bombCount) {
        let fakeBombCount = 0;
        for (let i = 0; i < this._mines.length; i++) {
          let cell = this._elem.querySelector("#id"+this._mines[i][0]+"-"+this._mines[i][1]+"");
          if(!cell.classList.contains('opened-bomb'))fakeBombCount++;
        }
        if(fakeBombCount == 0) this._winGame();
      }
    }

    this.refreshBombCounter();
  }


  _openNextToBombCell(cell, aroundBombCount) {
    let spanTag = document.createElement('span');
    spanTag.innerHTML = aroundBombCount;


    cell = this._elem.querySelector("#id" +tr +"-"+ tc + "");
    cell.classList.add('nearby');
    cell.appendChild(spanTag);
  }



  getElem() {
    return this._elem;
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

      cell = this._elem.querySelector("#id" + cellCoords[0] + "-" + cellCoords[1] + "");

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
                cell = this._elem.querySelector("#id" +tr +"-"+ tc + "");
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



  /*
    _isCellBomb(mines, r, c ) {
      let result = false;
      for (let j = 0; j < mines.length; j++) {
        if(mines[j][0] == r && mines[j][1] == c) {
          result = true;
          break;
        }
      }
      return result;
    }

    cellOnClick(e) {

      let cell = e.target.closest('div');
      let row = cell.id.substring(2,3);
      let column = cell.id.substring(3,4);

      let isMine = this._isCellBomb(this._mines, row, column);
      if (cell.classList.contains('opened') || cell.classList.contains('mined')) return;

      if(isMine) {
     //   cell.classList.add("mined");
        this._openAll();
      } else {
        this._openFreeCells(row, column);
      }



    }

    toggle() {
      this._elem.classList.toggle('open');
    }

    getElem() {
      return this._elem;
    }



    _openAll () {

      for(let i = 0; i < this._width; i++) {
        for (let j = 0; j < this._height; j++) {
          if (this._isCellBomb(this._mines, i, j) == true) {
            console.log("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
            let cell = document.querySelector("#id"+i+j+"");
            console.log("#id"+i+j+"");
            if (cell) {
              console.log(cell);
              cell.classList.toggle('mined');
            }
          } else {
            this._roundCell(i ,j);
          }
        }
      }

    }



    _openFreeCells(row, column) {

      console.log("row " + row);
      console.log("column " + column);
      // open right - top
      let break_line;
      for (let i = +row - 1; i >= 0; i-- ) {

        for (let j = column; j < this._width; j++) {
          if(!this._roundCell(i,j)) {
            break_line = j;
            break;
          }
        }

      }

      // open right - bottom
      for (let i = +row ; i < this._height; i++ ) {
        for (let j = column; j < this._width; j++) {
          if(!this._roundCell(i,j)) break;
        }
      }

      // open left - bottom
      for (let i = +row ; i < this._height; i++ ) {
        for (let j = column - 1; j >= 0; j--){
          if(!this._roundCell(i,j)) break;
        }
      }

      // open left - top
      for (let i = +row - 1; i >= 0; i-- ) {
        for (let j = column - 1; j >= 0; j--) {
          if(!this._roundCell(i,j)) break;
        }
      }
    }

    _roundCell(r ,c) {
      let checkedCell = document.querySelector("#id"+r+c+"");
      console.log("check cell");
      console.log(checkedCell);
      console.log("#id"+r+c+"");
      if(checkedCell.classList.contains('opened') || checkedCell.classList.contains('nearby') || checkedCell.classList.contains('mined')) return false;

      let bombCounter = 0;


      for (let i = -1; i <= 1; i++){
        for (let j = -1; j<=1; j++) {
          let tr = r + i;
          let tc = c + j;
          console.log("tr " + tr);
          console.log("tc " + tc);
          if(tr >= 0 && tc >= 0 && tr <= this._width && tc <= this._height && this._isCellBomb(this._mines,tr,tc)) {
            bombCounter++;
            console.log("mine found ");
          }

        }
      }
      console.log('bombCounter '+bombCounter);

      if(bombCounter) {
        checkedCell.innerHTML = bombCounter;
        checkedCell.classList.add('nearby');
      } else {
        checkedCell.classList.add('opened');
      }
      return (bombCounter>0)? false : true ;
    }



    _openFreeCells(startRow, startColumn) {
      //init
      let elem = document.querySelector("#id"+startRow+startColumn+"");
      let roundFreeCells = [];
      let diagonalFreeCells = [];
      let diagonalQueue = [];

      if(!elem.classList.contains('visited')) {
        this._cellQueue[0] = [startRow, startColumn];
      }

      while (this._cellQueue.length > 0 || diagonalQueue.length > 0  ) {
        let isDiagonalCell = this._cellQueue.length > 0 ? false : true;
        let cellCoords = this._cellQueue.length > 0 ? this._cellQueue.shift() : diagonalQueue.shift();

        let cell = document.querySelector("#id" + cellCoords[0] + cellCoords[1] + "");
        let bombCounter = 0;
        roundFreeCells = [];
        diagonalFreeCells = [];

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            let tr = +cellCoords[0] + i;
            let tc = +cellCoords[1] + j;

            if (tr >= 0 && tc >= 0 && tr < this._width && tc < this._height ) {

              if (this._isCellBomb(this._mines, tr, tc)) {
                bombCounter++;
              } else {
                if(!isDiagonalCell){
                elem = document.querySelector("#id" + tr + tc + "");
                if (!elem.classList.contains('visited') && !this._isCellInQueue(this._cellQueue, tr, tc) && !this._isCellInQueue(diagonalQueue, tr, tc) ) {
                  if(i != j){
                    roundFreeCells[roundFreeCells.length] = [tr, tc];
                  } else {
                    diagonalFreeCells[diagonalFreeCells.length] = [tr, tc];
                  }
                }
              }
            }
            }
          }
        }

        cell.classList.add('visited');
        if (bombCounter) {
          cell.classList.add('nearby');
          cell.innerHTML = bombCounter;

        } else {
          if(!isDiagonalCell)cell.classList.add('opened');
          this._cellQueue = this._cellQueue.concat(roundFreeCells);
          diagonalQueue = diagonalQueue.concat(diagonalFreeCells);

        }

       console.log(this._cellQueue.toString());
      }
    }



   _addVisistedClasses(cell, bombCounter) {

   }

    _isCellInQueue(queue, row, column) {
      let result = false;
      for(let i = 0; i < queue.length; i++) {
        if (queue[i][0] == row && queue[i][1] == column) {
          result = false;
          break;
        }
      }
      return result;
    }

  */
}