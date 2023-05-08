import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import OnlineNav from "../components/OnlineNav";
import { AuthContext } from "../utils/context/AuthContext";
import { AppContext } from "../utils/context/AppContext";

const Header = () => {
  const [isActive, setActive] = useState(false);
  const [isClose, setClose] = useState(false);
  // const { cart } = useContext(ServicesContext);
  const { menu, burger } = useContext(AppContext);

  // eslint-disable-next-line no-unused-vars
  useEffect(() => {
    const endAnimation = () => setClose(true);
    // TODO: close navigation is clicks outside container
    // const onClick = (event) => {
    //   // console.log("navRef.current", navRef.current);
    //   if (navRef.current && !navRef.current.contains(event.target)) {
    //     setClose(true);
    //   }
    // };
    document.addEventListener("animationend", endAnimation, true);
    // document.addEventListener("mousedown", onClick, true);
    return () => document.removeEventListener("animationend", endAnimation, true);
    // document.removeEventListener("mousedown", onClick, true);
  }, []);
  // useEffect(() => {
  //   const menuPayload = {
  //     accessoryCount: cart.filter((c) => c.isAccessory).length,
  //     servicesCount: cart.filter((c) => c.isBookable).length,
  //   };
  //   const burgerPayload = {
  //     name: isActive ? "x" : "burger",
  //     notification: cart.length,
  //   };
  //   updateBurger(burgerPayload);
  //   updateMenu(menuPayload);
  // }, [cart, isActive]);

  const handleClick = () => {
    setActive(!isActive);
  };

  return (
    <header>
      {/* <Logo /> */}
      <nav className="primary-navigation">
        <ul className="navigation">
          {menu.map((m) => (
            <Navlink data={m} key={m.uid} handleClick={handleClick} />
          ))}
        </ul>
      </nav>
      <nav className="mobile-navigation">
        <BurgerButton isBurger={isActive} burger={burger} click={handleClick} />
        <ul
          className="navigation"
          data-state={isActive ? "open" : isClose ? "closing" : "close"}>
          {menu.map((m) => (
            <Navlink data={m} key={m.uid} handleClick={handleClick} />
          ))}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
