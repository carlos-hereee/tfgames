import { Field, Form, Formik } from "formik";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { accessToken } from "../utils/axios";

const Auth = ({ history }) => {
  const { signIn, error } = useContext(AuthContext);
  const [canSeePassword, setCanSeePassword] = useState(false);
  if (accessToken) {
    history.push("/dashboard");
  }
  return (
    <section className="auth">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Login</h3>
        </div>
        <div className="card-body">
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={({ username, password }, _) =>
              signIn(username, password, history)
            }>
            <Form>
              <div className="form-group">
                <p>{error}</p>
                <label htmlFor="username">Username </label>
                <div className="input-group">
                  <Field
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
              <div className="d-flex justify-content-center flex-column">
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
