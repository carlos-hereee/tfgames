import Icons from "../../atoms/Icons";
import SetNotificationCount from "../SetNotificationCount";

const BurgerButton = ({ isBurger, burger, click }) => {
  return (
    <button
      type="button"
      onClick={click}
      className={`${isBurger ? "x" : "burger"} btn-icons`}
      aria-controls="primary-navigation"
      aria-expanded={isBurger === "x"}
      aria-label="menu">
      <Icons name={isBurger ? "x" : "burger"} size="2x" />
      <SetNotificationCount count={burger.notification} />
    </button>
  );
};

export default BurgerButton;
