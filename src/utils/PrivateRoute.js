import { Route, Redirect } from "react-router-dom";
import { accessToken } from "./axios";

const PrivateRoute = ({ component: Component, ...rest }) => {
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
