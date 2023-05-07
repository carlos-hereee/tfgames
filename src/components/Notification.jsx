import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Notification = () => {
  const { error } = useContext(AuthContext);
  return (
    <div className="alert alert-danger">
      <p className="text-center">{error}</p>
    </div>
  );
};

export default Notification;
