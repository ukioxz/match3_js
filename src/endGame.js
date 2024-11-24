import { stopMusic } from "./music";
export function endGame() {
  stopMusic();
  console.log("Гра завершена! Ви виграли!");

  // Відображення повідомлення про перемогу
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.fontFamily = "'Press Start 2P', cursive";
  overlay.style.zIndex = 1000;

  const message = document.createElement("div");
  message.textContent = "Вітаємо! Ви виграли!";
  message.style.color = "white";
  message.style.fontSize = "36px";
  message.style.textAlign = "center";

  const button = document.createElement("button");
  button.textContent = "Повернутись до стартового меню";
  button.style.fontFamily = "'Press Start 2P', cursive";
  button.style.marginTop = "20px";
  button.style.padding = "10px 20px";
  button.style.fontSize = "18px";
  button.style.cursor = "pointer";

  button.addEventListener("click", () => {
    overlay.remove();
    // Тут можна додати логіку для перезапуску гри чи повернення до меню
    location.reload(); // Перезапускаємо сторінку (як приклад)
  });

  message.appendChild(button);
  overlay.appendChild(message);
  document.body.appendChild(overlay);

  // Додатково можна припинити обробку кліків на поле гри
  disableGameField();
}
// Функція, що робить поле гри неклікабельним
function disableGameField() {
  const gameCanvas = document.querySelector("canvas");
  if (gameCanvas) {
    gameCanvas.style.pointerEvents = "none";
  }
}
