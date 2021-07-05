const Header = () => (
  <header>
    <div className="jumbotron">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a href="/" className="navbar-brand">
          <h1 className="display-4">Take Five</h1>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active" aria-current="page" href="/">
              Home
            </a>
            <a class="nav-link" href="/profile">
              Profile
            </a>
            <a class="nav-link" href="/leaderboard">
              Leaderboard
            </a>
          </div>
        </div>
      </nav>
    </div>
  </header>
);
export default Header;
