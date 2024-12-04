import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { getRandomElement } from "./utils.js";
import { Howl } from "howler";
import { updateScore, score } from "./score.js";

import { elements } from "./config.js";

const targetSscore = 300;
const sounds = {
  tileClick: new Howl({ src: ["sounds/click2.mp3"] }),
  match: new Howl({ src: ["sounds/jingle.mp3"] }),
  drop: new Howl({ src: ["sounds/shine.mp3"] }),
};
let selectedTile = null;

// Функція для перевірки, чи є дві плитки сусідніми
function areTilesAdjacent(tile1, tile2) {
  const rowDiff = Math.abs(tile1.gridRow - tile2.gridRow);
  const colDiff = Math.abs(tile1.gridCol - tile2.gridCol);

  // Плитки мають бути сусідніми по одній осі (горизонтально або вертикально)
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

export function handleTileClick(tile, app, gridSize, tileSize, field) {
  if (!selectedTile) {
    sounds.tileClick.play();
    selectedTile = tile;
    tile.alpha = 0.5;
  } else {
    if (areTilesAdjacent(selectedTile, tile)) {
      sounds.tileClick.play();
      const tempX = selectedTile.x;
      const tempY = selectedTile.y;
      const tempRow = selectedTile.gridRow;
      const tempCol = selectedTile.gridCol;

      // Анімація переміщення
      gsap.to(selectedTile, { x: tile.x, y: tile.y, duration: 0.23 });
      gsap.to(tile, { x: tempX, y: tempY, duration: 0.23 });

      selectedTile.gridRow = tile.gridRow;
      selectedTile.gridCol = tile.gridCol;
      tile.gridRow = tempRow;
      tile.gridCol = tempCol;

      field[selectedTile.gridRow][selectedTile.gridCol] = selectedTile;
      field[tile.gridRow][tile.gridCol] = tile;

      const matches = checkMatches(field, gridSize);
      if (matches.length > 0) {
        // Якщо є збіги, обробляємо їх поетапно
        removeMatches(matches, app, field)
          .then(() => dropTiles(field, gridSize, tileSize))
          .then(() => fillEmptySpaces(field, gridSize, tileSize, elements, app))
          .then(() => {
            // Повторна перевірка збігів після заповнення нових плиток
            const newMatches = checkMatches(field, gridSize);
            if (newMatches.length > 0) {
              return removeMatches(newMatches, app, field)
                .then(() => dropTiles(field, gridSize, tileSize))
                .then(() =>
                  fillEmptySpaces(field, gridSize, tileSize, elements, app)
                );
            }
          });
      } else {
        // Якщо немає збігів, повертаємо плитки на місце
        gsap.to(selectedTile, { x: tempX, y: tempY, duration: 0.23 });
        gsap.to(tile, { x: tile.x, y: tile.y, duration: 0.23 });
      }
    }

    selectedTile.alpha = 1;
    selectedTile = null;
  }
}
function checkMatches(field, gridSize) {
  const matches = [];

  // Перевірка горизонтальних збігів
  for (let row = 0; row < gridSize; row++) {
    let match = [];
    for (let col = 0; col < gridSize; col++) {
      const tile = field[row][col];
      if (tile && match.length > 0 && tile.texture === match[0].texture) {
        match.push(tile);
      } else {
        if (match.length >= 3) {
          matches.push(...match);
        }
        match = tile ? [tile] : []; // Скидаємо match, якщо плитка відсутня
      }
    }
    if (match.length >= 3) {
      matches.push(...match);
    }
  }

  // Перевірка вертикальних збігів
  for (let col = 0; col < gridSize; col++) {
    let match = [];
    for (let row = 0; row < gridSize; row++) {
      const tile = field[row][col];
      if (tile && match.length > 0 && tile.texture === match[0].texture) {
        match.push(tile);
      } else {
        if (match.length >= 3) {
          matches.push(...match);
        }
        match = tile ? [tile] : []; // Скидаємо match, якщо плитка відсутня
      }
    }
    if (match.length >= 3) {
      matches.push(...match);
    }
  }
  console.log(`Found matches: ${matches.length}`);

  return matches;
}
function removeMatches(matches, app, field) {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        matches.forEach((tile) => {
          sounds.match.play();
          updateScore(5);
          app.stage.removeChild(tile);

          // Видаляємо плитку з масиву
          const row = tile.gridRow;
          const col = tile.gridCol;
          field[row][col] = null;
        });
        resolve();
      },
    });

    matches.forEach((tile) => {
      tl.to(tile, { alpha: 0, duration: 0.3 }, 0); // Анімація зникнення плитки
    });
  });
}

function dropTiles(field, gridSize, tileSize) {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => resolve(),
    });

    for (let col = 0; col < gridSize; col++) {
      let emptySpaces = 0;

      for (let row = gridSize - 1; row >= 0; row--) {
        if (!field[row][col]) {
          emptySpaces++;
        } else if (emptySpaces > 0) {
          const tile = field[row][col];
          field[row + emptySpaces][col] = tile;
          field[row][col] = null;
          // Оновлюємо координати gridRow для нової позиції
          tile.gridRow = row + emptySpaces;

          // Анімація падіння
          tl.to(
            tile,
            {
              y: tile.y + emptySpaces * tileSize,
              duration: 0.5,
              onComplete: () => {
                // Оновлюємо обробник події після зміщення
                tile.interactive = true;
                tile.buttonMode = true;
                tile.on("pointerdown", () =>
                  handleTileClick(tile, app, gridSize, tileSize, field)
                );
              },
            },
            0
          );
        }
      }
    }
  });
}

function fillEmptySpaces(field, gridSize, tileSize, elements, app) {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: resolve,
    });

    for (let col = 0; col < gridSize; col++) {
      for (let row = 0; row < gridSize; row++) {
        if (!field[row][col]) {
          const texture = PIXI.Texture.from(getRandomElement(elements));
          const tile = new PIXI.Sprite(texture);
          tile.width = tileSize;
          tile.height = tileSize;
          tile.x = col * tileSize;
          tile.y = -tileSize; // Додаємо нову плитку зверху поля
          // Оновлюємо gridRow і gridCol для нової плитки
          tile.gridRow = row;
          tile.gridCol = col;

          app.stage.addChild(tile);

          // Заповнюємо порожні місця
          field[row][col] = tile;
          // Встановлюємо події на нові плитки
          tile.interactive = true;
          tile.buttonMode = true;
          tile.on("pointerdown", () =>
            handleTileClick(tile, app, gridSize, tileSize, field)
          );

          // Анімація появи нових плиток
          tl.to(tile, { y: row * tileSize, duration: 0.5 }, 0);
        }
      }
    }
    sounds.drop.play();
  });
}
