import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PlayerLobbyStatus() {
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
  return (
    <div className="card">
      <div className="lobby-buttons">
        {isRunning ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setIsRunning(false)}>
            Cancel
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setIsRunning(true)}>
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
