import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { LobbyContext } from "../context/LobbyContext";

export default function PlayerLobbyStatus({ data }) {
  const { player } = useContext(PlayerContext);
  const { newGame, ticket, cancelTicket, clock } = useContext(LobbyContext);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleReady = (cmd) => {
    if (cmd === "cancel") cancelTicket(ticket);
    if (cmd === "ready") newGame({ player, game: data });
  };
  return (
    <div className="card">
      <div className="lobby-buttons">
        {ticket?.lobbyId ? (
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
      <p>Elapsed time: {clock.seconds}</p>
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
