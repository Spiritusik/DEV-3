import CharacterList from './characterList.js';
import SelectedBox from './selectedBox.js';

const input = document.getElementById('input');
const button = document.getElementById('button');
const result = document.getElementById('result');
const characterList = new CharacterList();

button.addEventListener('click', () => {
  const string = input.value;
  input.value = '';
  
  characterList.append(string, result);
});

// Допоміжня функція для отримання поточної позиції
const getPagePosition = (event) => {
  return {
    x: event.pageX,
    y: event.pageY,
  }
}

// Функція для події натиснення на літеру
const onCharacterMouseDown = (event) => {
  const target = event.target;
  // Данна подія налаштовується лише для символів
  if(!target.classList.contains('result__char')) return;

  const charecter = characterList.getCharacter(target);
  // Якщо це подія з клавішею ctrl, то ми лише додаємо елемент
  if(event.ctrlKey) return charecter.toggleSelected();

  // Якщо ми клікаємо не на вже обраний елемент, то це не подія руху
  if(!charecter.selected) {
    characterList.removeSelected();
    charecter.makeSelected();
  }

  // Інакше це подія руху:
  // Отримуємо поточне положення мищі:
  const startPosition = getPagePosition(event);

  const onMouseMove = ( event ) => {
    // лише рухаємо об'єкти:
    const currentPosition = getPagePosition(event);
    characterList.moveSelected(
      currentPosition.x - startPosition.x, 
      currentPosition.y - startPosition.y,
    );
    }
    
    const onMouseUp = async ( event ) => {
      // Видаляємо слухачі подій:
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // Отримуємо список з виділенних символів
      const selectedList = characterList.getSelected();
      // У випадку, якщо такий символ лише один
      if(selectedList.length === 1) {
        const selectedCharacter = selectedList[0];
        const target = event.target;
        // Перевіряємо, чи об'єкт що знаходиться за поточнии об'єктом є також символом
        if(target.classList.contains('result__char') && !selectedCharacter.isCurrentElement(target)) {
          characterList.swapPosition(selectedCharacter, target);
          return ;
        }
      }
      // Змінюємо попередні положення та рухаємо об'єкт:
      const currentPosition = getPagePosition(event);
      characterList.moveSelected(
        currentPosition.x - startPosition.x, 
        currentPosition.y - startPosition.y,
        false,
      );
    }
    
    // Додаємо слухачі подій
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// Функція для виділення літер за допомогою малювання квадрату
const onMouseDownForSelectedBox = (event) => {
  const target = event.target;
  // Данна подія налаштовується лише коли торкаємось body
  if(target.tagName !== 'BODY') return ;

  // створюємо об'єкт для отрмання елементів у середині:
  characterList.removeSelected();
  const selectedBox = new SelectedBox();
  selectedBox.append(event.pageX, event.pageY);

  // Функція для події переміщення курсора:
  const onMouseMove = (event) => {
    characterList.removeSelected();
    selectedBox.drowRect(event.pageX, event.pageY);
    const charactersInside = selectedBox.getInsideElements(characterList.list);
    charactersInside.forEach((character) => character.makeSelected());
  }

  // Функція для події переміщення курсора:
  const onMouseUp = (event) => {
    // видаляємо елемент:
    selectedBox.remove();
    // видаляємо слухачі подій:
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  // Додаємо слухачі подій:
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

// Додаємо подію створення прямокутника для виділення
document.addEventListener('mousedown', onMouseDownForSelectedBox);
// Додаємо подію натиснення на літеру
document.addEventListener('mousedown', onCharacterMouseDown);