import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { GameState } from "./context/GameContext";
import { AuthState } from "./context/AuthContext";
import { LobbyState } from "./context/LobbyContext";
import { PlayerState } from "./context/PlayerContext";
import App from "./App";
import "./stylesheets/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthState>
        <PlayerState>
          <LobbyState>
            <GameState>
              <App />
            </GameState>
          </LobbyState>
        </PlayerState>
      </AuthState>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
