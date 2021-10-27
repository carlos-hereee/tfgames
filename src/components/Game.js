import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";
import TicTacToe from "./games/TicTacToe";
import PlayerCard from "./PlayerCard";
import { PlayerContext } from "../context/PlayerContext";
import GameResultModal from "./GameResultModal";
import Loading from "./Loading";

export default function Game() {
  const {
    game,
    gameResult,
    emitRequestRematch,
    rematchResponse,
    resetRematch,
  } = useContext(GameContext);
  const { player } = useContext(PlayerContext);
  const [modalContent, setModalContent] = useState({});
  const [isPlayer1, setIsPlayer1] = useState(
    player.uid === game.players.player1.uid ? true : false
  );
  const [isPlayer2, setIsPlayer2] = useState(
    player.uid === game.players.player2.uid ? true : false
  );
  const [show, setShow] = useState(true);

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
        resetRematch();
      } else {
        setModalContent({
          show,
          title: "Rematch Requested!",
          message: <Loading message={rematchResponse} />,
        });
      }
    }
  }, [rematchResponse]);
  useEffect(() => {
    if (game.round) {
      setIsPlayer1(player.uid === game.players.player1.uid ? true : false);
      setIsPlayer2(player.uid === game.players.player2.uid ? true : false);
    }
  }, [game.round]);
  const boards = {
    tictactoe: <TicTacToe />,
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
        <h1>{game.gameName.toUpperCase()}</h1>
        <div className="game-content">
          <div>{boards[game.gameName]}</div>
          <div className="game-players">
            <div className={game.turn === "player1" ? "glow" : ""}>
              <PlayerCard data={game.player1} />
            </div>
            <div className={game.turn === "player2" ? "glow" : ""}>
              <PlayerCard data={game.player2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* {gameResult && gameResult === "player1" && isPlayer1 ? (
  <GameOptions data={player1Won} />
) : (
  <GameOptions data={player2Won} />
)} */
}
