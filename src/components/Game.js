import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";
import TicTacToe from "./games/TicTacToe";
import PlayerCard from "./PlayerCard";
import { PlayerContext } from "../context/PlayerContext";
import GameResultModal from "./GameResultModal";
import Loading from "./Loading";

export default function Game() {
  const { game, gameResult, emitRequestRematch, rematchResponse } =
    useContext(GameContext);
  const { player } = useContext(PlayerContext);
  const [modalContent, setModalContent] = useState({});
  const [show, setShow] = useState(true);
  let isPlayer1 = player.uid === game.players?.player1?.uid ? true : false;
  let isPlayer2 = player.uid === game.players?.player2?.uid ? true : false;
  useEffect(() => {
    if (gameResult === "draw") {
      setModalContent({
        show,
        title: gameResult,
        message: "It's a draw!",
      });
    }
    if (gameResult === "player1") {
      setModalContent({
        show,
        title: "X's win",
        message: isPlayer1 ? "Congratulations! You win!" : "Defeat! Try again!",
      });
    }
    if (gameResult === "player2") {
      setModalContent({
        show,
        title: "O's win",
        message: isPlayer2 ? "Congratulations! You win!" : "Defeat! Try again!",
      });
    }
  }, [gameResult]);
  useEffect(() => {
    if (rematchResponse) {
      if (rematchResponse === "Starting match") {
        setShow(false);
        setModalContent({ show: false });
      } else {
        setModalContent({
          show,
          title: "Rematch Requested!",
          message: <Loading message={rematchResponse} />,
        });
      }
    }
  }, [rematchResponse]);

  const boards = {
    tictactoe: <TicTacToe isPlayer1={isPlayer1} isPlayer2={isPlayer2} />,
  };
  const handleRequestRematch = () => {
    emitRequestRematch(player, game);
  };

  return (
    <section className="game">
      <GameResultModal
        data={modalContent}
        modalShow={(modal) => setShow(modal)}
        requestRematch={(rematch) => handleRequestRematch(rematch)}
      />
      <div className="card">
        <div className="card-header d-flex justify-content-around align-items-center">
          <p> {game.round} </p>
          <h1 className="text-center">{game.gameName?.toUpperCase()} </h1>
          <p> {game.round} </p>
        </div>
        <div className="game-content mt-2">
          <div>{boards[game.gameName]}</div>
          <div className="game-players">
            <div className={game.turn === "player1" ? "glow" : "dim"}>
              <PlayerCard data={game.players.player1} />
            </div>
            <div className={game.turn === "player2" ? "glow" : "dim"}>
              <PlayerCard data={game.players.player2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
