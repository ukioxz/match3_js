export let score = 0;

export function updateScore(points) {
  score += points;
  console.log(`Очки: ${score}`);
}
