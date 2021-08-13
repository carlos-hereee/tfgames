import { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utlils/firebase";

const Auth = ({ history }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      history.push("/dashboard");
    }
  }, [user]);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          {isLogin ? (
            <h3 className="card-title">Login</h3>
          ) : (
            <h3 className="card-title">Create New Account</h3>
          )}
        </div>
        <div className="card-body">{isLogin ? <Login /> : <Register />}</div>
        <div className="card-footer text-center">
          {isLogin ? (
            <button className="btn" onClick={() => setIsLogin(!isLogin)}>
              Dont have an account?
            </button>
          ) : (
            <button className="btn" onClick={() => setIsLogin(!isLogin)}>
              Already have an account?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Auth;
