import Phaser from "phaser";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  preload() {
    this.load.image("maxpreps-logo-white", assetPath("mds/logos/maxpreps-logo-white.svg"));
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x071326);
    this.add.rectangle(width / 2, 52, width, 104, 0x046dff);
    this.add.rectangle(width / 2, 105, width, 8, 0xe10500);

    this.add.image(84, 50, "maxpreps-logo-white").setDisplaySize(134, 38).setOrigin(0, 0.5);
    this.add.text(width - 34, 50, "Internal Prototype", {
      fontFamily: "Arial",
      fontSize: "14px",
      color: "#dbeafe",
      fontStyle: "700",
    }).setOrigin(1, 0.5);

    this.drawFieldPreview(width, height);

    this.add.text(width / 2, height * 0.31, "MaxPreps\nGameDay Rush", {
      fontFamily: "Arial Black, Arial",
      fontSize: `${Math.round(Math.min(width * 0.088, 66))}px`,
      color: "#e10500",
      align: "center",
      lineSpacing: -6,
      stroke: "#ffffff",
      strokeThickness: 6,
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.48, "Powered by high school sports energy", {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#ffcc05",
      fontStyle: "700",
    }).setOrigin(0.5);

    const startButton = this.add.container(width / 2, height * 0.63);
    const buttonBg = this.add.rectangle(0, 0, 224, 58, 0xe10500, 1).setStrokeStyle(3, 0xffffff);
    const buttonText = this.add.text(0, 0, "Start Game", {
      fontFamily: "Arial Black, Arial",
      fontSize: "22px",
      color: "#ffffff",
    }).setOrigin(0.5);
    startButton.add([buttonBg, buttonText]);
    startButton.setSize(224, 58).setInteractive({ useHandCursor: true });
    startButton.on("pointerover", () => buttonBg.setFillStyle(0xff281f));
    startButton.on("pointerout", () => buttonBg.setFillStyle(0xe10500));
    startButton.on("pointerdown", () => this.scene.start("GameScene"));

    this.add.text(width / 2, height - 44, "Internal prototype only", {
      fontFamily: "Arial",
      fontSize: "13px",
      color: "#cbd5e1",
      fontStyle: "700",
    }).setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => this.scene.start("GameScene"));
    this.scale.on("resize", () => this.scene.restart(), this);
  }

  drawFieldPreview(width, height) {
    const field = this.add.graphics();
    const top = height * 0.19;
    const bottom = height - 78;
    const left = width * 0.16;
    const right = width * 0.84;

    field.fillStyle(0x0f5127, 1);
    field.fillRoundedRect(left, top, right - left, bottom - top, 8);
    field.lineStyle(2, 0xffffff, 0.22);

    for (let y = top + 24; y < bottom; y += 42) {
      field.lineBetween(left + 14, y, right - 14, y);
    }

    field.lineStyle(4, 0xffcc05, 0.72);
    field.strokeRoundedRect(left, top, right - left, bottom - top, 8);
  }
}
