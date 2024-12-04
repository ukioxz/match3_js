export let textTask1 = "Зоряний хрест";
export let textTask2 = "Космічний вихор";
export let textTask3 = "Зоряний вибух";
export let textTask4 = "Перша гармонія";
export let descrTask1 =
  "Ви потрапляєте на планету <span style='color: orange;'>Хресторія</span>, де зорі хаотично переплелися. Вам потрібно виправити їх положення, <span style='color: #FF00FF;'>видаляючи <span style='color: #1E90FF;'>блакитні</span> зірки хрестиком</span>. Збирайте комбінації, щоб очистити зоряне небо.";
export let descrTask2 =
  "Наступна зупинка — планета <span style='color: #FF00FF;'>Колорія</span>. Вона наповнена зірками різних кольорів, але вони втратили гармонію. Ваша задача — <span style='color: #1E90FF;'>об’єднати зірки <span style='color: #7FFF00;'>зеленого</span> кольору</span>, щоб вони розсіялися у просторі.";
export let descrTask3 =
  "Ваша подорож триває, і ви натрапляєте на вибухову планету <span style='color: #CD5C5C;'>Детонія</span>. Тут зорі накопичили надлишок енергії, і ваш обов'язок — контролювати її вивільнення. <span style='color: #F0E68C;'>Видаляйте зірки <span style='color: #CD5C5C;'>червоного</span> кольору</span>, щоб виникнув потужний вибух.";
export let descrTask4 =
  "Ви потрапляєте на планету <span style='color: #1E90FF;'>Синхронія</span>, де зорі взаємодіють лише зі схожими на себе. <br> Ваша мета — <span style='color: #F0E68C;'>поєднати їх в групи</span>, які збігаються за кольором.";
//let scoreText;
const textOfLevel = document.getElementById("textOfLevel");
const l = document.querySelector(".nameLevel");
console.log(l);
const descrOfLevel = document.getElementById("descrOfLevel");
const textMision = document.getElementById("textMision");
export function updateTextOfLevel(textTask, descrTask) {
  textOfLevel.textContent = `${textTask}`;
  l.textContent = `${textTask}`;
  descrOfLevel.innerHTML = `${descrTask}`;
}
export function hideMenu() {
  document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("startMenu").style.display = "none";
  });
}
