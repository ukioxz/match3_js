import * as PIXI from "pixi.js";
//import { handleTileClick } from "./game.js";
//import { handleTileClick } from "./gameLev1.js";
import { handleTileClick } from "./gameLev2.js";

const gridSize = 9;
const tileSize = 64;

export function createField(app, gridSize, tileSize, elements) {
  // Функція для випадкового вибору елемента
  function getRandomElement() {
    const randomIndex = Math.floor(Math.random() * elements.length);
    return elements[randomIndex];
  }

  // Створюємо поле
  const field = [];
  for (let row = 0; row < gridSize; row++) {
    field[row] = [];
    const rowArray = []; // Масив для збереження рядка плиток
    for (let col = 0; col < gridSize; col++) {
      let texture = null;
      let tile = null;
      // Отримуємо випадковий елемент
      //const texture = PIXI.Texture.from(getRandomElement());
      //const texture = PIXI.Texture.from(getRandomElement(elements));
      //const tile = new PIXI.Sprite(texture);

      do {
        // Генеруємо випадковий елемент
        texture = PIXI.Texture.from(getRandomElement(elements));
        tile = new PIXI.Sprite(texture);

        // Перевіряємо, чи не утворює нова плитка збігів по горизонталі або вертикалі
      } while (hasHorizontalOrVerticalMatch(row, col, texture, field));

      // Налаштовуємо розмір і позицію для кожного елемента
      tile.width = tileSize;
      tile.height = tileSize;
      tile.x = col * tileSize;
      tile.y = row * tileSize;

      // Додаємо інформацію про рядок і колонку для кожної плитки
      tile.gridRow = row;
      tile.gridCol = col;

      // Додаємо елемент на сцену
      app.stage.addChild(tile);

      // Робимо плитку інтерактивною
      tile.interactive = true;
      tile.buttonMode = true;

      // Додаємо обробку кліку по плитці
      tile.on("pointerdown", () => {
        // Викликаємо функцію заміни
        handleTileClick(tile, app, gridSize, tileSize, field, elements);
        //console.log(`Позиція клітинки: ряд ${row}, колонка ${col}`);
      });
      field[row][col] = tile;
      app.stage.addChild(tile);
      //!!!!
      //field[row][col] = tile;
      rowArray.push(tile); // Додаємо плитку в масив рядка
    }
    field.push(rowArray); // Додаємо рядок у поле
  }
  return field;
}

// Функція для перевірки, чи утворює плитка збіги по горизонталі або вертикалі
function hasHorizontalOrVerticalMatch(row, col, texture, field) {
  // Перевірка на горизонтальні збіги
  if (col >= 2) {
    const tile1 = field[row][col - 1];
    const tile2 = field[row][col - 2];
    if (
      tile1 &&
      tile2 &&
      tile1.texture === texture &&
      tile2.texture === texture
    ) {
      return true;
    }
  }

  // Перевірка на вертикальні збіги
  if (row >= 2) {
    const tile1 = field[row - 1][col];
    const tile2 = field[row - 2][col];
    if (
      tile1 &&
      tile2 &&
      tile1.texture === texture &&
      tile2.texture === texture
    ) {
      return true;
    }
  }

  return false;
}
