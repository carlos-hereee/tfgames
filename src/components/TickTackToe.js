import { useState } from "react";
import shortid from "shortid";

const gameboard = [
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
const TickTackToe = () => {
  const turnSwap = { X: "O", O: "X" };
  const [player, setPlayer] = useState("X");
  const [rooms, setRooms] = useState(gameboard);

  return (
    <div className="tictactoe">
      {rooms.map((data) => (
        <button
          className={`room x-${data.x} y-${data.y}`}
          key={data.id}
          onClick={() => {
            data.content = player;
            setPlayer(turnSwap[player]);
          }}
          disabled={data.content}>
          {data.content}
        </button>
      ))}
    </div>
  );
};
export default TickTackToe;
