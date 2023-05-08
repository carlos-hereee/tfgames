import { Field, Form, Formik } from "formik";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../utils/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const { signIn, error, accessToken } = useContext(AuthContext);
  const [canSeePassword, setCanSeePassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken]);
  return (
    <section className="container">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Login</h3>
        </div>
        <div className="card-body">
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={({ username, password }, _) => signIn(username, password)}>
            <Form>
              <div className="form-group">
                <p>{error}</p>
                <label htmlFor="username">Username </label>
                <div className="input-group">
                  <Field
                    autoComplete="current-username"
                    type="text"
                    className="form-control"
                    name="username"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password </label>
                <div className="input-group">
                  <Field
                    autoComplete="current-password"
                    className="form-control"
                    type={canSeePassword ? "text" : "password"}
                    name="password"
                    required
                  />
                  <button
                    type="button"
                    className="input-group-prepend btn"
                    onClick={() => setCanSeePassword(!canSeePassword)}>
                    {canSeePassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} size="2x" />
                    ) : (
                      <FontAwesomeIcon icon={faEye} size="2x" />
                    )}
                  </button>
                </div>
              </div>
              <div className="">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="card-footer text-center">
          <Link to="signup">Create an account</Link>
        </div>
      </div>
    </section>
  );
};
export default Auth;
