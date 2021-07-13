import { useContext, useEffect } from "react";
import { gameRoomRef } from "../utlils/firebase";
import { PlayerContext } from "../utlils/PlayerContext";
// import RandomName from "./RandomName";

const GameMenu = () => {
  const { player, liveRoom, room, enterRoom, isLoading } =
    useContext(PlayerContext);

  // useEffect(() => {
  //   if (room.roomUuid) {
  //     gameRoomRef
  //       .doc(room.roomUuid)
  //       .set({ gameMode, inUse: true }, { merge: true });
  //     // TODO: update player to the server
  //     // usersRef.doc(player.playerUuid).set({ isPlaying: true }, { merge: true });
  //   }
  // }, [room?.roomUuid]);

  // const newLiveRoom = () => {
  //   const roomUuid = shortid.generate();
  //   gameRoomRef.doc(roomUuid).set({ roomUuid, inUse: false });
  // };
  const handleGameMode = (mode) => {
    // // search for an empty room
    const query = gameRoomRef.where("inUse", "==", false).limit(1);
    // TODO: if all rooms are full
    // make a live instance of the server
    query.onSnapshot((snap) => {
      snap.forEach((doc) => liveRoom(doc.data(), player, mode));
    });
  };
  console.log("room", room);
  console.log("player", player);
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
            disabled={isLoading}
            onClick={() => handleGameMode("Computer")}>
            Computer
          </button>
          <button
            className="btn btn-secondary btn-lg btn-block"
            disabled={isLoading}
            onClick={() => handleGameMode("PVP")}>
            PVP
          </button>
          <button
            className="btn btn-primary btn-lg btn-block"
            disabled={isLoading}
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
