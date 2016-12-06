
import template from './game.jade';

import './game.styl';

export default class Game {

  constructor({title, height, width, mineCount}) {
    this._title = title;
    this._height = height;
    this._width = width;
    this._mineCount = mineCount;
    this._cellQueue = [];

    this._render();
    this._initMines();

    this._elem.onclick = this.cellOnClick.bind(this);

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

  _initMines(){
    let mines = [];
    let r, c;
    for(let i = 0; i <  this._mineCount; i++) {
      mines[i] = [];
      do {
        r = this._getRandomInt(0, this._mineCount-1);
        c = this._getRandomInt(0, this._mineCount-1);
      } while (this._isCellBomb(mines, r, c) == true);
      mines[i][0] = r;
      mines[i][1] = c;
    }
    this._mines = mines;
  }

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
      this._freeCells(row, column);
    }



  }

  toggle() {
    this._elem.classList.toggle('open');
  }

  getElem() {
    return this._elem;
  }

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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
    
    let mineCounter = 0;


    for (let i = -1; i <= 1; i++){
      for (let j = -1; j<=1; j++) {
        let tr = r + i;
        let tc = c + j;
        console.log("tr " + tr);
        console.log("tc " + tc);
        if(tr >= 0 && tc >= 0 && tr <= this._width && tc <= this._height && this._isCellBomb(this._mines,tr,tc)) {
          mineCounter++;
          console.log("mine found ");
        }

      }
    }
    console.log('mineCounter '+mineCounter);

    if(mineCounter) {
      checkedCell.innerHTML = mineCounter;
      checkedCell.classList.add('nearby');
    } else {
      checkedCell.classList.add('opened');
    }
    return (mineCounter>0)? false : true ;
  }



  _freeCells(startRow, startColumn) {
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
      let mineCounter = 0;
      roundFreeCells = [];
      diagonalFreeCells = [];

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let tr = +cellCoords[0] + i;
          let tc = +cellCoords[1] + j;

          if (tr >= 0 && tc >= 0 && tr < this._width && tc < this._height ) {
            
            if (this._isCellBomb(this._mines, tr, tc)) {
              mineCounter++;
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
      if (mineCounter) {
        cell.classList.add('nearby');
        cell.innerHTML = mineCounter;

      } else {
        if(!isDiagonalCell)cell.classList.add('opened');
        this._cellQueue = this._cellQueue.concat(roundFreeCells);
        diagonalQueue = diagonalQueue.concat(diagonalFreeCells);

      }

     console.log(this._cellQueue.toString());
    }
  }



 _addVisistedClasses(cell, mineCounter) {

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


}