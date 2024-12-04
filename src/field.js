import * as PIXI from "pixi.js";
//import { handleTileClick } from "./game.js";
import { handleTileClick as handleTileClick1 } from "./gameLev1.js";
import { handleTileClick as handleTileClick2 } from "./gameLev2.js";
import { handleTileClick as handleTileClick3 } from "./gameLev3.js";
import { handleTileClick as handleTileClick4 } from "./game.js";
import {
  textTask1,
  textTask2,
  textTask3,
  textTask4,
  descrTask1,
  descrTask2,
  descrTask3,
  descrTask4,
  updateTextOfLevel,
  hideMenu,
} from "./textLevel.js";
import { playMusic } from "./music.js";
import { setTargetScore } from "./score.js";

let selectedHandleTileClick;

const gridSize = 9;
const tileSize = 64;
const level1Btn = document.getElementById("level1");
const level2Btn = document.getElementById("level2");
const level3Btn = document.getElementById("level3");
const level4Btn = document.getElementById("level4");
const restartBtn = document.getElementById("restart");
hideMenu();

level1Btn.addEventListener("click", () => {
  selectedHandleTileClick = handleTileClick1;
  setTargetScore(2300);
  playMusic(1);
  updateTextOfLevel(textTask1, descrTask1);
});
level2Btn.addEventListener("click", () => {
  selectedHandleTileClick = handleTileClick2;
  setTargetScore(220);
  playMusic(2);
  updateTextOfLevel(textTask2, descrTask2);
});
level3Btn.addEventListener("click", () => {
  selectedHandleTileClick = handleTileClick3;
  setTargetScore(260);
  playMusic(3);
  updateTextOfLevel(textTask3, descrTask3);
});
level4Btn.addEventListener("click", () => {
  selectedHandleTileClick = handleTileClick4;
  setTargetScore(300);
  playMusic(4);
  updateTextOfLevel(textTask4, descrTask4);
});

restartBtn.addEventListener("click", () => {
  location.reload(); // Перезапускаємо сторінку
});

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
        selectedHandleTileClick(tile, app, gridSize, tileSize, field, elements);
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
