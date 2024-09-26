import * as PIXI from "pixi.js";
import { handleTileClick } from "./game.js";

const gridSize = 9;
const tileSize = 64;

export function createField(app, gridSize, tileSize, elements) {
  // Функція для випадкового вибору елемента
  function getRandomElement() {
    const randomIndex = Math.floor(Math.random() * elements.length);
    return elements[randomIndex];
  }

  // Створюємо поле
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      // Отримуємо випадковий елемент
      const texture = PIXI.Texture.from(getRandomElement());
      const tile = new PIXI.Sprite(texture);

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
        handleTileClick(tile, app, gridSize, tileSize);
        console.log(`Позиція клітинки: ряд ${row}, колонка ${col}`);
      });
    }
  }
}
//module.exports = { createField };
