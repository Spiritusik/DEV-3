import Character from './character.js';

export default class CharacterList {
  list = [];

  append(string, element) {
    for(const char of string) {
      const character = new Character(char);
      character.append(element);
      this.list.push(character);
    }
  }

  getCharacter(element) {
    return this.list.find((charecter) => charecter._element === element);
  }

  getSelected() {
    return this.list.filter(character => character.selected);
  }

  removeSelected() {
    this.list.forEach((character) => {
      if(character.selected) {
        character.removeSelected();
      }
    })
  }

  moveSelected(shiftX, shiftY, isMove = true) {
    const selectedList = this.getSelected();
    selectedList.forEach((character) => character.changePosition(
      character.left + shiftX, 
      character.top + shiftY, 
      !isMove,
    ));
  }

  swapPosition(fromCharacter, toElement) {
    const toCharacter = this.getCharacter(toElement);
    const fromCharacterPosition = {
      left: fromCharacter.left,
      top: fromCharacter.top,
    }

    fromCharacter.changePosition(
      toCharacter.left, 
      toCharacter.top, 
      true,
    );

    toCharacter.changePosition(
      fromCharacterPosition.left,
      fromCharacterPosition.top,
      true,
    );
  }

}