import { useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { gameRoomRef, usersRef } from "../utlils/firebase";
import { PlayerContext } from "../utlils/PlayerContext";
// import RandomName from "./RandomName";

const GameMenu = () => {
  const { player, liveRoom, room, isLoading } = useContext(PlayerContext);
  const [gameMode, setGameMode] = useState("");

  useEffect(() => {
    if (room.roomUuid) {
      // set player isPlaying to true
      usersRef.doc(player.playerUuid).set({ isPlaying: true }, { merge: true });
      gameRoomRef
        .doc(room.roomUuid)
        .set({ ...room, gameMode }, { merge: true });
      const unsubscribe = gameRoomRef
        .doc(room.roomUuid)
        .onSnapshot((snap) => liveRoom(snap.data()));
      // TODO: update player to the server
      return () => unsubscribe();
    }
  }, [room.roomUuid]);

  // const newLiveRoom = () => {
  //   const roomUuid = shortid.generate();
  //   gameRoomRef.doc(roomUuid).set({ roomUuid, inUse: false });
  // };
  const handleGameMode = (mode) => {
    setGameMode(mode);
    // // search for an empty room
    const query = gameRoomRef.where("inUse", "==", false).limit(1);
    // TODO: if all rooms are full
    // make a live instance of the server
    query.get().then((item) => {
      item.forEach((doc) => liveRoom(doc.data()));
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
