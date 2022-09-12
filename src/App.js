import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Lobby from "./pages/Lobby";
import Auth from "./pages/Auth";
import { AuthContext } from "./context/AuthContext";
import Loading from "./components/Loading";
import OnlineNav from "./components/OnlineNav";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="app">
      <Header />
      <OnlineNav />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Auth} />
        <Route path="/signup" component={Register} />
        <Route path="/lobby" component={Lobby} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/shop" component={Shop} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
