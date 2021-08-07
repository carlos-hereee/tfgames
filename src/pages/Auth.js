import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header d-flex justify-content-around align-items-center">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className="btn btn-secondary">
            <h3>Login</h3>
          </button>
          or
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className="btn btn-secondary">
            <h3>Register</h3>
          </button>
        </div>
        <div className="card-body">{isLogin ? <Login /> : <Register />}</div>
      </div>
    </div>
  );
};
export default Auth;
