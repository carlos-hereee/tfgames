import { useState } from "react";
import shortid from "shortid";

const TickTackToe = () => {
  const turnSwap = { X: "O", O: "X" };
  const [player, setPlayer] = useState("X");
  const [log, setLog] = useState([]);
  const rooms = [
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

  const [referee, setReferee] = useState([
    { id: 0, x: 1, notes: [], winner: false },
    { id: 1, x: 2, notes: [], winner: false },
    { id: 2, x: 3, notes: [], winner: false },
    { id: 3, y: 1, notes: [], winner: false },
    { id: 4, y: 2, notes: [], winner: false },
    { id: 5, y: 3, notes: [], winner: false },
  ]);

  const playerMove = (data) => {
    data.content = player;
    // add the player move to the refs notes
    const refereeToUpdate = referee.filter((item) => {
      return item.x === data.x || item.y === data.y;
    });
    refereeToUpdate.forEach((item) => {
      item.notes.push(player);
    });
    setLog([
      ...log,
      `Player: ${player} made a move its now ${turnSwap[player]}'s turn`,
    ]);
    setPlayer(turnSwap[player]);
  };
  return (
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
