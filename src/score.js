import * as PIXI from "pixi.js";
import { Text } from "pixi.js";

export let score = 0;
let scoreText;
const divScore = document.getElementById("scoreCounter");
//console.log(scoreCounter.textContent);

// Ініціалізуємо текст для відображення очок на сцені
export function initializeScore(container) {
  scoreText = new Text({
    text: "Score: 0",
    style: {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xffffff,
      align: "center",
      padding: 100,
    },
  });
  scoreText.x = 10; // Позиція тексту на сцені
  scoreText.y = 10;

  //app.stage.addChild(scoreText); // Додаємо текст на сцену
  container.addChild(scoreText);
}

// Оновлюємо текст лічильника
export function updateScoreText() {
  scoreText.text = `Score: ${score}`;
  divScore.textContent = `Score: ${score}`;
}

// Функція для збільшення очок
export function addPoints(points) {
  score += points;
  updateScoreText(); // Оновлюємо текст після збільшення очок
}
