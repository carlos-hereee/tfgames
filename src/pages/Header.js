const Header = () => (
  <header>
    <div className="jumbotron">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a href="/" className="navbar-brand">
          <h1 className="display-4">Take Five</h1>
        </a>
        <button
          className="navbar-toggler"
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
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
            <a className="nav-link" href="/profile">
              Profile
            </a>
            <a className="nav-link" href="/leaderboard">
              Leaderboard
            </a>
          </div>
        </div>
      </nav>
    </div>
  </header>
);
export default Header;
