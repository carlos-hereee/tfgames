import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { useContext } from "react";
import { AppContext } from "../../../utils/context/AppContext";

const Logo = () => {
  const { app } = useContext(AppContext);
  return (
    <Link to="/" className="logo-link">
      <img src={logo} alt="industry brand" className="logo" />
      <h2>{app.name}</h2>
    </Link>
  );
};

export default Logo;
