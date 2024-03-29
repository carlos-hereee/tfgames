import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/context/AuthContext";
import { LobbyContext } from "../utils/context/LobbyContext";
import CancelBtn from "./atoms/buttons/CancelBtn";
import ReadyBtn from "./atoms/buttons/ReadyBtn";
import ToggleBtn from "./atoms/buttons/ToggleBtn";

const LobbyOptions = ({ name }) => {
  const { player } = useContext(AuthContext);
  const { newGame, ticket, cancelTicket, clock, options } = useContext(LobbyContext);
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="lobby-options">
      <div className="lobby-buttons">
        {ticket?.lobbyId ? (
          <CancelBtn click={() => cancelTicket(ticket)} />
        ) : (
          <ReadyBtn click={() => newGame({ player, name, options })} />
        )}
        <ToggleBtn toggle={toggleMenu} setToggle={setToggleMenu} />
      </div>
      <p>Elapsed time: {clock.seconds}</p>
      {toggleMenu && (
        <nav className="lobby-toggle-menu">
          <Link to="/" className="btn-link">
            <button className="btn btn-main">Leave</button>
          </Link>
        </nav>
      )}
    </div>
  );
};
export default LobbyOptions;
