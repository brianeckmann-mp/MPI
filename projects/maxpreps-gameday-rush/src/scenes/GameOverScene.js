import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  init(data) {
    this.finalScore = data.score ?? 0;
    this.touchdowns = data.touchdowns ?? 0;
    this.longestStreak = data.longestStreak ?? 0;
    this.badges = data.badges ?? [];
  }

  create() {
    const { width, height } = this.scale;
    const compact = width < 760;
    const panelWidth = Math.min(width - 48, 720);

    this.add.rectangle(width / 2, height / 2, width, height, 0x071326);
    this.add.rectangle(width / 2, 0, width, 92, 0xffffff).setOrigin(0.5, 0);
    this.add.rectangle(width / 2, 92, width, 6, 0xe10500);
    this.add.text(width / 2, 46, "MaxPreps GameDay Rush", {
      fontFamily: "Arial Black, Arial",
      fontSize: `${compact ? 24 : 32}px`,
      color: "#e10500",
      align: "center",
    }).setOrigin(0.5);

    this.add.text(width / 2, compact ? 132 : 146, "Final Whistle", {
      fontFamily: "Arial Black, Arial",
      fontSize: `${compact ? 38 : 54}px`,
      color: "#ffffff",
      stroke: "#022c66",
      strokeThickness: 7,
    }).setOrigin(0.5);

    const statsY = compact ? 236 : 270;
    const statGap = compact ? 10 : 16;
    const statCardWidth = compact ? panelWidth : (panelWidth - statGap * 2) / 3;
    const statCardHeight = compact ? 76 : 118;
    const statStartX = compact ? width / 2 : width / 2 - panelWidth / 2 + statCardWidth / 2;
    const statRows = [
      ["Final Score", `${Math.round(this.finalScore)}`],
      ["Touchdowns", `${this.touchdowns}`],
      ["Longest Streak", `${this.longestStreak}`],
    ];

    statRows.forEach(([label, value], index) => {
      const x = compact ? statStartX : statStartX + index * (statCardWidth + statGap);
      const y = compact ? statsY + index * (statCardHeight + statGap) : statsY;
      this.add.rectangle(x, y, statCardWidth, statCardHeight, 0xffffff, 0.1).setStrokeStyle(2, 0xffffff, 0.28);
      this.add.text(x, y - statCardHeight * 0.22, label, {
        fontFamily: "Arial",
        fontSize: compact ? "13px" : "14px",
        color: "#bfdbfe",
        fontStyle: "700",
      }).setOrigin(0.5);
      this.add.text(x, y + statCardHeight * 0.08, value, {
        fontFamily: "Arial Black, Arial",
        fontSize: compact ? "30px" : "40px",
        color: "#ffffff",
      }).setOrigin(0.5);
    });

    const badgesTitleY = compact ? statsY + 280 : 390;
    this.add.text(width / 2, badgesTitleY, "Badges Earned", {
      fontFamily: "Arial Black, Arial",
      fontSize: compact ? "17px" : "21px",
      color: "#ffcc05",
    }).setOrigin(0.5);

    const columns = compact ? 1 : 2;
    const badgeWidth = compact ? Math.min(panelWidth, 320) : Math.min(300, (panelWidth - 18) / 2);
    const badgeStartY = badgesTitleY + 48;
    this.badges.forEach((badge, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      const x = columns === 1 ? width / 2 : width / 2 - badgeWidth / 2 - 9 + col * (badgeWidth + 18);
      const y = badgeStartY + row * 44;
      this.add.rectangle(x, y, badgeWidth, 32, 0x022c66, 1).setStrokeStyle(2, 0xffcc05);
      this.add.text(x, y, badge, {
        fontFamily: "Arial Black, Arial",
        fontSize: "13px",
        color: "#ffffff",
      }).setOrigin(0.5);
    });

    const playAgainY = Math.min(height - 58, badgeStartY + Math.ceil(this.badges.length / columns) * 44 + 74);
    const playAgain = this.add.container(width / 2, playAgainY);
    const buttonBg = this.add.rectangle(0, 0, 224, 54, 0xe10500, 1).setStrokeStyle(3, 0xffffff);
    const buttonText = this.add.text(0, 0, "Play Again", {
      fontFamily: "Arial Black, Arial",
      fontSize: "21px",
      color: "#ffffff",
    }).setOrigin(0.5);
    playAgain.add([buttonBg, buttonText]);
    playAgain.setSize(224, 54).setInteractive({ useHandCursor: true });
    playAgain.on("pointerover", () => buttonBg.setFillStyle(0xff281f));
    playAgain.on("pointerout", () => buttonBg.setFillStyle(0xe10500));
    playAgain.on("pointerdown", () => this.scene.start("GameScene"));

    this.scale.on("resize", () => {
      this.scene.restart({
        score: this.finalScore,
        touchdowns: this.touchdowns,
        longestStreak: this.longestStreak,
        badges: this.badges,
      });
    }, this);
  }
}
