import { Switch, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Homepage from "./pages/Homepage";
import TicTacToe from "./components/TicTacToe";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/home" component={Homepage} />
        <Route path="/tictactoe" component={TicTacToe} />
        <Route path="/profile" component={Profile} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
