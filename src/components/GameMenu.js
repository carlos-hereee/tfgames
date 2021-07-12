import { useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { gameRoomRef } from "../utlils/firebase";
import { PlayerContext } from "../utlils/PlayerContext";
import shortid from "shortid";
// import RandomName from "./RandomName";

const GameMenu = () => {
  const { player, liveRoom, room } = useContext(PlayerContext);
  const [gameMode, setGameMode] = useState("");

  useEffect(() => {
    if (room.roomUuid) {
      gameRoomRef
        .doc(room.roomUuid)
        .set({ gameMode, inUse: true }, { merge: true });
      // TODO: update player to the server
      // usersRef.doc(player.playerUuid).set({ isPlaying: true }, { merge: true });
    }
  }, [room?.roomUuid]);

  const newLiveRoom = () => {
    const roomUuid = shortid.generate();
    gameRoomRef.doc(roomUuid).set({ gameMode, roomUuid, inUse: false });
    liveRoom();
  };
  const handleGameMode = (mode) => {
    setGameMode(mode);
    // make a live instance when the game mode is chaged
    const notInUseGameRoom = gameRoomRef.where("inUse", "==", false).limit(1);
    notInUseGameRoom.get().then((room) => {
      if (room.empty) {
        // make a new live room if they are all in use
        newLiveRoom();
      } else {
        // create live instance
        liveRoom();
      }
    });
  };

  return (
    <div className="card">
      <div className="card-body text-center">
        <h3 className="card-title">Play</h3>
        <div class="alert alert-warning" role="alert">
          Some game modes are under development
        </div>
        <div
          className="d-grid gap-2 col-6 mx-auto"
          aria-label="play vs computer or friend">
          <button
            className="btn btn-secondary btn-lg btn-block"
            disabled
            onClick={() => handleGameMode("Computer")}>
            Computer
          </button>
          <button
            className="btn btn-secondary btn-lg btn-block"
            onClick={() => handleGameMode("PVP")}>
            PVP
          </button>
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={() => handleGameMode("Friend")}>
            Friend
          </button>
        </div>
      </div>
      {/* <RandomName /> */}
    </div>
  );
};
export default GameMenu;
