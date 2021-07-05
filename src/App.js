import { Switch, Route } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
