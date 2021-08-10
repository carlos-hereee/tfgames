import { Route, Redirect } from "react-router-dom";
import { useIsPlayerLoggedIn } from "./hooks";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useIsPlayerLoggedIn();
  return (
    <Route
      {...rest}
      component={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
export default PrivateRoute;
