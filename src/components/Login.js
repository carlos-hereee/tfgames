import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GoogleSignButton } from "../utlils/firebase";

const Login = () => {
  const [canSeePassword, setCanSeePassword] = useState(false);
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values, actions) => {
        // signIn(values);
        actions.resetForm();
      }}>
      {({ errors }) => (
        <Form>
          <div className="form-group">
            {errors.username && (
              <div className="validate">{errors.username}</div>
            )}
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
          {errors.password && <div className="validate">{errors.password}</div>}
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
          <div className="d-flex justify-content-between">
            <GoogleSignButton />
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
