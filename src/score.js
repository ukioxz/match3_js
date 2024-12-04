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
