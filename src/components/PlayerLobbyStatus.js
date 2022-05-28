import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { LobbyContext } from "../context/LobbyContext";

export default function PlayerLobbyStatus({ data }) {
  const { player } = useContext(PlayerContext);
  const { newGame, ticket, cancelTicket } = useContext(LobbyContext);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    if (isRunning) {
      setSeconds(0);
      const id = window.setInterval(() => setSeconds((sec) => sec + 1), 1000);
      return () => window.clearInterval(id);
    }
  }, [isRunning]);

  const handleReady = (cmd) => {
    setIsRunning(!isRunning);
    if (cmd === "cancel") {
      cancelTicket(ticket);
    }
    if (cmd === "ready") newGame({ player, game: data });
  };
  return (
    <div className="card">
      <div className="lobby-buttons">
        {ticket?.player?.uid === player.uid ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleReady("cancel")}>
            Cancel
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleReady("ready")}>
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
