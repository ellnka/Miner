/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _menu = __webpack_require__(1);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	var _game = __webpack_require__(6);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var menu = new _menu2.default({
	  title: "Меню",
	  items: [{
	    title: "Конфеты",
	    href: "candy"
	  }, {
	    title: "Пирожки",
	    href: "pie"
	  }, {
	    title: "Пряники",
	    href: "cookies"
	  }]
	});
	
	document.body.appendChild(menu.getElem());
	
	menu.getElem().addEventListener('menu-select', function (event) {
	  alert(event.detail.value);
	});
	
	var game = new _game2.default({
	  title: "Сапер",
	  height: 15,
	  width: 15,
	  bombCount: 9
	});
	
	document.body.appendChild(game.getElem());
	game.getElem().addEventListener('miner-cell', function (event) {
	  console.log("module");
	  console.log(event.detail.value);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _menu = __webpack_require__(2);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	__webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Menu = function () {
	  function Menu(_ref) {
	    var _this = this;
	
	    var title = _ref.title,
	        items = _ref.items;
	
	    _classCallCheck(this, Menu);
	
	    this._title = title;
	    this._items = items;
	
	    this._render();
	
	    this._titleElem = this._elem.querySelector('.title');
	
	    this._titleElem.onclick = function () {
	      _this.toggle();
	    };
	
	    this._elem.onclick = function (event) {
	      var link = event.target.closest('a');
	      if (link && _this._elem.contains(link)) {
	        event.preventDefault();
	        _this._elem.dispatchEvent(new CustomEvent('menu-select', {
	          bubble: true,
	          detail: {
	            value: link.innerHTML
	          }
	        }));
	      }
	    };
	  }
	
	  _createClass(Menu, [{
	    key: '_render',
	    value: function _render() {
	      var tmp = document.createElement('div');
	      tmp.innerHTML = (0, _menu2.default)({
	        title: this._title,
	        items: this._items
	      });
	      this._elem = tmp.firstElementChild;
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      this._elem.classList.toggle('open');
	    }
	  }, {
	    key: 'getElem',
	    value: function getElem() {
	      return this._elem;
	    }
	  }]);
	
	  return Menu;
	}();
	
	exports.default = Menu;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(3);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (items, title, undefined) {
	buf.push("<div class=\"menu\"><span class=\"title\">" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</span><ul>");
	// iterate items
	;(function(){
	  var $$obj = items;
	  if ('number' == typeof $$obj.length) {
	
	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var item = $$obj[$index];
	
	buf.push("<li><a" + (jade.attr("href", item.href, true, true)) + ">" + (jade.escape(null == (jade_interp = item.title) ? "" : jade_interp)) + "</a></li>");
	    }
	
	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var item = $$obj[$index];
	
	buf.push("<li><a" + (jade.attr("href", item.href, true, true)) + ">" + (jade.escape(null == (jade_interp = item.title) ? "" : jade_interp)) + "</a></li>");
	    }
	
	  }
	}).call(this);
	
	buf.push("</ul></div>");}.call(this,"items" in locals_for_with?locals_for_with.items:typeof items!=="undefined"?items:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null && val !== '';
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}
	
	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};
	
	
	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];
	
	  var keys = Object.keys(obj);
	
	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];
	
	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join('');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;
	
	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}
	
	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(4).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};
	
	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _game = __webpack_require__(7);
	
	var _game2 = _interopRequireDefault(_game);
	
	__webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(_ref) {
	    var title = _ref.title,
	        height = _ref.height,
	        width = _ref.width,
	        bombCount = _ref.bombCount;
	
	    _classCallCheck(this, Game);
	
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
	
	  _createClass(Game, [{
	    key: '_render',
	    value: function _render() {
	      var tmp = document.createElement('div');
	      tmp.innerHTML = (0, _game2.default)({
	        title: this._title,
	        width: this._width,
	        height: this._height
	      });
	      this._elem = tmp.firstElementChild;
	    }
	  }, {
	    key: '_initSquare',
	    value: function _initSquare() {
	      //0 - empty cell; -1 - bomb; number - count of bombs around the cell
	      for (var i = 0; i < this._height; i++) {
	        this._square[i] = [];
	        for (var j = 0; j < this._width; j++) {
	          this._square[i][j] = 0;
	        }
	      }
	    }
	  }, {
	    key: '_initBombs',
	    value: function _initBombs() {
	      var mines = [];
	      var r = void 0,
	          c = void 0;
	      for (var i = 0; i < this._bombCount; i++) {
	        mines[i] = [];
	        do {
	          r = this._getRandomInt(0, this._bombCount - 1);
	          c = this._getRandomInt(0, this._bombCount - 1);
	        } while (this._square[r][c] < 0);
	        mines[i][0] = r;
	        mines[i][1] = c;
	        this._square[r][c] = -1;
	        this._updateCountersAroundBomb(r, c);
	      }
	      this._mines = mines;
	    }
	  }, {
	    key: '_isCellBomb',
	    value: function _isCellBomb(r, c) {
	      return this._square[r][c] < 0 ? true : false;
	    }
	  }, {
	    key: '_isCellNextToBomb',
	    value: function _isCellNextToBomb(r, c) {
	      return this._square[r][c] > 0 ? true : false;
	    }
	  }, {
	    key: '_isCellVisited',
	    value: function _isCellVisited(r, c) {
	      console.log("#id" + r + "-" + c + "");
	      var cell = this._elem.querySelector("#id" + r + "-" + c + "");
	      if (cell.classList.contains('visited') || cell.classList.contains('nearby') || cell.classList.contains('mined') || cell.classList.contains('opened') || cell.classList.contains('opened-bomb')) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: '_isCellInQueue',
	    value: function _isCellInQueue(queue, row, column) {
	      var result = false;
	      for (var i = 0; i < queue.length; i++) {
	        if (queue[i][0] == row && queue[i][1] == column) {
	          result = true;
	          break;
	        }
	      }
	      return result;
	    }
	  }, {
	    key: '_isGameCompleted',
	    value: function _isGameCompleted() {
	      return this._status == 0 ? false : true;
	    }
	  }, {
	    key: '_looseGame',
	    value: function _looseGame() {
	      this._status = -1;
	      var minerTitleElem = this._elem.querySelector(".miner-title");
	      minerTitleElem.innerHTML = "You Loose!";
	      minerTitleElem.classList.add("fail");
	    }
	  }, {
	    key: '_winGame',
	    value: function _winGame() {
	      this._status = 1;
	      var minerTitleElem = this._elem.querySelector(".miner-title");
	      minerTitleElem.innerHTML = "You Win!";
	      minerTitleElem.classList.add("success");
	    }
	  }, {
	    key: '_updateCountersAroundBomb',
	    value: function _updateCountersAroundBomb(r, c) {
	      for (var i = -1; i <= 1; i++) {
	        for (var j = -1; j <= 1; j++) {
	          var tr = r + i;
	          var tc = c + j;
	          if (tr >= 0 && tc >= 0 && tr < this._width && tc < this._height && !this._isCellBomb(tr, tc)) {
	            this._square[tr][tc]++;
	          }
	        }
	      }
	    }
	  }, {
	    key: '_getRandomInt_v1',
	    value: function _getRandomInt_v1(min, max) {
	      return Math.floor(Math.random() * (max - min)) + min;
	    }
	  }, {
	    key: '_getRandomInt',
	    value: function _getRandomInt(min, max) {
	      var rand = min + Math.random() * (max + 1 - min);
	      rand = Math.floor(rand);
	      return rand;
	    }
	  }, {
	    key: '_fillNumbers',
	    value: function _fillNumbers() {
	      for (var i = 0; i < this._square.length; i++) {
	        for (var j = 0; j < this._square[i].length; j++) {
	          var cell = this._elem.querySelector("#id" + i + "-" + j + "");
	          cell.innerHTML = this._square[i][j];
	        }
	      }
	    }
	  }, {
	    key: '_openAllCells',
	    value: function _openAllCells() {
	      for (var i = 0; i < this._width; i++) {
	        for (var j = 0; j < this._height; j++) {
	          var cell = this._elem.querySelector("#id" + i + "-" + j + "");
	          if (!this._isCellVisited(i, j)) {
	            if (this._square[i][j] < 0) cell.classList.toggle('mined');
	            if (this._square[i][j] == 0) cell.classList.toggle('opened');
	            if (this._square[i][j] > 0) {
	              this._openNextToBombCell(cell, this._square[i][j]);
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: 'refreshBombCounter',
	    value: function refreshBombCounter() {
	      var minerCounterElem = this._elem.querySelector(".miner-counter");
	      minerCounterElem.innerHTML = this.openedBombCount;
	    }
	  }, {
	    key: 'cellOnClick',
	    value: function cellOnClick(e) {
	
	      //   this._fillNumbers();
	      if (this._isGameCompleted()) return;
	
	      var cell = e.target.closest('div');
	      if (cell.id == undefined) return;
	      var id = cell.id.replace("id", "").split("-");
	      var row = id[0];
	      var column = id[1];
	      console.log(id);
	
	      var isBomb = this._isCellBomb(row, column);
	      if (this._isCellVisited(row, column)) return;
	
	      if (isBomb) {
	        this._openAllCells();
	        this._looseGame();
	      } else {
	        this._openFreeCells(row, column);
	      }
	    }
	  }, {
	    key: 'bombOnRightClick',
	    value: function bombOnRightClick(e) {
	      e.preventDefault();
	      if (this._isGameCompleted()) return;
	
	      var cell = e.target.closest('div');
	      if (cell.id == undefined) return;
	      var id = cell.id.replace("id", "").split("-");
	      var row = id[0];
	      var column = id[1];
	      console.log(id);
	
	      if (!this._isCellVisited(row, column)) {
	        cell.classList.toggle('opened-bomb');
	        this.openedBombCount += cell.classList.contains('opened-bomb') ? +1 : -1;
	        if (this.openedBombCount == this._bombCount) {
	          var fakeBombCount = 0;
	          for (var i = 0; i < this._mines.length; i++) {
	            var _cell = this._elem.querySelector("#id" + this._mines[i][0] + "-" + this._mines[i][1] + "");
	            if (!_cell.classList.contains('opened-bomb')) fakeBombCount++;
	          }
	          if (fakeBombCount == 0) this._winGame();
	        }
	      }
	
	      this.refreshBombCounter();
	    }
	  }, {
	    key: '_openNextToBombCell',
	    value: function _openNextToBombCell(cell, aroundBombCount) {
	      var spanTag = document.createElement('span');
	      spanTag.innerHTML = aroundBombCount;
	
	      cell.classList.add('nearby');
	      cell.innerHTML = "";
	      cell.appendChild(spanTag);
	    }
	  }, {
	    key: 'getElem',
	    value: function getElem() {
	      return this._elem;
	    }
	  }, {
	    key: '_openFreeCells',
	    value: function _openFreeCells(startRow, startColumn) {
	      //init
	      var cell = void 0;
	
	      var cellQueue = [];
	      var visitedQueue = [];
	
	      if (this._isCellVisited(startRow, startColumn)) return;
	
	      cellQueue[0] = [startRow, startColumn];
	
	      while (cellQueue.length > 0) {
	        var cellCoords = cellQueue.shift();
	        visitedQueue[visitedQueue.length] = cellCoords;
	
	        cell = this._elem.querySelector("#id" + cellCoords[0] + "-" + cellCoords[1] + "");
	
	        if (this._square[cellCoords[0]][cellCoords[1]] > 0) {
	          this._openNextToBombCell(cell, this._square[cellCoords[0]][cellCoords[1]]);
	        } else {
	          cell.classList.add('opened');
	        }
	        if (this._isCellNextToBomb(cellCoords[0], cellCoords[1])) continue;
	
	        for (var i = -1; i <= 1; i++) {
	          for (var j = -1; j <= 1; j++) {
	            var tr = +cellCoords[0] + i;
	            var tc = +cellCoords[1] + j;
	
	            if (tr >= 0 && tc >= 0 && tr < this._width && tc < this._height && !this._isCellBomb(tr, tc) && !this._isCellInQueue(cellQueue, tr, tc) && !this._isCellInQueue(visitedQueue, tr, tc)) {
	              if (this._isCellNextToBomb(tr, tc)) {
	                cell = this._elem.querySelector("#id" + tr + "-" + tc + "");
	                this._openNextToBombCell(cell, this._square[tr][tc]);
	              } else {
	                if (i != j) {
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
	
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(3);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (height, width) {
	buf.push("<div class=\"miner-container\"><div class=\"miner-title info\">= \"title\"<div class=\"miner-counter\"></div></div><div class=\"miner-field\"></div>");
	for (let i = 0; i < height; i++){
	{
	buf.push("<div class=\"miner-row\"></div>");
	for (let j = 0; j < width; j++) {
	{
	buf.push("<div" + (jade.attr("id", "id"+i+"-"+j, true, true)) + " class=\"miner-cell\"></div>");
	}
	}
	}
	}
	buf.push("</div>");}.call(this,"height" in locals_for_with?locals_for_with.height:typeof height!=="undefined"?height:undefined,"width" in locals_for_with?locals_for_with.width:typeof width!=="undefined"?width:undefined));;return buf.join("");
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map