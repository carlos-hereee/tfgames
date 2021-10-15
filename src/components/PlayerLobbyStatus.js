import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlayerContext } from "../utlils/PlayerContext";
import { io } from "socket.io-client";

export default function PlayerLobbyStatus({ data }) {
  const { player } = useContext(PlayerContext);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  let socket;
  socket = io("http://localhost:1200");
  const enterRoomData = {
    player: player,
    gameName: data,
  };
  useEffect(() => {
    if (isRunning) {
      setSeconds(0);
      const id = window.setInterval(() => setSeconds((sec) => sec + 1), 1000);
      return () => window.clearInterval(id);
    }
  }, [isRunning]);
  useEffect(() => {
    socket.on("message", (message) => {
      console.log("message", message);
    });
  }, []);
  const joinLobby = () => {
    setIsRunning(true);
    socket.emit("join", enterRoomData, (cb) => {
      console.log("cb", cb);
    });
  };
  const leaveLobby = () => {
    setIsRunning(false);
    socket.emit("leave");
    socket.off();
  };

  return (
    <div className="card">
      <div className="lobby-buttons">
        {isRunning ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => leaveLobby()}>
            Cancel
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => joinLobby()}>
            Ready
          </button>
        )}
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => setToggleMenu(!toggleMenu)}>
          ...
        </button>
      </div>
      <p>Elapsed time: {seconds}</p>
      {toggleMenu && (
        <nav className="lobby-toggle-menu">
          <Link to="/">
            <button className="btn btn-danger">Quit</button>
          </Link>
        </nav>
      )}
    </div>
  );
}
