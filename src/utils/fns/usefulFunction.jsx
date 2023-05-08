import randomNumber from "random-number";
import copyText from "copy-to-clipboard";

export const randomBoolean = () => Math.random() >= 0.5;
export const allCharactersSame = (s) => {
  let n = s.length;
  for (let i = 1; i < n; i++) if (s[i] !== s[0]) return false;
  return true;
};

export const randomNum = () => {
  return randomNumber({ min: 1000, max: 9999, integer: true });
};
export const copy = (txt) => copyText(txt);
