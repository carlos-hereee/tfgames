import randomNumber from "random-number";
import copyText from "copy-to-clipboard";
import shortid from "shortid";

export const randomBoolean = () => Math.random() >= 0.5;
export const allCharactersSame = (s) => {
  let n = s.length;
  for (let i = 1; i < n; i++) if (s[i] !== s[0]) return false;
  return true;
};

export const games = [
  {
    name: "tictactoe",
    key: shortid.generate(),
    imageName: "tictactoeGameboard",
    defaultOptions: {
      size: { length: 3, width: 3 },
      gridSize: 9,
    },
  },
  {
    name: "snakeGame",
    key: shortid.generate(),
    imageName: "snakeGame",
    defaultOptions: {
      size: { length: 7, width: 7 },
      gridSize: 49,
      snakeSpeed: 1,
      lastRenderTime: 0,
      expansionRate: 1,
      newSegment: 0,
      inputDirection: { x: 0, y: 0 },
      lastInputDirection: [{ x: 0, y: 0 }],
    },
  },
];

export const randomNum = () => {
  return randomNumber({ min: 1000, max: 9999, integer: true });
};
export const copy = (txt) => copyText(txt);
