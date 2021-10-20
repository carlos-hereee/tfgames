import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { PlayerContext } from "../context/PlayerContext";
import { LobbyContext } from "../context/LobbyContext";

export default function PlayerLobbyStatus({ data }) {
  // const { player } = useContext(PlayerContext);
  const { startSearch } = useContext(LobbyContext);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isPlayer1, setIsPlayer1] = useState(false);

  useEffect(() => {
    if (isRunning) {
      setSeconds(0);
      const id = window.setInterval(() => setSeconds((sec) => sec + 1), 1000);
      return () => window.clearInterval(id);
    }
  }, [isRunning]);
  const player1 = {
    nickname: "player1",
    uid: "thi-is-player1-uuid",
    lobbyId: "fcf801eb-3c78-4d55-999a-c2812c2dbd50",
    lookingForOpponent: true,
  };
  const player2 = {
    nickname: "second player",
    uid: "2222222222",
    lobbyId: "",
    lookingForOpponent: true,
  };
  const game = {
    gameName: data,
  };
  return (
    <div className="card">
      <button
        className={`mb-2 btn  ${isPlayer1 ? "btn-primary" : "btn-secondary"} `}
        onClick={() => setIsPlayer1(!isPlayer1)}>
        {isPlayer1 ? "player1" : "player2"}
      </button>
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
            onClick={() =>
              startSearch({ player: isPlayer1 ? player1 : player2, game })
            }>
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
