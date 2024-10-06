import { elements } from "./config.js";
export function getRandomElement(elements) {
  const randomIndex = Math.floor(Math.random() * elements.length);
  return elements[randomIndex];
}
