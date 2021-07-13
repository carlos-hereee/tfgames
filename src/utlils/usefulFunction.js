import randomNumber from "random-number";
import copyText from "copy-to-clipboard";

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
export const roomReset = [
  { x: 1, y: 1, content: null },
  { x: 2, y: 1, content: null },
  { x: 3, y: 1, content: null },
  { x: 1, y: 2, content: null },
  { x: 2, y: 2, content: null },
  { x: 3, y: 2, content: null },
  { x: 1, y: 3, content: null },
  { x: 2, y: 3, content: null },
  { x: 3, y: 3, content: null },
];
export const invitationCode = () => {
  return randomNumber({ min: 1000, max: 9999, integer: true });
};
export const copy = (txt) => {
  console.log(
    "copyText()",
    copyText(txt, {
      debug: true,
      message: "Press #{key} to copy",
    })
  );
};
