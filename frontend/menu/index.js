
import template from './menu.jade';

import './menu.styl';

export default class Menu {

  constructor({title, items}) {
    this._title = title;
    this._items = items;

    this._render();

    this._titleElem = this._elem.querySelector('.title');

    this._titleElem.onclick = () => {
      this.toggle();
    };

    this._elem.onclick = event => {
      let link = event.target.closest('a');
      if (link && this._elem.contains(link)) {
        event.preventDefault();
        this._elem.dispatchEvent(new CustomEvent('menu-select', {
          bubble: true,
          detail: {
            value: link.innerHTML
          }
        }));
      }
    };
  }

  _render() {
    let tmp = document.createElement('div');
    tmp.innerHTML = template({
      title: this._title,
      items: this._items
    });
    this._elem = tmp.firstElementChild;
  }

  toggle() {
    this._elem.classList.toggle('open');
  }

  getElem() {
    return this._elem;
  }
}