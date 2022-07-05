import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { GameState } from "./context/GameContext";
import { AuthState } from "./context/AuthContext";
import { LobbyState } from "./context/LobbyContext";
import { PlayerState } from "./context/PlayerContext";
import App from "./App";
import "./stylesheets/index.scss";
import { SocketState } from "./context/SocketContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketState>
        <AuthState>
          <PlayerState>
            <LobbyState>
              <GameState>
                <App />
              </GameState>
            </LobbyState>
          </PlayerState>
        </AuthState>
      </SocketState>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
