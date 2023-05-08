import { getIn, useFormik } from "formik";

const FieldQuantity = ({ data, max, change }) => {
  const labels = { max: "Max Price:", min: "Min Price:" };
  const { handleSubmit, handleBlur, handleChange, values, errors } = useFormik({
    initialValues: data.values,
    validationSchema: data.schema,
  });
  const handleOnChange = (e) => {
    handleChange(e);
    change(e);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {Object.keys(data.values).map((v) => (
        <div key={v} className="field">
          <label htmlFor={v}>
            {labels[v].charAt(0).toUpperCase() + labels[v].slice(1)}{" "}
            {errors[v] && <span className="required">{errors[v]}</span>}
          </label>
          <input
            type="number"
            autoComplete="on"
            max={max}
            min={1}
            name={v}
            value={getIn(values, v)}
            placeholder={v}
            onChange={handleOnChange}
            onBlur={handleBlur}
          />
        </div>
      ))}
    </form>
  );
};

export default FieldQuantity;
