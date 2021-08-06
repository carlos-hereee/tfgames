import { Switch, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Homepage from "./pages/Homepage";
import TicTacToe from "./pages/TicTacToe";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import PrivateRoute from "./utlils/PriviteRoute";
import LogIn from "./components/Login";

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/tictactoe" component={TicTacToe} />
        <Route path="/login" component={LogIn} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/shop" component={Shop} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
