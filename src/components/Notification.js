import { useContext } from "react";
import shortid from "shortid";
import { PlayerContext } from "../utlils/PlayerContext";

const Notification = () => {
  const { error } = useContext(PlayerContext);
  return (
    <div className="alert alert-danger">
      <p key={shortid.generate()} className="text-center">
        {error}
      </p>
    </div>
  );
};

export default Notification;
