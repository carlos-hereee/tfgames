import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [canSeePassword, setCanSeePassword] = useState(false);
  const [canSeeConfirmPassword, setCanConfirmSeePassword] = useState(false);
  return (
    <Formik
      initialValues={{ username: "", password: "", confirmPassword: "" }}
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
                className="input-group-prepend"
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
            <label htmlFor="password">Confirm password </label>
            <div className="input-group">
              <Field
                className="form-control"
                type={canSeeConfirmPassword ? "text" : "password"}
                name="password"
                required
              />
              <button
                type="button"
                className="input-group-prepend"
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
          <button type="submit" className="btn btn-primary">
            Register In With Google
          </button>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default Register;
