import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";
import CancelBtn from "./atoms/CancelBtn";
import RematchBtn from "./atoms/RematchBtn";

export default function Gameover() {
  const { game, gameResult, setRematch, newGame } = useContext(GameContext);
  const { player } = useContext(AuthContext);

  return (
    <section className="game-over">
      <h2 className="">{gameResult.title}</h2>
      <span> {gameResult.message} </span>
      <div>
        {!gameResult.leftGame && gameResult.rematch ? (
          <CancelBtn onBtnClick={() => setRematch(game, player)} />
        ) : (
          !game.singlePlayer && (
            <RematchBtn onBtnClick={() => setRematch(game, player)} />
          )
        )}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => newGame(player, game)}>
          New Game
        </button>
      </div>
    </section>
  );
}
