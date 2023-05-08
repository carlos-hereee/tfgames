import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GameState } from "./utils/context/GameContext";
import { AuthState } from "./utils/context/AuthContext";
import { LobbyState } from "./utils/context/LobbyContext";
import App from "./App";
import "./stylesheets/index.scss";
import { SocketState } from "./utils/context/SocketContext";
import { AppState } from "./utils/context/AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketState>
        <AuthState>
          <AppState>
            <LobbyState>
              <GameState>
                <App />
              </GameState>
            </LobbyState>
          </AppState>
        </AuthState>
      </SocketState>
    </BrowserRouter>
  </React.StrictMode>
);
