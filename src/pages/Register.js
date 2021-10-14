import { useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { PlayerContext } from "../utlils/PlayerContext";
import { Link } from "react-router-dom";
import { getToken } from "../utlils/axios";
import { AuthContext } from "../utlils/AuthContext";

const Schema = Yup.object().shape({
  password: Yup.string().required("This field is required"),
  changepassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
});
const Register = ({ history }) => {
  const { register, signUpError } = useContext(AuthContext);
  const [canSeePassword, setCanSeePassword] = useState(false);
  const [canSeeConfirmPassword, setCanConfirmSeePassword] = useState(false);
  if (getToken()) {
    history.push("/dashboard");
  }
  return (
    <section className="auth">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Create an Account</h3>
        </div>
        <div className="card-body">
          <Formik
            initialValues={{ username: "", password: "", confirmPassword: "" }}
            onSubmit={({ username, password }, _) =>
              register(username, password)
            }
            validationSchema={Schema}>
            <Form>
              <div className="form-group">
                <p>{signUpError}</p>
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
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-group">
                  <Field
                    className="form-control"
                    type={canSeeConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                  />
                  <button
                    type="button"
                    className="input-group-prepend btn"
                    onClick={() =>
                      setCanConfirmSeePassword(!canSeeConfirmPassword)
                    }>
                    {canSeeConfirmPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} size="2x" />
                    ) : (
                      <FontAwesomeIcon icon={faEye} size="2x" />
                    )}
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-center flex-column">
                <button type="submit" className="btn btn-primary w-100 m-auto">
                  Register
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="card-footer text-center">
          <Link to="login">Already have an account?</Link>
        </div>
      </div>
    </section>
  );
};
export default Register;
