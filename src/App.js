import { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Homepage from "./pages/Homepage";
import TicTacToe from "./pages/TicTacToe";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import PrivateRoute from "./utlils/PrivateRoute";
import Register from "./pages/Register";
import Lobby from "./pages/Lobby";
import Auth from "./pages/Auth";
import { AuthContext } from "./utlils/AuthContext";
import GameMenu from "./components/GameMenu";
import { accessToken } from "./utlils/axios";
import Loading from "./components/Loading";
import { PlayerContext } from "./utlils/PlayerContext";

function App() {
  const { isLoading, getAccessToken } = useContext(AuthContext);
  const { getPlayer } = useContext(PlayerContext);
  useEffect(() => {
    if (accessToken) {
      getPlayer();
    } else {
      getAccessToken();
    }
  }, [accessToken]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="app">
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Auth} />
        <Route path="/signup" component={Register} />
        <Route path="/game" component={GameMenu} />
        <Route path="/lobby" component={Lobby} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        {/* <Route path="/shop" component={Shop} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
