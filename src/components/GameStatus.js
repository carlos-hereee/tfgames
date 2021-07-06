import { useState } from "react";

const GameStatus = () => {
  // const x1 = rooms.filter((item) => {
  //   return item.x === 1;
  // });
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
  return (
    <div className="card mb-4 p-1 shadow-sm">
      <div className="row justify-content-center m-0">
        {referee.map((data) => (
          <div
            key={data.id}
            className="col-md-auto p-1 m-1 shadow-sm card-body referee">
            <h5 className="card-title">Referee: {data.id}</h5>
            <p className="card-text">{"Note: " + data.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default GameStatus;
