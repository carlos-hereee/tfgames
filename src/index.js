import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PlayerState } from "./utlils/PlayerContext";
import "./stylesheets/index.scss";
import { GameState } from "./utlils/GameContext";
import { AuthState } from "./utlils/AuthContext";
import { LobbyState } from "./utlils/LobbyContext";
import { SocketState } from "./utlils/SocketContext";

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
