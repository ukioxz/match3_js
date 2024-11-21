export let textTask1 = "Рівень Зірочка";
export let textTask2 = "Рівень Баанана";
export let textTask3 = "Рівень вибух";
export let textTask4;
//let scoreText;
const textOfLevel = document.getElementById("textOfLevel");
export function updateTextOfLevel(textTask) {
  //score += points;
  //console.log(`Очки: ${score}`);
  textOfLevel.textContent = `${textTask}`;
}
