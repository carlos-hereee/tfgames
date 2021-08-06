import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function LogIn() {
  const [canSeePassword, setCanSeePassword] = useState(false);

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, actions) => {
          // signIn(values);
          actions.resetForm();
        }}>
        {({ errors, touched }) => (
          <Form className="form">
            {errors.username && touched.username && (
              <div className="validate">{errors.username}</div>
            )}
            <label>Username </label>
            <Field type="text" name="username" required />
            {errors.password && touched.password && (
              <div className="validate">{errors.password}</div>
            )}
            <label>Password </label>
            <div className="password">
              <Field
                type={canSeePassword ? "text" : "password"}
                name="password"
                required
              />
              <button
                type="button"
                onClick={() => setCanSeePassword(!canSeePassword)}>
                <FontAwesomeIcon icon={faEye} />
              </button>
            </div>
            <button type="submit">
              {/* {!isLoading ? "Sign In" : "spinner "} */}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
