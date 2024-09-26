import * as PIXI from "pixi.js";

let selectedTile = null;
// Функція для обробки кліку та заміни плиток
export function handleTileClick(tile, app, gridSize, tileSize) {
  // Якщо ще жодна плитка не вибрана
  if (!selectedTile) {
    selectedTile = tile; // Вибираємо поточну плитку
    tile.alpha = 0.5; // Візуально позначаємо вибрану плитку
  } else {
    // Міняємо місцями текстури двох плиток
    const tempTexture = selectedTile.texture;
    selectedTile.texture = tile.texture;
    tile.texture = tempTexture;

    // Повертаємо прозорість для вибраної плитки
    selectedTile.alpha = 1;

    // Скидаємо вибір
    selectedTile = null;
  }
}
