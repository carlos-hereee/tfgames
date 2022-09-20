const ToggleBtn = ({ setToggle, toggle }) => (
  <button
    type="button"
    className="btn btn-dark"
    onClick={() => setToggle(!toggle)}>
    ...
  </button>
);
export default ToggleBtn;
