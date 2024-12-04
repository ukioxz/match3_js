import { endGame } from "./endGame";

const levelGoal = document.getElementById("levelGoal");
export let score = 0;
let scoreText;
export let targetScore;

const divScore = document.getElementById("scoreCounter");
export function updateScore(points) {
  score += points;
  console.log(`Очки: ${score}`);
  divScore.textContent = `Очки: ${score}`;
  // Перевіряємо, чи досягнуто цільову кількість очок
  if (score >= targetScore) {
    endGame(); // Викликаємо функцію завершення гри
  }
}
// Функція для встановлення цільових очок
export function setTargetScore(resScore) {
  targetScore = resScore;
  levelGoal.textContent = `Ціль: ${resScore} очок`;
  console.log(`Ціль оновлено: ${targetScore}`);
}
/*import * as PIXI from "pixi.js";
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
}*/
