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
        <Form className="form-group">
          {errors.username && <div className="validate">{errors.username}</div>}
          <label htmlFor="username">Username </label>
          <Field
            className="form-control"
            type="text"
            name="username"
            required
          />
          {errors.password && <div className="validate">{errors.password}</div>}
          <label htmlFor="password">Password </label>
          <div className="password">
            <Field
              className="form-control"
              type={canSeePassword ? "text" : "password"}
              name="password"
              required
            />
            <button
              type="button"
              onClick={() => setCanSeePassword(!canSeePassword)}>
              {canSeePassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          <div className="password">
            <label htmlFor="password">Confirm password </label>
            <Field
              className="form-control"
              type={canSeeConfirmPassword ? "text" : "password"}
              name="password"
              required
            />
            <button
              type="button"
              onClick={() => setCanConfirmSeePassword(!canSeeConfirmPassword)}>
              {canSeeConfirmPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
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
