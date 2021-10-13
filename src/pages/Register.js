import { useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { PlayerContext } from "../utlils/PlayerContext";
import Notification from "../components/Notification";

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
const Register = () => {
  const { register, error } = useContext(PlayerContext);
  const [canSeePassword, setCanSeePassword] = useState(false);
  const [canSeeConfirmPassword, setCanConfirmSeePassword] = useState(false);
  return (
    <Formik
      initialValues={{ username: "", password: "", confirmPassword: "" }}
      onSubmit={({ username, password }, _) => register(username, password)}
      validationSchema={Schema}>
      <Form>
        <div className="form-group">
          {error && <Notification message={error} />}
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
              onClick={() => setCanConfirmSeePassword(!canSeeConfirmPassword)}>
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
  );
};
export default Register;
