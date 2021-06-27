import { useState } from "react";
import shortid from "shortid";
import Room from "./Room";

const TickTackToe = () => {
  const [start, setStart] = useState(false);
  const rooms = [
    { x: 1, y: 1, id: shortid.generate() },
    { x: 2, y: 1, id: shortid.generate() },
    { x: 3, y: 1, id: shortid.generate() },
    { x: 1, y: 2, id: shortid.generate() },
    { x: 2, y: 2, id: shortid.generate() },
    { x: 3, y: 2, id: shortid.generate() },
    { x: 1, y: 3, id: shortid.generate() },
    { x: 2, y: 3, id: shortid.generate() },
    { x: 3, y: 3, id: shortid.generate() },
  ];
  return (
    <div>
      <button type="button" onClick={() => setStart(!start)}>
        {start ? "Play Game" : "Reset Game"}
      </button>
      {rooms.map((data) => (
        <Room key={data.id} />
      ))}
    </div>
  );
};
export default TickTackToe;
