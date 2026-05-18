import Phaser from "phaser";
import StartScene from "./scenes/StartScene";
import GameScene from "./scenes/GameScene";
import GameOverScene from "./scenes/GameOverScene";

const headlines = [
  "Central wins in overtime after a 42-yard walk-off field goal",
  "North Valley QB throws four touchdowns in rivalry matchup",
  "East Ridge volleyball advances behind a 17-kill performance",
  "Westside student section named loudest crowd of the week",
  "MaxPreps power rankings update drops after tonight's finals",
];

let headlineIndex = 0;
const tickerText = document.querySelector("#tickerText");

window.setInterval(() => {
  headlineIndex = (headlineIndex + 1) % headlines.length;
  if (tickerText) {
    tickerText.textContent = headlines[headlineIndex];
  }
}, 3200);

if (tickerText) {
  tickerText.textContent = headlines[headlineIndex];
}

const config = {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#0f5127",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 640,
    min: {
      width: 320,
      height: 480,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [StartScene, GameScene, GameOverScene],
};

new Phaser.Game(config);
