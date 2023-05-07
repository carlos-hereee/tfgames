import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
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
import PrivateRoute from "./utils/PrivateRoute";
import { GameContext } from "./context/GameContext";

function App() {
  const { isLoading } = useContext(AuthContext);
  const { gameStart } = useContext(GameContext);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="app">
      {!gameStart && <Header />}
      <Routes>
        <Route exact path="/" element={Homepage} />
        <Route path="/login" element={Auth} />
        <Route path="/signup" element={Register} />
        <Route path="/lobby" element={Lobby} />
        <PrivateRoute path="/dashboard" element={Dashboard} />
        <PrivateRoute path="/shop" element={Shop} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
