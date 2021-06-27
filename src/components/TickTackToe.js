import { useState } from "react";
import shortid from "shortid";
import { randomBoolean } from "../utils/math";
import Room from "./Room";

const TickTackToe = () => {
  const [start, setStart] = useState(false);
  const rooms = [
    { x: 1, y: 1, id: shortid.generate(), active: randomBoolean() },
    { x: 2, y: 1, id: shortid.generate(), active: randomBoolean() },
    { x: 3, y: 1, id: shortid.generate(), active: randomBoolean() },
    { x: 1, y: 2, id: shortid.generate(), active: randomBoolean() },
    { x: 2, y: 2, id: shortid.generate(), active: randomBoolean() },
    { x: 3, y: 2, id: shortid.generate(), active: randomBoolean() },
    { x: 1, y: 3, id: shortid.generate(), active: randomBoolean() },
    { x: 2, y: 3, id: shortid.generate(), active: randomBoolean() },
    { x: 3, y: 3, id: shortid.generate(), active: randomBoolean() },
  ];
  return (
    <div>
      <button type="button" onClick={() => setStart(!start)}>
        {start ? "Play Game" : "Reset Game"}
      </button>
      <div className="tictactoe">
        {rooms.map((data) => (
          <Room key={data.id} room={data} />
        ))}
      </div>
    </div>
  );
};
export default TickTackToe;
