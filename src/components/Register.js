import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [canSeePassword, setCanSeePassword] = useState(false);

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
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
          <button type="submit">
            {/* {!isLoading ? "Sign In" : "spinner "} */}
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default Register;
