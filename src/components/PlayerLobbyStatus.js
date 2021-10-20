import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlayerContext } from "../utlils/PlayerContext";
import { io } from "socket.io-client";
import { LobbyContext } from "../utlils/LobbyContext";
import generate from "project-name-generator";

export default function PlayerLobbyStatus({ data }) {
  const { player } = useContext(PlayerContext);
  const { addToLobbyLog } = useContext(LobbyContext);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [lobbyId, setLobbyId] = useState("");
  useEffect(() => {
    if (isRunning) {
      setSeconds(0);
      const id = window.setInterval(() => setSeconds((sec) => sec + 1), 1000);
      return () => window.clearInterval(id);
    }
  }, [isRunning]);
  return (
    <div className="card">
      <div className="lobby-buttons">
        {isRunning ? (
          <button
            type="button"
            className="btn btn-danger"
            // onClick={() => leaveLobby()}
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success"
            // onClick={() => joinLobby()}
          >
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
            <button className="btn btn-danger">Leave</button>
          </Link>
        </nav>
      )}
    </div>
  );
}
