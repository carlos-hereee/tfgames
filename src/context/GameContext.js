/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import GameResultModal from "../components/GameResultModal";
import { reducer } from "./GameReducer";
import { LobbyContext } from "./LobbyContext";
import { PlayerContext } from "./PlayerContext";
import { useSocket } from "./SocketContext";

export const GameContext = createContext();
export const GameState = ({ children }) => {
  const initialState = {
    isLoading: false,
    gameStart: false,
    game: {},
    gameResult: "",
    rematchResponse: "",
    gameName: "",
  };
  const [modalContent, setModalContent] = useState({});
  const [show, setShow] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { player } = useContext(PlayerContext);
  const { clock, ticket } = useContext(LobbyContext);
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.on("game-start", (g) => gameStart(g));
    socket.on("game-data", (game) => updateGameData(game));
    socket.on("game-results", (res) => postResults(res));
    socket.on("rematch-response", (res) => postRematchResponse(res));
    socket.on("left-response", (res) => postLeftResponse(res));
    socket.on("game-reset-response", (res) => gameResetResponse(res));
  }, [socket]);
  useEffect(() => {
    const { result } = state.gameResult;
    if (result) {
      setShow(true);
      if (result === "draw") setModalContent({ title: result });
      if (result === "win") setModalContent({ title: "Victory!" });
      if (result === "lose") setModalContent({ title: "Defeat!" });
    }
  }, [state.gameResult.result]);

  const gameStart = (game) => {
    console.log("data", clock, ticket);
    socket.emit("cancel-ticket", { ticket, clock, player });
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "GAME_START", payload: game });
  };
  const gameResetResponse = (game) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "REMATCH_RESPONSE", payload: "" });
    dispatch({ type: "POST_RESULT", payload: "" });
    setShow(false);
    updateGameData(game);
  };
  const postRematchResponse = (response) => {
    setModalContent((prev) => ({
      ...prev,
      gameName: state.game.gameName,
      message: response.message,
      players: response.players,
      isPlayer1: response.players.player1.uid === player.uid,
    }));
  };

  const updateGameData = (game) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "GAME_UPDATE", payload: game });
  };
  const placeMark = (game, cell, player) => {
    socket.emit("place-mark", { game, cell, player });
  };
  const postResults = (result) => {
    dispatch({ type: "IS_LOADING", payload: true });
    dispatch({ type: "POST_RESULT", payload: result });
  };
  const requestRematch = () => {
    const isPlayer1 = state.game.players.player1.uid === player.uid;
    socket.emit("request-rematch", { game: state.game, isPlayer1 });
  };
  const newGame = () => {
    setShow(!show);
    dispatch({ type: "IS_LOADING", payload: true });
    socket.emit("player-leave", { player, game: state.game });
    dispatch({ type: "GAME_END", payload: "" });
    socket.emit("new-game", { player, gameName: state.gameName });
  };
  const setGameName = (name) => {
    dispatch({ type: "SET_GAMENAME", payload: name });
  };
  const postLeftResponse = (res) => {
    setModalContent((prev) => ({
      ...prev,
      message: res.message,
      leftRes: true,
    }));
  };
  return (
    <GameContext.Provider
      value={{
        isLoading: state.isLoading,
        gameStart: state.gameStart,
        game: state.game,
        gameResult: state.gameResult,
        rematchResponse: state.rematchResponse,
        setGameName,
        placeMark,
      }}>
      <GameResultModal
        data={modalContent}
        show={show}
        requestRematch={() => requestRematch()}
        newGame={() => newGame()}
      />
      {children}
    </GameContext.Provider>
  );
};
