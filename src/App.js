import Header from "./components/Header";
import Footer from "./components/Footer";
import TickTackToe from "./components/TickTackToe";

function App() {
  return (
    <div className="app">
      <Header />
      <body className="body">
        <TickTackToe />
      </body>
      <Footer />
    </div>
  );
}

export default App;
