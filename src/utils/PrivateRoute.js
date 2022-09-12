import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { accessToken } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      component={(props) =>
        accessToken ? <Component {...props} /> : <Redirect to="login" />
      }
    />
  );
};
export default PrivateRoute;
