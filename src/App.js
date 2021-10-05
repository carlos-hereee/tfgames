import { Switch, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Homepage from "./pages/Homepage";
import TicTacToe from "./pages/TicTacToe";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import PrivateRoute from "./utlils/PriviteRoute";
import Auth from "./pages/Auth";

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/tictactoe" component={TicTacToe} />
        <Route path="/login" component={Auth} />
        {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
        {/* <Route path="/shop" component={Shop} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
