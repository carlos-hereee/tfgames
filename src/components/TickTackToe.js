import { useState } from "react";
import shortid from "shortid";

const TickTackToe = () => {
  const turnSwap = { X: "O", O: "X" };
  const [player, setPlayer] = useState("X");
  const [log, setLog] = useState([]);
  const rooms = [
    { x: 1, y: 1, id: shortid.generate(), content: null },
    { x: 2, y: 1, id: shortid.generate(), content: null },
    { x: 3, y: 1, id: shortid.generate(), content: null },
    { x: 1, y: 2, id: shortid.generate(), content: null },
    { x: 2, y: 2, id: shortid.generate(), content: null },
    { x: 3, y: 2, id: shortid.generate(), content: null },
    { x: 1, y: 3, id: shortid.generate(), content: null },
    { x: 2, y: 3, id: shortid.generate(), content: null },
    { x: 3, y: 3, id: shortid.generate(), content: null },
  ];

  // check if you have a win
  const referee = [
    { id: 0, notes: [], winner: false },
    { id: 1, notes: [], winner: false },
    { id: 2, notes: [], winner: false },
    { id: 3, notes: [], winner: false },
    { id: 4, notes: [], winner: false },
    { id: 5, notes: [], winner: false },
  ];

  return (
    <div className="game">
      <div>
        <div className="tictactoe">
          {rooms.map((data) => (
            <button
              className={`room x-${data.x} y-${data.y}`}
              key={data.id}
              onClick={() => {
                setLog([
                  ...log,
                  `Player: ${player} made a move its now ${turnSwap[player]}'s turn`,
                ]);
                data.content = player;
                setPlayer(turnSwap[player]);
              }}
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
              <p>Room: {data.id}</p>
              {data.notes.map((item) => (
                <p>{item}</p>
              ))}
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
  );
};
export default TickTackToe;
