import * as PIXI from "pixi.js";
import { createField } from "./field.js";
import { elements } from "./config.js";
import { initializeScore } from "./score.js";

const app = new PIXI.Application();
await app.init({ width: 640, height: 640 });
document.getElementById("gameContainer").appendChild(app.canvas); // Додаємо canvas на сторінку

const scoreContainer = new PIXI.Container();
app.stage.addChild(scoreContainer);
// Ініціалізуємо лічильник очок
initializeScore(scoreContainer);

// Створюємо контейнер для ігрового поля та інших елементів
/*const gameContainer = new PIXI.Container();
app.stage.addChild(gameContainer);

// Завантажуємо текстури і створюємо поле
PIXI.Assets.load(elements).then(() => {
  const gridSize = 9;
  const tileSize = 64;

  // Створюємо ігрове поле і додаємо його в контейнер
  const field = createField(gameContainer, gridSize, tileSize, elements);

  // Центруємо контейнер на сцені (по осі X)
  gameContainer.x = (app.screen.width - gridSize * tileSize) / 2;
  gameContainer.y = 100; // Відступ зверху для лічильника
});*/
// Завантажуємо елементи і створюємо поле
PIXI.Assets.load(elements).then(() => {
  const field = createField(app, 9, 64, elements); // Викликаємо функцію для створення поля
});
