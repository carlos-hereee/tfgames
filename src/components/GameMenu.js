import { useContext, useEffect } from "react";
import { gameRoomRef, usersRef } from "../utlils/firebase";
import { PlayerContext } from "../utlils/PlayerContext";
// import RandomName from "./RandomName";

const GameMenu = () => {
  const { player, liveRoom, room } = useContext(PlayerContext);

  useEffect(() => {
    if (room.roomUuid) {
      gameRoomRef.doc(room.roomUuid).set({ inUse: true }, { merge: true });
      // TODO: update player to the server
      // usersRef.doc(player.playerUuid).set({ isPlaying: true }, { merge: true });
    }
  }, [room.roomUuid]);

  const handleGameMode = (mode) => {
    const notInUseGameRoom = gameRoomRef.where("inUse", "==", false).limit(1);
    notInUseGameRoom.onSnapshot(
      (snap) => {
        snap.forEach((item) => liveRoom(mode, item.data()));
      },
      (err) => console.log("err", err)
    );
  };
  return (
    <div className="card">
      <div className="card-body text-center">
        <h3 className="card-title">Play</h3>
        {room.roomMessage}
        <div class="alert alert-danger" role="alert">
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
