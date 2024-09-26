import * as PIXI from "pixi.js";
import { gsap } from "gsap";

let selectedTile = null;

// Функція для анімації переміщення елементів
/*function animateTileMovement(tile, targetX, targetY, duration = 10) {
  const deltaX = (targetX - tile.x) / duration;
  const deltaY = (targetY - tile.y) / duration;

  let steps = 0;

  // Додаємо функцію до циклу оновлення анімації
  const moveTicker = new PIXI.Ticker();
  moveTicker.add(() => {
    tile.x += deltaX;
    tile.y += deltaY;
    steps++;

    // Зупиняємо анімацію після досягнення потрібної кількості кроків
    if (steps >= duration) {
      moveTicker.stop();
    }
  });

  moveTicker.start();
}*/
// Функція для перевірки, чи є дві плитки сусідніми
function areTilesAdjacent(tile1, tile2) {
  const rowDiff = Math.abs(tile1.gridRow - tile2.gridRow);
  const colDiff = Math.abs(tile1.gridCol - tile2.gridCol);

  // Плитки мають бути сусідніми по одній осі (горизонтально або вертикально)
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}
// Функція для обробки кліку та заміни плиток
export function handleTileClick(tile, app, gridSize, tileSize) {
  // Якщо ще жодна плитка не вибрана
  if (!selectedTile) {
    selectedTile = tile; // Вибираємо поточну плитку
    tile.alpha = 0.5; // Візуально позначаємо вибрану плитку
  } else {
    if (areTilesAdjacent(selectedTile, tile)) {
      // Міняємо місцями текстури двох плиток
      /*const tempTexture = selectedTile.texture;
      selectedTile.texture = tile.texture;
        tile.texture = tempTexture;*/
      const tempX = selectedTile.x;
      const tempY = selectedTile.y;
      const tempRow = selectedTile.gridRow;
      const tempCol = selectedTile.gridCol;

      //animateTileMovement(selectedTile, tile.x, tile.y); // Анімація для першої плитки
      //animateTileMovement(tile, tempX, tempY); // Анімація для другої плитки
      // Використовуємо GSAP для анімації переміщення
      gsap.to(selectedTile, { x: tile.x, y: tile.y, duration: 0.23 }); // Плавно переміщуємо першу плитку
      gsap.to(tile, { x: tempX, y: tempY, duration: 0.23 }); // Плавно переміщуємо другу плитку
      // Обмінюємося рядками і колонками між плитками
      selectedTile.gridRow = tile.gridRow;
      selectedTile.gridCol = tile.gridCol;
      tile.gridRow = tempRow;
      tile.gridCol = tempCol;
    } /*else {
      console.log("Don't do it");
    }*/
    // Повертаємо прозорість для вибраної плитки
    selectedTile.alpha = 1;

    // Скидаємо вибір
    selectedTile = null;
  }
}
