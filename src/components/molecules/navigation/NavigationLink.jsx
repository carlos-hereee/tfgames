import { Link } from "react-router-dom";

const NavigationLink = ({ path, children }) => {
  return (
    <Link to={path} className="nav-link">
      {children}
    </Link>
  );
};

export default NavigationLink;
