import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { accessToken } from "../utils/axios";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="header-logo">
          <img src={logo} alt="logo - controller" />
          <h1 className="display-4">Take Five</h1>
        </Link>
        <button
          className="navbar-toggler btn"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" aria-current="page" to="/">
              Home
            </Link>
            {accessToken ? (
              <Link className="nav-link" aria-current="page" to="/dashboard">
                Dashboard
              </Link>
            ) : (
              <Link className="nav-link" aria-current="page" to="/login">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
