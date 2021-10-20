import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Notification = () => {
  const { error } = useContext(PlayerContext);
  return (
    <div className="alert alert-danger">
      <p className="text-center">{error}</p>
    </div>
  );
};

export default Notification;
