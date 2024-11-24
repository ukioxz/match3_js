import { Howl } from "howler";

const musicTracks = {
  level1: new Howl({
    src: ["sounds/back1.mp3"],
    loop: true, // Зацикливание музыки
    volume: 0.2, // Громкость
  }),
  level2: new Howl({
    src: ["sounds/back2.mp3"],
    loop: true,
    volume: 0.2,
  }),
  level3: new Howl({
    src: ["sounds/back3.mp3"],
    loop: true,
    volume: 0.2,
  }),
  level4: new Howl({
    src: ["sounds/back4.mp3"],
    loop: true,
    volume: 0.2,
  }),
};
let currentTrack = null;

export function playMusic(level) {
  if (currentTrack) {
    currentTrack.stop();
  }

  currentTrack = musicTracks[`level${level}`];

  if (currentTrack) {
    currentTrack.play();
  } else {
    console.error(`music for ${level} don't find`);
  }
}
export function stopMusic() {
  if (currentTrack) {
    currentTrack.stop();
    currentTrack = null;
  }
}
