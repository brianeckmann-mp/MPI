export const layers = [
  { id: "game", index: "01", label: "Game", meta: "Play by play" },
  { id: "players", index: "02", label: "Players", meta: "Performance" },
  { id: "highlights", index: "03", label: "Highlights", meta: "Every angle" },
  { id: "stats", index: "04", label: "Stats", meta: "Full context" },
  { id: "stories", index: "05", label: "Stories", meta: "Meaning" },
];

export const plays = [
  {
    id: 0, q: "Q1", clock: "8:41", score: [0, 7], team: "CEN", tag: "TOUCHDOWN",
    title: "Davis opens the scoring", detail: "13-yard run · 9 plays · 80 yards", accent: "#f3cc43",
    route: [[-34, -10], [-23, -8], [-12, -1], [-2, 6], [8, 9], [16, 5]],
  },
  {
    id: 1, q: "Q1", clock: "4:04", score: [0, 14], team: "CEN", tag: "PICK SIX",
    title: "Walk-Green changes the game", detail: "10-yard interception return", accent: "#f3cc43",
    route: [[12, -4], [5, -2], [-3, 3], [-13, 8], [-22, 11]],
  },
  {
    id: 2, q: "Q2", clock: "9:53", score: [7, 28], team: "MD", tag: "TOUCHDOWN",
    title: "Dixon-Wyatt gets Mater Dei moving", detail: "15-yard reception from Ryan Hopkins", accent: "#f6f6f2",
    route: [[-31, 8], [-20, 8], [-10, 5], [2, 0], [12, -7]],
  },
  {
    id: 3, q: "Q3", clock: "2:41", score: [30, 33], team: "MD", tag: "EXPLOSIVE PLAY",
    title: "A 71-yard lightning strike", detail: "Hopkins to Dixon-Wyatt · 0:09 drive", accent: "#ed1c24",
    route: [[-35, 10], [-26, 7], [-13, 2], [0, -5], [14, -10], [29, -8], [39, -2]],
  },
  {
    id: 4, q: "Q4", clock: "8:27", score: [36, 36], team: "CEN", tag: "GAME TIED",
    title: "Walk-Green from 36", detail: "Field goal · 11 plays · 42 yards", accent: "#f3cc43",
    route: [[-15, 0], [-5, 0], [7, 0], [20, 0]],
  },
  {
    id: 5, q: "Q4", clock: "2:27", score: [36, 43], team: "CEN", tag: "WINNING SCORE",
    title: "Davis finishes the drive", detail: "4-yard run · third touchdown", accent: "#f3cc43",
    route: [[21, -9], [25, -5], [30, 0], [37, 3], [41, 2]],
  },
];

export const players = [
  { number: "04", name: "Kayden Dixon-Wyatt", position: "WR · Mater Dei", primary: "165", unit: "REC YDS", sub: "5 REC · 2 TD", color: "#ed1c24" },
  { number: "10", name: "Ryan Hopkins", position: "QB · Mater Dei", primary: "261", unit: "PASS YDS", sub: "12/23 · 2 TD", color: "#ed1c24" },
  { number: "20", name: "Malaki Davis", position: "RB · Centennial", primary: "102", unit: "RUSH YDS", sub: "19 CAR · 3 TD", color: "#f3cc43" },
];

export const gameStats = [
  { label: "Total plays", md: 48, cen: 78, max: 90 },
  { label: "First downs", md: 14, cen: 19, max: 24 },
  { label: "Possession", md: 14.72, cen: 33.28, max: 48, display: ["14:43", "33:17"] },
  { label: "Penalty yards", md: 70, cen: 35, max: 80 },
];

export const stories = [
  { eyebrow: "GAME OF THE WEEK", title: "No. 21 Centennial stuns No. 1 Mater Dei, 43–36", meta: "Jordan Divens · Sep 12, 2025" },
  { eyebrow: "THE TURNING POINT", title: "Seven turnovers end a 21-game winning streak", meta: "Game analysis" },
  { eyebrow: "THE COMEBACK", title: "How Mater Dei scored 29 unanswered in one quarter", meta: "Drive-by-drive" },
];
