// import React from "react";
import { Fragment, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Lobby from "./pages/Lobby";
import Auth from "./pages/Auth";
import { AuthContext } from "./utils/context/AuthContext";
import Loading from "./components/Loading";
import PrivateRoute from "./utils/fns/PrivateRoute";
import { GameContext } from "./utils/context/GameContext";
import Games from "./components/Games";

function App() {
  const { isLoading } = useContext(AuthContext);
  const { gameStart } = useContext(GameContext);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="app">
      {!gameStart && <Header />}
      <Fragment>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/games" element={<Games />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            {/* <Route path */}
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          {/* <PrivateRoute path="/shop" element={<Shop />} /> */}
        </Routes>
      </Fragment>
      <Footer />
    </div>
  );
}

export default App;
