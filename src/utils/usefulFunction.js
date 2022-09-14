import randomNumber from "random-number";
import copyText from "copy-to-clipboard";
import shortid from "shortid";
import { useState } from "react";

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
    },
  },
];

export const randomNum = () => {
  return randomNumber({ min: 1000, max: 9999, integer: true });
};
export const copy = (txt) => copyText(txt);
export const isPlayer1 = (room, playerUuid) => {
  if (room.player1Uuid === playerUuid) return true;
  return false;
};
export const isPlayer2 = (room, playerUuid) => {
  if (room.player2Uuid === playerUuid) return true;
  return false;
};
export const useGameStatus = (initialState, newState) => {
  const [state, setState] = useState(initialState);
  setState({ ...state, newState });
  return [state];
};
