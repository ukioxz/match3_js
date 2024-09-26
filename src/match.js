import * as PIXI from "pixi.js";
import { gsap } from "gsap";

// Перевірка на збіги
export function checkMatches(field, gridSize) {
  const matches = [];
  // Перевірка горизонтальних і вертикальних збігів
  // (код як раніше, див. попередні відповіді)
  // Перевірка рядків
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize - 2; col++) {
      const tile1 = field[row][col];
      const tile2 = field[row][col + 1];
      const tile3 = field[row][col + 2];

      if (tile1.texture === tile2.texture && tile2.texture === tile3.texture) {
        matches.push(tile1, tile2, tile3);
      }
    }
  }

  // Перевірка колонок
  for (let col = 0; col < gridSize; col++) {
    for (let row = 0; row < gridSize - 2; row++) {
      const tile1 = field[row][col];
      const tile2 = field[row + 1][col];
      const tile3 = field[row + 2][col];

      if (tile1.texture === tile2.texture && tile2.texture === tile3.texture) {
        matches.push(tile1, tile2, tile3);
      }
    }
  }
  return matches;
}

// Видалення збігів
export function removeMatches(matches, app) {
  matches.forEach((tile) => {
    app.stage.removeChild(tile);
  });
}

// Опускання елементів
export function dropTiles(field, gridSize, tileSize) {
  for (let col = 0; col < gridSize; col++) {
    let emptySpaces = 0;
    for (let row = gridSize - 1; row >= 0; row--) {
      if (!field[row][col]) {
        emptySpaces++;
      } else if (emptySpaces > 0) {
        const tile = field[row][col];
        field[row + emptySpaces][col] = tile;
        field[row][col] = null;
        gsap.to(tile, { y: tile.y + emptySpaces * tileSize, duration: 0.5 });
      }
    }
  }
}

// Заповнення порожніх місць
export function fillEmptySpaces(field, gridSize, tileSize, elements, app) {
  for (let col = 0; col < gridSize; col++) {
    for (let row = 0; row < gridSize; row++) {
      if (!field[row][col]) {
        const texture = PIXI.Texture.from(getRandomElement(elements));
        const tile = new PIXI.Sprite(texture);
        tile.width = tileSize;
        tile.height = tileSize;
        tile.x = col * tileSize;
        tile.y = row * tileSize;

        app.stage.addChild(tile);
        field[row][col] = tile;
      }
    }
  }
}
// Функція для опускання плиток після видалення
/*export function dropTiles(field, gridSize, tileSize) {
  for (let col = 0; col < gridSize; col++) {
    for (let row = gridSize - 1; row >= 0; row--) {
      if (!field[row][col]) {
        // Шукаємо першу не порожню клітинку вище
        for (let aboveRow = row - 1; aboveRow >= 0; aboveRow--) {
          if (field[aboveRow][col]) {
            // Опускаємо елемент
            field[row][col] = field[aboveRow][col];
            field[aboveRow][col] = null;
            field[row][col].y = row * tileSize;
            break;
          }
        }
      }
    }
  }
}

// Функція для заповнення порожніх клітинок новими елементами
export function fillEmptySpaces(field, gridSize, tileSize, elements, app) {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (!field[row][col]) {
        // Створюємо новий елемент
        const texture = PIXI.Texture.from(getRandomElement(elements));
        const tile = new PIXI.Sprite(texture);
        tile.width = tileSize;
        tile.height = tileSize;
        tile.x = col * tileSize;
        tile.y = row * tileSize;
        field[row][col] = tile;

        // Додаємо новий елемент на сцену
        app.stage.addChild(tile);
      }
    }
  }
}*/

// Допоміжна функція для випадкового вибору елемента
export function getRandomElement(elements) {
  const randomIndex = Math.floor(Math.random() * elements.length);
  return elements[randomIndex];
}
