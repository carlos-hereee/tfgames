import { useState, useEffect, useContext } from "react";
import shortid from "shortid";
import { PlayerContext } from "../utlils/PlayerContext";
import {
  allCharactersSame,
  refereeReset,
  roomReset,
} from "../utlils/usefulFunction";
import PlayerCard from "./PlayerCard";
import GameStatus from "./GameStatus";

const turnSwap = { X: "O", O: "X" };
const TicTacToe = () => {
  const { room } = useContext(PlayerContext);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(false);
  const [tie, setTie] = useState(false);
  const [reset, setReset] = useState(false);
  const [log, setLog] = useState([]);
  const [rooms, setRooms] = useState([
    { x: 1, y: 1, content: null },
    { x: 2, y: 1, content: null },
    { x: 3, y: 1, content: null },
    { x: 1, y: 2, content: null },
    { x: 2, y: 2, content: null },
    { x: 3, y: 2, content: null },
    { x: 1, y: 3, content: null },
    { x: 2, y: 3, content: null },
    { x: 3, y: 3, content: null },
  ]);
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
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (reset) {
      setReferee(refereeReset);
      setRooms(roomReset);
      setReset(false);
    }
  }, [winner, reset]);

  const playerMove = (data) => {
    // increment the turn by 1
    setTurn(turn + 1);
    // update the square
    data.content = player;
    // add the player move to the refs notes
    const refereeNotes = referee.filter((item) => {
      if (item.x === data.x || item.y === data.y) {
        item.notes = item.notes += player;
      }
      return item.x === data.x || item.y === data.y;
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
    if (turn === 8) {
      setTie(true);
    }
    setLog([
      ...log,
      `Player: ${player} made a move its now ${turnSwap[player]}'s turn`,
    ]);
    setPlayer(turnSwap[player]);
  };
  const playAgain = () => {
    // reset everything
    setTurn(0);
    setShow(false);
    setWinner(false);
    setTie(false);
    setReset(true);
    setLog([...log, `Player: ${player} started a new game`]);
  };
  console.log("room", room);
  return (
    <div className="container">
      <div className="card-deck mb-3 text-center">
        <div className="card mb-4 p-1 shadow-sm">
          <div className={`tictactoe ${room.turn}`}>
            {rooms.map((data) => (
              <button
                className={`room x-${data.x} y-${data.y} `}
                key={shortid.generate()}
                onClick={() => playerMove(data)}
                disabled={data.content}>
                {data.content}
              </button>
            ))}
          </div>
        </div>
        <PlayerCard player={room.player1} />
        <PlayerCard player={room.player2} />
        <GameStatus />
      </div>
      <div className="card mb-4 p-1 shadow-sm">
        <div className="card overflow-auto logger">
          {log.map((data) => (
            <p key={shortid.generate()}> {data}</p>
          ))}
        </div>
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
