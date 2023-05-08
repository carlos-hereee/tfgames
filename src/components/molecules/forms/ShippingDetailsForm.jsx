import { getIn, useFormik } from "formik";
import { useContext } from "react";
import { UserContext } from "../../../utils/context/UserContext";
import Icons from "../../atoms/Icons";

const FormShippingDetails = () => {
  const { shippingValues, shippingSchema, setShipping } = useContext(UserContext);
  const label = {
    firstName: "First name...",
    lastName: "Last name...",
    streetAddress: "Street Address...",
    apt: "Ap/Suite...",
    city: "City...",
    state: "State...",
    postalCode: "Postal code...",
  };
  const placeholder = {
    firstName: "Peter..",
    lastName: "Griffin..",
    streetAddress: "123 Street..",
    apt: "1234",
    city: "Narnia ..",
    state: "State..",
    postalCode: "56789",
  };
  const { handleSubmit, handleBlur, handleChange, values, errors } = useFormik({
    initialValues: { shippingValues },
    onSubmit: (e) => setShipping(e),
    validationSchema: shippingSchema,
  });

  return (
    <form className="form shipping-form" onSubmit={handleSubmit}>
      <div className="form-fields">
        {Object.keys(shippingValues).map((v) => (
          <div key={v} className="input-wrapper">
            <div className="label">
              <label htmlFor={v}>
                {label[v]} <br />
                {errors[v] && <span className="required">{errors[v]}</span>}
              </label>
            </div>
            <input
              type={label[v]}
              autoComplete="on"
              name={v}
              value={getIn(values, v)}
              placeholder={placeholder[v]}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input"
            />
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-submit">
        <Icons name="submit" /> Confirm
      </button>
    </form>
  );
};
export default FormShippingDetails;
