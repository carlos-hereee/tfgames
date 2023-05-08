import { getIn, useFormik } from "formik";
import Icons from "../../atoms/Icons";

const NoCaptchaForm = ({ data, submit, isHorizontal, type }) => {
  const label = {
    firstName: "First name",
    lastName: "Last name",
    streetAddress: "Street Address",
    email: "Email",
    phone: "Phone number",
    apt: "Apt/Suite",
    city: "City",
    state: "State",
    postalCode: "Postal code",
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm Password",
    search: "Search",
  };
  const placeholder = {
    firstName: "Peter..",
    lastName: "Griffin..",
    streetAddress: "123 Street..",
    email: "email@example.com",
    apt: "1234",
    city: "Narnia ..",
    state: "State..",
    postalCode: "56789",
    phone: "987-654-3210",
    username: "",
    password: "",
    confirmPassword: "",
    search: "Search..",
  };
  const { handleSubmit, handleBlur, handleChange, values, errors } = useFormik({
    initialValues: data.values,
    onSubmit: (e) => submit(e, true),
    validationSchema: data.schema,
  });
  const change = (data) => {
    handleChange(data);
    submit(data.target.value);
  };
  return (
    <form className="form filter-form" onSubmit={handleSubmit}>
      <div className={`form-fields ${isHorizontal && "horizontal-fields"}`}>
        {Object.keys(data.values).map((v) => (
          <div key={v} className="input-wrapper">
            <label htmlFor={v} className="label">
              <strong>
                {" "}
                {label[v]}: <br />
              </strong>
              {errors[v] && <span className="required">{errors[v]}</span>}
            </label>
            <input
              type={label[v]}
              autoComplete="on"
              name={v}
              value={getIn(values, v)}
              placeholder={placeholder[v]}
              onChange={type === "search" ? change : handleChange}
              onBlur={handleBlur}
              className="input"
            />
          </div>
        ))}
      </div>
      <button type="submit" className="btn-main">
        {type === "search" ? (
          <>
            <Icons name="save" />
            Save
          </>
        ) : (
          <>
            <Icons name="submit" />
            Confirm
          </>
        )}
      </button>
    </form>
  );
};
export default NoCaptchaForm;
