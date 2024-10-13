import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { getRandomElement } from "./utils.js";
import { updateScore, score } from "./score.js";
/*import {
  checkMatches,
  removeMatches,
  dropTiles,
  fillEmptySpaces,
} from "./match.js";*/
import { elements } from "./config.js";

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

// Функція для перевірки, чи є сусідні плитки однаковими
/*function checkAdjacentMatches(tile, field) {
  const row = tile.gridRow;
  const col = tile.gridCol;
  console.log(row + " " + col);
  console.log(field[row][col + 1]);

  // Перевірка наявності плиток праворуч
  if (col + 1 < field.length && col + 2 < field.length) {
    const firstMatch = field[row][col + 1];
    const secondMatch = field[row][col + 2];
    //const firstMatch = field[row][col + 1];
    //const secondMatch = field[row][col + 2];

    // Перевіряємо, чи існують плитки та чи вони однакові
    if (
      firstMatch &&
      secondMatch &&
      tile.texture === firstMatch.texture &&
      tile.texture === secondMatch.texture
    ) {
      console.log("Є співпадіння з плитками справа!");
    } else console.log("Нема співпадіння з плитками справа(");
  }
}*/

// Функція для обробки кліку та заміни плиток
/*export function handleTileClick(tile, app, gridSize, tileSize, field) {
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
/*const tempX = selectedTile.x;
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

      // Оновлюємо масив `field` для правильного відображення позицій плиток
      field[selectedTile.gridRow][selectedTile.gridCol] = selectedTile;
      field[tile.gridRow][tile.gridCol] = tile;
      // Перевірка на збіги праворуч
      //checkAdjacentMatches(selectedTile, field);

      // Виводимо в консоль для перевірки оновлення
      console.log(`Before: row ${tile.gridRow}, col ${tile.gridCol}`);
      console.log(
        `Now: row ${selectedTile.gridRow}, col ${selectedTile.gridCol}`
      );

      // Після переміщення перевіряємо на збіги
      const matches = checkMatches(field, gridSize);
      if (matches.length > 0) {
        // Якщо є збіги, видаляємо їх, опускаємо елементи і заповнюємо порожні місця
        removeMatches(matches, app, field);
        dropTiles(field, gridSize, tileSize);
        fillEmptySpaces(field, gridSize, tileSize, elements, app);
      } else {
        // Якщо збігів немає, переміщуємо плитки назад
        gsap.to(selectedTile, { x: tempX, y: tempY, duration: 0.23 });
        gsap.to(tile, { x: tile.x, y: tile.y, duration: 0.23 });
        console.log("Don't do it");
      }
    }
    // Повертаємо прозорість для вибраної плитки
    selectedTile.alpha = 1;

    // Скидаємо вибір
    selectedTile = null;
  }
}*/
export function handleTileClick(tile, app, gridSize, tileSize, field) {
  const img1 = new Image();
  img1.src = "../public/sprites/1.png";
  //const baseImg1 = new PIXI.BaseTexture(img1);
  const textureImg1 = PIXI.Texture.from("../public/sprites/1.png");
  const textureImg2 = PIXI.Texture.from("../public/sprites/2.png");
  //console.log(textureImg1);
  //console.log(textureImg2);
  if (!selectedTile) {
    selectedTile = tile;
    tile.alpha = 0.5;
  } else {
    if (areTilesAdjacent(selectedTile, tile)) {
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
        //match.push(...tile);
        match.push(tile);
      } else {
        if (match.length >= 3) {
          matches.push(...match);
        }
        //match = [tile];
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
        //match = [tile];
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
/*function removeMatches(matches, app, field) {
  matches.forEach((tile) => {
    app.stage.removeChild(tile);
    // Оновлюємо field
    const row = tile.gridRow;
    const col = tile.gridCol;
    field[row][col] = null; // Видаляємо плитку з масиву
  });
}
function dropTiles(field, gridSize, tileSize) {
  for (let col = 0; col < gridSize; col++) {
    let emptySpaces = 0;

    for (let row = gridSize - 1; row >= 0; row--) {
      if (!field[row][col]) {
        emptySpaces++;
      } else if (emptySpaces > 0) {
        const tile = field[row][col];
        field[row + emptySpaces][col] = tile;
        field[row][col] = null;

        // Анімація падіння
        gsap.to(tile, { y: tile.y + emptySpaces * tileSize, duration: 0.5 });
      }
    }
  }
}
function fillEmptySpaces(field, gridSize, tileSize, elements, app) {
  for (let col = 0; col < gridSize; col++) {
    for (let row = 0; row < gridSize; row++) {
      if (!field[row][col]) {
        const texture = PIXI.Texture.from(getRandomElement(elements));
        const tile = new PIXI.Sprite(texture);
        tile.width = tileSize;
        tile.height = tileSize;
        tile.x = col * tileSize;
        tile.y = row * tileSize;

        app.stage.addChild(tile);
        field[row][col] = tile;
      }
    }
  }
}*/
function removeMatches(matches, app, field) {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        const gridSize = field.length;
        const textureImg1 = PIXI.Texture.from("../public/sprites/2.png");
        const hasSpecialMatch = matches.some(
          (tile) => tile.texture === textureImg1
        );

        if (hasSpecialMatch) {
          // Видаляємо всі елементи з текстурою 1.png з поля
          for (let row = 0; row < field.length; row++) {
            for (let col = 0; col < field[row].length; col++) {
              const tile = field[row][col];
              if (tile && tile.texture === textureImg1) {
                app.stage.removeChild(tile);
                field[row][col] = null;
                console.log(`Removed special tile at [${row}, ${col}]`);
              }
            }
          }
        }
        matches.forEach((tile) => {
          /*if (tile) {
            // Діагностичний лог для відстеження текстури
            const textureImg1 = PIXI.Texture.from("../public/sprites/1.png");
            if (textureImg1 === tile.texture) {
              console.log("ura");
              removeRowOrColumn(tile, field, app, gridSize);
            } else console.log("ne ura");
            //console.log("Tile texture:", tile.texture);
          }*/
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
  });
}

// Видалення рядка або стовпця на основі позиції плитки
function removeRowOrColumn(tile, field, app, gridSize) {
  const row = tile.gridRow;
  const col = tile.gridCol;

  // Видаляємо рядок
  for (let c = 0; c < gridSize; c++) {
    if (field[row][c]) {
      app.stage.removeChild(field[row][c]);
      field[row][c] = null;
      updateScore(5);
    }
  }

  // Видаляємо стовпець
  for (let r = 0; r < gridSize; r++) {
    if (field[r][col]) {
      app.stage.removeChild(field[r][col]);
      field[r][col] = null;
      updateScore(5);
    }
  }
}
