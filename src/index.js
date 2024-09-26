import * as PIXI from "pixi.js";
import { createField } from "./field.js";
import { elements } from "./config.js";
//import Game from "./game.js";

/*const app = new PIXI.Application();
await app.init({ width: 640, height: 360 });
document.body.appendChild(app.canvas);

await PIXI.Assets.load("../public/sprites/1 Apple.png");
let sprite = PIXI.Sprite.from("../public/sprites/1 Apple.png");
app.stage.addChild(sprite);*/
const app = new PIXI.Application();
/*const app = new PIXI.Application({
  width: 640,
  height: 360,
  backgroundColor: 0x1099bb, // Задаємо фон, наприклад, синій
});*/
await app.init({ width: 640, height: 640 });
document.body.appendChild(app.canvas); // Додаємо canvas на сторінку
/*const elements = [
  "../public/sprites/1.png",
  "../public/sprites/2.png",
  "../public/sprites/3.png",
  "../public/sprites/4.png",
  "../public/sprites/5.png",
  "../public/sprites/6.png",
];*/

// Завантажуємо елементи і створюємо поле
PIXI.Assets.load(elements).then(() => {
  createField(app, 9, 64, elements); // Викликаємо функцію для створення поля
});
// Завантажуємо текстуру і після цього додаємо спрайт
/*PIXI.Assets.load("../public/sprites/1 Apple.png").then(() => {
  let sprite = PIXI.Sprite.from("../public/sprites/1 Apple.png");
  sprite.x = app.renderer.width / 2;
  sprite.y = app.renderer.height / 2;
  sprite.anchor.set(0.5); // Центруємо спрайт
  app.stage.addChild(sprite);
});*/
