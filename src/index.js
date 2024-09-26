import * as PIXI from "pixi.js";
import { createField } from "./field.js";
import { elements } from "./config.js";

const app = new PIXI.Application();
await app.init({ width: 640, height: 640 });
document.body.appendChild(app.canvas); // Додаємо canvas на сторінку

// Завантажуємо елементи і створюємо поле
PIXI.Assets.load(elements).then(() => {
  const field = createField(app, 9, 64, elements); // Викликаємо функцію для створення поля
});
