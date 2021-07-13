import { useState, useEffect, useContext } from "react";
import shortid from "shortid";
import { PlayerContext } from "../utlils/PlayerContext";
import { allCharactersSame, refereeReset } from "../utlils/usefulFunction";
import PlayerCard from "./PlayerCard";
import GameStatus from "./GameStatus";
import generate from "project-name-generator";
import { gameRoomRef } from "../utlils/firebase";

const TicTacToe = () => {
  const { room, player, playMove, game } = useContext(PlayerContext);
  const [winCondition, setWinCondition] = useState({
    win: false,
    tie: false,
    reset: false,
  });
  const [referee, setReferee] = useState([
    { id: 0, x: 1, notes: "", winner: false },
    { id: 1, x: 2, notes: "", winner: false },
    { id: 2, x: 3, notes: "", winner: false },
    { id: 3, y: 1, notes: "", winner: false },
    { id: 4, y: 2, notes: "", winner: false },
    { id: 5, y: 3, notes: "", winner: false },
    { id: 6, z: 1, notes: "", winner: false },
    { id: 7, z: 2, notes: "", winner: false },
  ]);

  useEffect(() => {
    // add player to room
    gameRoomRef.doc(room.roomUuid).set(
      {
        player1Name: player.playerName,
        player1Uuid: player.playerUuid,
        roomMessage: `Welcome to Take Five`,
        // invitationCode:
      },
      { merge: true }
    );
  }, []);

  console.log("room", room);
  const playerMove = (move) => {
    // if its the correct players turn
    // if (room.playerTurn && player.playerUuid) {
    // update the square
    playMove(room, player, move);
    // add the player move to the refs notes
    const refereeNotes = referee.filter((item) => {
      if (item.x === room.x || item.y === move.y) {
        item.notes = item.notes += player;
      }
      return item.x === move.x || item.y === move.y;
    });
    // check for winning move
    const winner = refereeNotes.filter((i) => {
      // check for length of 3 characters
      // check if all characters are the same
      return i.notes.length > 2 && allCharactersSame(i.notes);
    });
    if (winner.length > 0) {
      // setWinner(true);
      // setShow(true);
    }
    if (room.roomTurn === 8) {
      // setTie(true);
    }
    // setPlayer(turnSwap[player]);
  };
  const playAgain = () => {
    // reset everything
    // setTurn(0);
    // setShow(false);
    // setWinner(false);
    // setTie(false);
    // setReset(true);
    // setLog([...log, `Player: ${player} started a new game`]);
  };
  const player1 = {
    playerName: room.player1Name,
    playerWeapon: room.player1Weapon,
    playerUuid: room.player1Uuid,
  };
  const player2 = {
    playerName: room.player2Name,
    playerWeapon: room.player2Weapon,
    playerUuid: room.player2Uuid,
  };
  return (
    <div className="container">
      <div className="card-deck mb-3 text-center">
        <div className="card mb-4 p-1 shadow-sm">
          <h4 className="card-title">{room.roomMessage}</h4>
          <div className="tictactoe">
            {game?.map((item) => (
              <button
                className={`room x-${item.x} y-${item.y} `}
                key={shortid.generate()}
                onClick={() => playerMove(item)}
                // disabled={item.content}
              >
                {item.content}
              </button>
            ))}
          </div>
        </div>
        <PlayerCard player={player1} />
        <PlayerCard player={player2} />
        <GameStatus />
      </div>
    </div>
  );
};
export default TicTacToe;
