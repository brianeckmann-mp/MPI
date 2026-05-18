import Phaser from "phaser";

const GAME_SECONDS = 60;
const HUD_HEIGHT = 118;
const ENDZONE_HEIGHT = 72;
const PLAYER_SIZE = 52;

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("maxpreps-logo-white", assetPath("mds/logos/maxpreps-logo-white.svg"));
  }

  create() {
    this.score = 0;
    this.touchdowns = 0;
    this.streak = 0;
    this.longestStreak = 0;
    this.spirit = 12;
    this.remaining = GAME_SECONDS;
    this.slowUntil = 0;
    this.fieldOffset = 0;
    this.yards = 0;
    this.touchdownLock = false;

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys("W,A,S,D");
    this.ensureHitboxTexture();
    this.updateFieldBounds();

    this.fieldLayer = this.add.graphics().setDepth(0);
    this.endzoneText = this.add.text(this.scale.width / 2, this.fieldTop + 36, "MAXPREPS END ZONE", {
      fontFamily: "Arial Black, Arial",
      fontSize: "18px",
      color: "#ffcc05",
      letterSpacing: 1,
    }).setOrigin(0.5).setDepth(1);

    this.powerups = this.physics.add.group();
    this.defenders = this.physics.add.group();

    this.player = this.physics.add.sprite(this.scale.width / 2, this.fieldBottom - 62, "hitbox");
    this.player.setVisible(false);
    this.player.setCircle(24);
    this.player.body.setAllowGravity(false);
    this.player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(30, this.fieldTop + 12, this.scale.width - 60, this.fieldHeight - 24));
    this.player.setCollideWorldBounds(true);
    this.playerArt = this.createPlayerArt(this.player.x, this.player.y);

    this.physics.add.overlap(this.player, this.powerups, this.collectPowerup, undefined, this);
    this.physics.add.overlap(this.player, this.defenders, this.hitDefender, undefined, this);

    this.createHud();
    this.createTouchdownBanner();
    this.seedObjects();

    this.time.addEvent({ delay: 680, callback: this.spawnDefender, callbackScope: this, loop: true });
    this.time.addEvent({ delay: 920, callback: this.spawnPowerup, callbackScope: this, loop: true });
    this.time.addEvent({ delay: 1000, callback: this.tickClock, callbackScope: this, loop: true });

    this.scale.on("resize", this.handleResize, this);
  }

  update(time, delta) {
    this.drawField(delta);
    this.movePlayer(time);
    this.updateProgress();
    this.updateObjectMotion();
    this.updateHud();
    this.playerArt.setPosition(this.player.x, this.player.y);
  }

  ensureHitboxTexture() {
    if (this.textures.exists("hitbox")) return;

    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(0, 0, 4, 4);
    graphics.generateTexture("hitbox", 4, 4);
    graphics.destroy();
  }

  updateFieldBounds() {
    this.fieldTop = HUD_HEIGHT;
    this.fieldBottom = this.scale.height - 12;
    this.fieldHeight = Math.max(360, this.fieldBottom - this.fieldTop);
    this.playWidth = this.scale.width;
  }

  createPlayerArt(x, y) {
    const mascot = this.add.container(x, y).setDepth(8);
    mascot.add([
      this.add.ellipse(0, 31, 62, 16, 0x000000, 0.22),
      this.add.rectangle(0, 8, PLAYER_SIZE, 54, 0x046dff).setStrokeStyle(4, 0xffffff),
      this.add.circle(0, -30, 21, 0xffcc05).setStrokeStyle(4, 0x022c66),
      this.add.text(0, 8, "MASCOT", {
        fontFamily: "Arial Black, Arial",
        fontSize: "9px",
        color: "#ffffff",
      }).setOrigin(0.5),
    ]);
    return mascot;
  }

  createHud() {
    this.hud = this.add.container(0, 0).setDepth(30);
    this.hudBg = this.add.rectangle(0, 0, this.scale.width, HUD_HEIGHT, 0x081226, 0.96).setOrigin(0, 0);
    this.hudTop = this.add.rectangle(0, 0, this.scale.width, 34, 0x046dff, 1).setOrigin(0, 0);
    this.hudStripe = this.add.rectangle(0, HUD_HEIGHT - 5, this.scale.width, 5, 0xe10500).setOrigin(0, 0);
    this.logo = this.add.image(18, 18, "maxpreps-logo-white").setDisplaySize(110, 32).setOrigin(0, 0.5);
    this.modeText = this.add.text(this.scale.width - 18, 17, "Rivalry Mode", {
      fontFamily: "Arial Black, Arial",
      fontSize: "13px",
      color: "#ffcc05",
    }).setOrigin(1, 0.5);

    this.scoreText = this.metricText(22, 62, "Score 0");
    this.yardsText = this.metricText(172, 62, "Yards 0");
    this.timeText = this.metricText(318, 62, "Time 60");
    this.streakText = this.metricText(462, 62, "Streak 0");
    this.tdText = this.metricText(22, 94, "TD 0");
    this.spiritLabel = this.metricText(this.scale.width - 288, 94, "School Spirit");
    this.spiritTrack = this.add.rectangle(this.scale.width - 158, 94, 188, 12, 0xffffff, 0.22);
    this.spiritFill = this.add.rectangle(this.scale.width - 252, 94, 22, 12, 0xffcc05, 1).setOrigin(0, 0.5);
    this.spiritTrackWidth = 188;

    this.hud.add([
      this.hudBg,
      this.hudTop,
      this.hudStripe,
      this.logo,
      this.modeText,
      this.scoreText,
      this.yardsText,
      this.timeText,
      this.streakText,
      this.tdText,
      this.spiritLabel,
      this.spiritTrack,
      this.spiritFill,
    ]);
    this.layoutHud(this.scale.width);
  }

  metricText(x, y, text) {
    return this.add.text(x, y, text, {
      fontFamily: "Arial Black, Arial",
      fontSize: "15px",
      color: "#ffffff",
    }).setOrigin(0, 0.5);
  }

  createTouchdownBanner() {
    this.touchdownBanner = this.add.text(this.scale.width / 2, this.fieldTop + 128, "TOUCHDOWN!", {
      fontFamily: "Arial Black, Arial",
      fontSize: "56px",
      color: "#ffcc05",
      stroke: "#022c66",
      strokeThickness: 9,
      align: "center",
    }).setOrigin(0.5).setDepth(40).setVisible(false);
  }

  drawField(delta) {
    const width = this.scale.width;
    const top = this.fieldTop;
    const bottom = this.fieldBottom;
    const fieldHeight = bottom - top;
    this.fieldOffset = (this.fieldOffset + delta * 0.045) % 96;

    this.fieldLayer.clear();
    this.fieldLayer.fillStyle(0x0f5127, 1);
    this.fieldLayer.fillRect(0, top, width, fieldHeight);

    this.fieldLayer.fillStyle(0x0b4722, 1);
    for (let y = top - 96 + this.fieldOffset; y < bottom + 96; y += 192) {
      this.fieldLayer.fillRect(0, y, width, 96);
    }

    this.fieldLayer.fillStyle(0x022c66, 1);
    this.fieldLayer.fillRect(0, top, width, ENDZONE_HEIGHT);
    this.fieldLayer.lineStyle(5, 0xffcc05, 0.9);
    this.fieldLayer.lineBetween(0, top + ENDZONE_HEIGHT, width, top + ENDZONE_HEIGHT);

    this.fieldLayer.lineStyle(2, 0xffffff, 0.45);
    for (let y = top + ENDZONE_HEIGHT + this.fieldOffset - 96; y < bottom + 96; y += 96) {
      this.fieldLayer.lineBetween(42, y, width - 42, y);
      this.fieldLayer.fillStyle(0xffffff, 0.55);
      for (let tick = 0; tick < 5; tick += 1) {
        const tickX = Phaser.Math.Linear(84, width - 84, tick / 4);
        this.fieldLayer.fillRect(tickX - 1, y - 10, 2, 20);
      }
    }

    this.fieldLayer.lineStyle(4, 0xffffff, 0.42);
    this.fieldLayer.lineBetween(30, top, 30, bottom);
    this.fieldLayer.lineBetween(width - 30, top, width - 30, bottom);
  }

  movePlayer(time) {
    const isSlowed = time < this.slowUntil;
    const speed = isSlowed ? 210 : 350;
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.keys.A.isDown) vx -= speed;
    if (this.cursors.right.isDown || this.keys.D.isDown) vx += speed;
    if (this.cursors.up.isDown || this.keys.W.isDown) vy -= speed;
    if (this.cursors.down.isDown || this.keys.S.isDown) vy += speed;

    if (vx !== 0 && vy !== 0) {
      vx *= 0.707;
      vy *= 0.707;
    }

    this.player.setVelocity(vx, vy);
  }

  updateProgress() {
    const runLength = Math.max(1, this.fieldBottom - (this.fieldTop + ENDZONE_HEIGHT) - 78);
    const progress = Phaser.Math.Clamp((this.fieldBottom - 62 - this.player.y) / runLength, 0, 1);
    this.yards = Math.round(progress * 100);

    if (!this.touchdownLock && this.player.y <= this.fieldTop + ENDZONE_HEIGHT - 2) {
      this.scoreTouchdown();
    }
  }

  updateObjectMotion() {
    this.defenders.children.iterate((defender) => {
      if (!defender) return;
      if (defender.y > this.fieldBottom + 58) {
        defender.art?.destroy();
        defender.destroy();
      }
    });

    this.powerups.children.iterate((powerup) => {
      if (!powerup) return;
      if (powerup.y > this.fieldBottom + 58) {
        powerup.art?.destroy();
        powerup.destroy();
      }
    });
  }

  seedObjects() {
    const lanes = [0.22, 0.38, 0.54, 0.7, 0.84];
    [0.28, 0.44, 0.6].forEach((progress, index) => {
      this.spawnDefender(lanes[index] * this.scale.width, this.fieldTop + this.fieldHeight * progress);
    });
    [0.35, 0.52, 0.72].forEach((progress, index) => {
      this.spawnPowerup(lanes[index + 1] * this.scale.width, this.fieldTop + this.fieldHeight * progress);
    });
  }

  spawnDefender(x = Phaser.Math.Between(74, this.scale.width - 74), y = this.fieldTop + ENDZONE_HEIGHT + 8) {
    const defender = this.physics.add.sprite(x, y, "hitbox");
    defender.setVisible(false);
    defender.setCircle(25);
    defender.setVelocityY(Phaser.Math.Between(130, 215));
    defender.body.setAllowGravity(false);
    defender.hitReady = true;
    this.defenders.add(defender);

    const art = this.add.container(x, y).setDepth(7);
    art.add([
      this.add.ellipse(0, 30, 72, 17, 0x000000, 0.2),
      this.add.rectangle(0, 0, 70, 48, 0xb91c1c).setStrokeStyle(4, 0xffffff),
      this.add.text(0, -6, "DODGE", { fontFamily: "Arial Black, Arial", fontSize: "11px", color: "#ffffff" }).setOrigin(0.5),
      this.add.text(0, 10, "DEF", { fontFamily: "Arial Black, Arial", fontSize: "16px", color: "#ffffff" }).setOrigin(0.5),
    ]);
    defender.art = art;
    defender.update = () => art.setPosition(defender.x, defender.y);
  }

  spawnPowerup(x = Phaser.Math.Between(64, this.scale.width - 64), y = this.fieldTop + ENDZONE_HEIGHT + 18) {
    const powerup = this.physics.add.sprite(x, y, "hitbox");
    powerup.setVisible(false);
    powerup.setCircle(24);
    powerup.setVelocityY(Phaser.Math.Between(110, 170));
    powerup.body.setAllowGravity(false);
    this.powerups.add(powerup);

    const art = this.add.container(x, y).setDepth(6);
    art.add([
      this.add.circle(0, 0, 29, 0xffcc05).setStrokeStyle(5, 0x046dff),
      this.add.text(0, -5, "MP", { fontFamily: "Arial Black, Arial", fontSize: "17px", color: "#022c66" }).setOrigin(0.5),
      this.add.text(0, 13, "POWER", { fontFamily: "Arial Black, Arial", fontSize: "8px", color: "#022c66" }).setOrigin(0.5),
    ]);
    powerup.art = art;
    this.tweens.add({ targets: art, scale: 1.12, duration: 420, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
    powerup.update = () => art.setPosition(powerup.x, powerup.y);
  }

  collectPowerup(player, powerup) {
    this.score += 150 + this.streak * 18;
    this.streak += 1;
    this.longestStreak = Math.max(this.longestStreak, this.streak);
    this.spirit = Phaser.Math.Clamp(this.spirit + 10, 0, 100);
    this.floatText(powerup.x, powerup.y, "+MP POWER", "#ffcc05");
    this.tweens.add({
      targets: powerup.art,
      scale: 1.8,
      alpha: 0,
      duration: 180,
      onComplete: () => powerup.art?.destroy(),
    });
    powerup.destroy();
  }

  hitDefender(player, defender) {
    if (!defender.hitReady) return;
    defender.hitReady = false;
    this.streak = Math.max(0, this.streak - 2);
    this.spirit = Phaser.Math.Clamp(this.spirit - 10, 0, 100);
    this.slowUntil = this.time.now + 950;
    this.cameras.main.shake(150, 0.01);
    this.cameras.main.flash(110, 225, 30, 30);
    this.floatText(player.x, player.y - 46, "HIT! SLOWED", "#ffffff", 20);
    this.tweens.add({
      targets: defender.art,
      alpha: 0,
      scale: 1.25,
      duration: 160,
      onComplete: () => defender.art?.destroy(),
    });
    defender.destroy();
  }

  scoreTouchdown() {
    this.touchdownLock = true;
    const touchdownBonus = 900 + this.streak * 45;
    this.touchdowns += 1;
    this.score += touchdownBonus;
    this.streak += 3;
    this.longestStreak = Math.max(this.longestStreak, this.streak);
    this.spirit = Phaser.Math.Clamp(this.spirit + 20, 0, 100);
    this.cameras.main.flash(260, 255, 204, 5);
    this.cameras.main.shake(210, 0.008);
    this.touchdownBanner.setVisible(true).setAlpha(1).setScale(0.88);
    this.tweens.add({ targets: this.touchdownBanner, scale: 1.08, duration: 220, yoyo: true, repeat: 1 });
    this.floatText(this.scale.width / 2, this.fieldTop + 186, `+${touchdownBonus} TD BONUS`, "#ffffff", 22);

    this.time.delayedCall(900, () => {
      this.touchdownBanner.setVisible(false);
      this.clearObjects();
      this.player.setPosition(this.scale.width / 2, this.fieldBottom - 62);
      this.seedObjects();
      this.touchdownLock = false;
    });
  }

  clearObjects() {
    this.defenders.children.iterate((defender) => defender?.art?.destroy());
    this.powerups.children.iterate((powerup) => powerup?.art?.destroy());
    this.defenders.clear(true, true);
    this.powerups.clear(true, true);
  }

  tickClock() {
    this.remaining -= 1;
    if (this.remaining <= 0) {
      this.scene.start("GameOverScene", {
        score: this.score,
        touchdowns: this.touchdowns,
        longestStreak: this.longestStreak,
        badges: this.getBadges(),
      });
    }
  }

  getBadges() {
    const badges = [];
    if (this.touchdowns >= 1) badges.push("Friday Night Hero");
    if (this.score >= 2000) badges.push("Stat Sheet Stuffer");
    if (this.longestStreak >= 8) badges.push("Clutch Performer");
    if (this.spirit >= 70 || this.touchdowns >= 2) badges.push("Rivalry Winner");
    return badges.length ? badges : ["Friday Night Grinder"];
  }

  updateHud() {
    this.scoreText.setText(`Score ${Math.round(this.score)}`);
    this.yardsText.setText(`Yards ${this.yards}`);
    this.timeText.setText(`Time ${Math.max(0, this.remaining)}`);
    this.streakText.setText(`Streak ${this.streak}`);
    this.tdText.setText(`TD ${this.touchdowns}`);
    this.spiritFill.width = this.spiritTrackWidth * (this.spirit / 100);

    this.defenders.children.iterate((defender) => defender?.update?.());
    this.powerups.children.iterate((powerup) => powerup?.update?.());
  }

  floatText(x, y, text, color, size = 20) {
    const item = this.add.text(x, y, text, {
      fontFamily: "Arial Black, Arial",
      fontSize: `${size}px`,
      color,
      stroke: "#022c66",
      strokeThickness: 5,
      align: "center",
    }).setOrigin(0.5).setDepth(45);
    this.tweens.add({
      targets: item,
      y: y - 56,
      alpha: 0,
      duration: 820,
      ease: "Cubic.easeOut",
      onComplete: () => item.destroy(),
    });
  }

  handleResize(gameSize) {
    this.updateFieldBounds();
    this.physics.world.setBounds(0, 0, gameSize.width, gameSize.height);
    this.player.body.setBoundsRectangle(new Phaser.Geom.Rectangle(30, this.fieldTop + 12, gameSize.width - 60, this.fieldHeight - 24));
    this.layoutHud(gameSize.width);
    this.endzoneText.setPosition(gameSize.width / 2, this.fieldTop + 36);
    this.touchdownBanner.setPosition(gameSize.width / 2, this.fieldTop + 128);
    this.player.setPosition(Phaser.Math.Clamp(this.player.x, 34, gameSize.width - 34), this.fieldBottom - 62);
  }

  layoutHud(width) {
    const compact = width < 760;

    this.hudBg.width = width;
    this.hudTop.width = width;
    this.hudStripe.width = width;
    this.modeText.setPosition(width - 18, 17);

    const metricFontSize = compact ? "12px" : "15px";
    [this.scoreText, this.yardsText, this.timeText, this.streakText, this.tdText, this.spiritLabel].forEach((item) => {
      item.setStyle({ fontSize: metricFontSize });
    });

    if (compact) {
      this.logo.setDisplaySize(96, 28);
      this.scoreText.setPosition(18, 55);
      this.yardsText.setPosition(width * 0.28, 55);
      this.timeText.setPosition(width * 0.52, 55);
      this.streakText.setPosition(width * 0.75, 55);
      this.tdText.setPosition(18, 88);
      this.spiritLabel.setPosition(88, 88);
      this.spiritTrackWidth = Math.max(105, width - 256);
      this.spiritTrack.setPosition(196 + this.spiritTrackWidth / 2, 88);
      this.spiritTrack.width = this.spiritTrackWidth;
      this.spiritFill.setPosition(196, 88);
      return;
    }

    this.logo.setDisplaySize(110, 32);
    this.scoreText.setPosition(22, 62);
    this.yardsText.setPosition(172, 62);
    this.timeText.setPosition(318, 62);
    this.streakText.setPosition(462, 62);
    this.tdText.setPosition(22, 94);
    this.spiritLabel.setPosition(width - 318, 94);
    this.spiritTrackWidth = 188;
    this.spiritTrack.setPosition(width - 126, 94);
    this.spiritTrack.width = this.spiritTrackWidth;
    this.spiritFill.setPosition(width - 220, 94);
  }
}
