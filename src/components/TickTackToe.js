import { useState } from "react";
import shortid from "shortid";
import { allCharactersSame } from "../utils/math";

const TickTackToe = () => {
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(false);
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
    { id: 0, x: 1, notes: "" },
    { id: 1, x: 2, notes: "" },
    { id: 2, x: 3, notes: "" },
    { id: 3, y: 1, notes: "" },
    { id: 4, y: 2, notes: "" },
    { id: 5, y: 3, notes: "" },
  ]);

  const turnSwap = { X: "O", O: "X" };

  const playerMove = (data) => {
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
      setWinner(player);
    }
    setLog([
      ...log,
      `Player: ${player} made a move its now ${turnSwap[player]}'s turn`,
    ]);
    setPlayer(turnSwap[player]);
  };
  return (
    <div>
      <div className="game">
        <div>
          <div className="tictactoe">
            {rooms.map((data) => (
              <button
                className={`room x-${data.x} y-${data.y}`}
                key={shortid.generate()}
                onClick={() => playerMove(data)}
                disabled={data.content}>
                {data.content}
              </button>
            ))}
          </div>
        </div>
        <div className="gamestatus">
          <div className="status">
            {referee.map((data) => (
              <div
                key={data.id}
                className={`referee x-${data.id > 2 ? "2" : "1"}`}>
                <p>Referee: {data.id}</p>
                <p>{data.notes}</p>
              </div>
            ))}
          </div>
          <div className="logger">
            {log.map((data) => (
              <p key={shortid.generate()}> {data}</p>
            ))}
          </div>
        </div>
      </div>
      {winner && <div> Winner Winner! </div>}
    </div>
  );
};
export default TickTackToe;
