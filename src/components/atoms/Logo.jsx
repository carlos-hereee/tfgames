import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="industry brand" className="logo" />
    </Link>
  );
};

export default Logo;
