import { useContext } from "react";
import logo from "../assets/logo.svg";
import { AuthContext } from "../utlils/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a href="/" className="header-logo">
          <img src={logo} alt="logo - controller" />
          <h1 className="display-4">Take Five</h1>
        </a>
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
            <a className="nav-link" aria-current="page" href="/">
              Home
            </a>
            {user?.uid ? (
              <a className="nav-link" aria-current="page" href="/profile">
                Profile
              </a>
            ) : (
              <a className="nav-link" aria-current="page" href="/login">
                Sign In
              </a>
            )}
            {/* {useIsPlayerLoggedIn() ? (
              <>
                <a className="nav-link" href="/dashboard">
                  Dashboard
                </a>
                <a className="nav-link" href="/shop">
                  Shop
                </a>
              </>
            ) : (
              <a className="nav-link" href="/login">
                Login / Register
              </a>
            )} */}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
