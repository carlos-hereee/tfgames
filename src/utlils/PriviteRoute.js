import { Route, Redirect } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { PlayerContext } from "./PlayerContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { player } = useContext(PlayerContext);
  return (
    <Route
      {...rest}
      component={(props) =>
        player.isAMember ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
export default PrivateRoute;
