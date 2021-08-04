import { Switch, Route } from "react-router-dom";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Homepage from "./pages/Homepage";
import TicTacToe from "./pages/TicTacToe";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import { useContext } from "react/cjs/react.development";
import { PlayerContext } from "./utlils/PlayerContext";

function App() {
  const { player } = useContext(PlayerContext);
  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="card mb-3">
          <div className="card-body d-flex">
            <FontAwesomeIcon icon={faCoins} size="3x" />
            <p>{player.coins}</p>
          </div>
        </div>
      </div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/home" component={Homepage} />
        <Route path="/tictactoe" component={TicTacToe} />
        <Route path="/profile" component={Profile} />
        <Route path="/shop" component={Shop} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
