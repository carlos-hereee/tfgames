/*
Find out if the player has made a winning move

Input is an array that tells the status of the game
return the game result: win, draw, lose, or continue with the game 

Understand: 
  Check the game state of tictactoe to check for game results, 
  There's only 4 posible outcomes a game state where the player: 
  -win: A win if the player manages to get 3 squares in a row/column/diagnol  
  -lose: A lose if the there is the oponent wins
  -draw: A draw if number of turns === total possible turns  
  -continues: The game continues if number of turns < total possible turns 
              && theres no winner

Plan: 
  keep track of the possible winners
  traverse the array
  if the room has a piece
   add to possible winners 
  if number of turns === total possible turns its a draw
  if the number of turns < total possible turns && theres not winner the game continues 
  
*/
export const gameResult = (game, turn, weapon) => {
  //  keep track of the possible winners
  const possibleWinners = {
    x1: 0,
    x2: 0,
    x3: 0,
    y1: 0,
    y2: 0,
    y3: 0,
    diagnolTopBot: 0,
    diagnolBotTop: 0,
  };
  // if number of turns === total possible turns its a draw
  // if (turn > 8) return { result: "draw" };
  // traverse the array
  game.forEach((room) => {
    // if its the players move add to possible winners
    if (room.piece === weapon) {
      if (room.x === 1) possibleWinners.x1 += 1;
      if (room.x === 2) possibleWinners.x2 += 1;
      if (room.x === 3) possibleWinners.x3 += 1;
      if (room.y === 1) possibleWinners.y1 += 1;
      if (room.y === 2) possibleWinners.y2 += 1;
      if (room.y === 3) possibleWinners.y3 += 1;
      // handle top to bottom diagnol corners
      if (
        (room.x === 1 && room.y === 1) ||
        (room.x === 2 && room.y === 2) ||
        (room.x === 3 && room.y === 3)
      ) {
        possibleWinners.diagnolTopBot += 1;
      }
      // handle bottom to top diagnol corners
      if (
        (room.x === 1 && room.y === 3) ||
        (room.x === 3 && room.y === 1) ||
        (room.x === 2 && room.y === 2)
      ) {
        possibleWinners.diagnolBotTop += 1;
      }
    }
  });
  // if any count === 3 then theres a winner
  const winnerArr = Object.values(possibleWinners).filter((item) => item === 3);
  if (winnerArr.length > 0) return { result: "winner" };
  // if the number of turns < total possible turns && theres not winner the game continues
  return { result: "continue" };
};
