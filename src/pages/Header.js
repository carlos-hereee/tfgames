import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="header-logo">
          <img src={logo} alt="logo - controller" />
          <a href="/" className="navbar-brand">
            <h1 className="display-4">Take Five</h1>
          </a>
        </div>
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
            <a className="nav-link" aria-current="page" href="/profile">
              Profile
            </a>
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
