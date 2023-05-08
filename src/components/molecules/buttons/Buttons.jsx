// import Icons from "../../icons/Icons";
// import NotificationCount from "../SetNotificationCount";

const Buttons = ({ name, handleClick, notification, size }) => {
  return (
    <button type="button" onClick={handleClick} className={`btn-${name} btn-icons`}>
      {/* <Icons name={n} size={size} /> */}
      <span className="icon-label">{name[0].toUpperCase() + name.substring(1)}</span>
      {/* <NotificationCount count={notification} /> */}
    </button>
  );
};

export default Buttons;
