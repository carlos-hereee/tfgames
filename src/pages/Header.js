import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { AuthContext } from "../utlils/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
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
            {user?.uid ? (
              <Link className="nav-link" aria-current="page" to="/dashboard">
                Dashboard
              </Link>
            ) : (
              <Link className="nav-link" aria-current="page" to="/login">
                Sign In
              </Link>
            )}
            {/* {useIsPlayerLoggedIn() ? (
              <>
                <Link className="nav-link" href="/dashboard">
                  Dashboardto</Link>
                <Link className="nav-link" href="/shop">
                  Shopto</Link>
              </>
            ) : (
              <Link className="nav-link" href="/login">
                Loginto Register
              </Link>
            )} */}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
