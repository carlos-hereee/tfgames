import { Route, Redirect } from "react-router-dom";
import { getToken } from "./axios";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        getToken() ? <Component {...props} /> : <Redirect to="login" />
      }
    />
  );
};
export default PrivateRoute;
