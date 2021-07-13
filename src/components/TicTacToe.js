import { useState, useEffect, useContext } from "react";
import shortid from "shortid";
import { PlayerContext } from "../utlils/PlayerContext";
import { allCharactersSame, refereeReset } from "../utlils/usefulFunction";
import PlayerCard from "./PlayerCard";
import GameStatus from "./GameStatus";

const TicTacToe = () => {
  const { room, player, playMove, game } = useContext(PlayerContext);
  const [winner, setWinner] = useState(false);
  const [tie, setTie] = useState(false);
  const [reset, setReset] = useState(false);
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
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reset) {
      setReferee(refereeReset);
      // setRooms(roomReset);
      setReset(false);
    }
  }, [winner, reset]);

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
      setWinner(true);
      setShow(true);
    }
    if (room.roomTurn === 8) {
      setTie(true);
    }
    // setPlayer(turnSwap[player]);
  };
  const playAgain = () => {
    // reset everything
    // setTurn(0);
    setShow(false);
    setWinner(false);
    setTie(false);
    setReset(true);
    // setLog([...log, `Player: ${player} started a new game`]);
  };
  return (
    <div className="container">
      <div className="card-deck mb-3 text-center">
        <div className="card mb-4 p-1 shadow-sm">
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
        <PlayerCard player={player} />
        <PlayerCard player={player} />
        <GameStatus />
      </div>
      <div
        className={show ? "modal d-block" : "modal d-none"}
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                YOU WON!
              </h5>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => playAgain()}>
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={tie ? "modal d-block" : "modal d-none"}
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">TIE</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => playAgain()}>
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TicTacToe;
