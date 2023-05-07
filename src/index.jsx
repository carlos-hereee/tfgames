import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { GameState } from "./context/GameContext";
import { AuthState } from "./context/AuthContext";
import { LobbyState } from "./context/LobbyContext";
import App from "./App";
import "./stylesheets/index.scss";
import { SocketState } from "./context/SocketContext";

ReactDOM.render(
  <BrowserRouter>
    <SocketState>
      <AuthState>
        <LobbyState>
          <GameState>
            <App />
          </GameState>
        </LobbyState>
      </AuthState>
    </SocketState>
  </BrowserRouter>,
  document.getElementById("root")
);
