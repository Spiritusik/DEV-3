export default class Character {
  _element;
  left;
  top;
  width;
  height;
  selected = false;
  
  constructor(char) {
    const element = document.createElement('span');
    element.className = 'result__char';
    element.textContent = char;
    this._element = element;
  }

  async append(element) {
    await element.append(this._element);
    await this._getElementDocumentPosition();
    this._element.style.position = 'absolute';
    this._element.style.left = this.left + 'px';
    this._element.style.top = this.top + 'px';
  }

  _getElementDocumentPosition() {
    const elementRect = this._element.getBoundingClientRect();
    this.left = elementRect.left + window.scrollX;
    this.top = elementRect.top + window.scrollY;
    this.width = elementRect.width;
    this.height = elementRect.height;
  }

  makeSelected() {
    this._element.classList.add('char-selected');
    this.selected = true;
  }

  toggleSelected() {
    this._element.classList.toggle('char-selected');
    this.selected = this._element.classList.contains('char-selected');
  }

  removeSelected() {
    this._element.classList.remove('char-selected');
    this.selected = false;
  }

  changePosition(left, top,  isChangeProps = false) {
    this._element.style.left = left + 'px';
    this._element.style.top = top + 'px';

    if(isChangeProps) {
      this.left = left;
      this.top = top;
    }
  }

  isCurrentElement(element) {
    return element === this._element;
  }
}