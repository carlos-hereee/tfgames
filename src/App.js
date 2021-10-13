import { Switch, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Homepage from "./pages/Homepage";
import TicTacToe from "./pages/TicTacToe";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import PrivateRoute from "./utlils/PriviteRoute";
import Lobby from "./pages/Lobby";
import Auth from "./pages/Auth";
import { useEffect, useState } from "react";
import { accessToken, axiosWithOutAuth, setAccessToken } from "./utlils/axios";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosWithOutAuth.post("/users/refresh-token").then(({ data }) => {
      setLoading(false);
      setAccessToken(data.accessToken);
    });
  }, []);
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/lobby" component={Lobby} />
        <Route path="/login" component={Auth} />
        {/* <Route path="/login" component={Auth} /> */}
        {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
        {/* <Route path="/shop" component={Shop} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
