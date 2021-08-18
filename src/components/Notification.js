import { useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";

const Notification = () => {
  const { error } = useContext(PlayerContext);
  return (
    <div className="alert alert-danger notification">
      <p className="text-center">{error}</p>
    </div>
  );
};

export default Notification;
