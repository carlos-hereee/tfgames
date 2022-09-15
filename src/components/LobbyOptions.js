import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LobbyContext } from "../context/LobbyContext";
import CancelBtn from "./atoms/CancelBtn";

const ReadyBtn = ({ handleReady }) => (
  <button
    type="button"
    className="btn btn-success"
    onClick={() => handleReady("ready")}>
    Ready
  </button>
);
const ToogleBtn = ({ setToggle, toggle }) => (
  <button
    type="button"
    className="btn btn-dark"
    onClick={() => setToggle(!toggle)}>
    ...
  </button>
);

const LobbyOptions = ({ name }) => {
  const { player } = useContext(AuthContext);
  const { newGame, ticket, cancelTicket, clock, options } =
    useContext(LobbyContext);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleReady = (cmd) => {
    if (cmd === "cancel") cancelTicket(ticket);
    if (cmd === "ready") newGame({ player, name, options });
  };
  return (
    <div className="card">
      <div className="lobby-buttons">
        {ticket?.lobbyId ? (
          <CancelBtn handleReady={handleReady} />
        ) : (
          <ReadyBtn handleReady={handleReady} />
        )}
        <ToogleBtn toggle={toggleMenu} setToggle={setToggleMenu} />
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
};
export default LobbyOptions;
