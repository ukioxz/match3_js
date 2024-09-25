import * as PIXI from "pixi.js";
//import Game from "./game.js";

const app = new PIXI.Application();
await app.init({ width: 640, height: 360 });
document.body.appendChild(app.canvas);

await PIXI.Assets.load("../public/sprites/1 Apple.png");
let sprite = PIXI.Sprite.from("../public/sprites/1 Apple.png");
app.stage.addChild(sprite);
