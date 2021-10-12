/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import shortid from "shortid";
import { PlayerContext } from "../utlils/PlayerContext";
import { randomNum } from "../utlils/usefulFunction";
import GameInvitation from "./GameInvitation";
// import RandomName from "./RandomName";

const GameMenu = () => {
  const { player, liveRoom, room, isLoading } = useContext(PlayerContext);
  const [gameMode, setGameMode] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (room.roomUuid) {
      // set player isPlaying to true
      const roomData = {
        ...room,
        gameMode,
        invitationCode: room.invitationCode ? room.invitationCode : randomNum(),
      };
      const playerData = {
        ...player,
        isPlaying: true,
        isPlayingInRoom: room.roomUuid,
      };
      history.push(`/tictactoe/invite?code=${room.invitationCode}`);
    }
  }, [room.roomUuid]);

  const newLiveRoom = () => {
    const roomUuid = shortid.generate();
    liveRoom({ roomUuid, inUse: false });
  };
  const handleGameMode = (mode) => {
    setGameMode(mode);
    // // search for an empty room
    // TODO: if all rooms are full
    // make a live instance of the server
  };
  return (
    <div className="card">
      <div className="card-body text-center">
        <h3 className="card-title">Play TicTacToe</h3>
        {/* <div className="alert alert-warning" role="alert">
          Some game modes are under development
        </div> */}
        <div
          className="d-grid gap-2 col-6 m-auto"
          aria-label="play vs computer or friend">
          {/* <button
            className="btn btn-secondary btn-lg btn-block"
            disabled={isLoading}
            onClick={() => handleGameMode("Computer")}>
            Computer
          </button> */}
          {/* <button
            className="btn btn-secondary btn-lg btn-block"
            disabled={isLoading}
            onClick={() => handleGameMode("PVP")}>
            PVP
          </button> */}
          <button
            className="btn btn-primary btn-lg btn-block mb-3 m-auto"
            disabled={isLoading}
            onClick={() => handleGameMode("Friend")}>
            Play Friend
          </button>
        </div>
        <div className="w-50 m-auto">
          <GameInvitation />
        </div>
      </div>
    </div>
  );
};
export default GameMenu;
