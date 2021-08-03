import randomNumber from "random-number";
import copyText from "copy-to-clipboard";
import shortid from "shortid";
import { useState } from "react/cjs/react.development";

export const randomBoolean = () => Math.random() >= 0.5;
export const allCharactersSame = (s) => {
  let n = s.length;
  for (let i = 1; i < n; i++) if (s[i] !== s[0]) return false;
  return true;
};
export const refereeReset = [
  { id: 0, x: 1, notes: "", winner: false },
  { id: 1, x: 2, notes: "", winner: false },
  { id: 2, x: 3, notes: "", winner: false },
  { id: 3, y: 1, notes: "", winner: false },
  { id: 4, y: 2, notes: "", winner: false },
  { id: 5, y: 3, notes: "", winner: false },
  { id: 6, z: 1, notes: "", winner: false },
  { id: 7, z: 2, notes: "", winner: false },
];
export const ticTacToeRoomStart = [
  { x: 1, y: 1, piece: null, id: shortid.generate() },
  { x: 1, y: 2, piece: null, id: shortid.generate() },
  { x: 1, y: 3, piece: null, id: shortid.generate() },
  { x: 2, y: 1, piece: null, id: shortid.generate() },
  { x: 2, y: 2, piece: null, id: shortid.generate() },
  { x: 2, y: 3, piece: null, id: shortid.generate() },
  { x: 3, y: 1, piece: null, id: shortid.generate() },
  { x: 3, y: 2, piece: null, id: shortid.generate() },
  { x: 3, y: 3, piece: null, id: shortid.generate() },
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
