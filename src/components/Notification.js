import { useContext } from "react";
import shortid from "shortid";
import { PlayerContext } from "../utlils/PlayerContext";

const Notification = () => {
  const { error } = useContext(PlayerContext);
  return (
    error.length > 0 &&
    error?.map((i) => (
      <div className="alert alert-danger notification" key={shortid.generate()}>
        <p className="text-center">{i}</p>
      </div>
    ))
  );
};

export default Notification;
