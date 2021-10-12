import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PlayerState } from "./utlils/PlayerContext";
import "./stylesheets/index.scss";
import { GameState } from "./utlils/GameContext";

ReactDOM.render(
  <React.StrictMode>
    <GameState>
      <PlayerState>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PlayerState>
    </GameState>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
