export default class SelectedBox {
  _element;
  _startLeft = 0;
  _startTop = 0;
  left = 0;
  top = 0;
  width = 0;
  height = 0;

  constructor() {
    const element = document.createElement('div');
    element.id = 'selected-box';
    this._element = element;
    this._element.style.width = this.width + 'px';
    this._element.style.height = this.height + 'px';
  }

  append(left, top) {
    this._element.style.position = 'absolute';
    this.left = left;
    this.top = top;
    this._startLeft = left;
    this._startTop = top;
    this._element.style.left = left + 'px';
    this._element.style.top = top + 'px';
    document.body.append(this._element);
  }
  
  remove() {
    this._element.remove();
  }

  drowRect(newLeft, newTop) {
    if(newLeft <= this._startLeft) { 
      this._element.style.left = newLeft + 'px';
      this.left = newLeft;
    }
    if(newTop <= this._startTop) { 
      this._element.style.top = newTop + 'px'
      this.top = newTop;
    }

    this.width = Math.abs(newLeft - this._startLeft);
    this.height = Math.abs(newTop - this._startTop);

    this._element.style.width = this.width + 'px';
    this._element.style.height = this.height + 'px';
  }

  getInsideElements(listElements) {
    return listElements.filter((element) => 
        element.top >= this.top
        && element.top + element.height <= this.top + this.height
        && element.left >= this.left
        && element.left + element.width <= this.left + this.width
    );
  }
}