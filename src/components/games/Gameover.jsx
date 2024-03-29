import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { GameContext } from "../../utils/context/GameContext";
import CancelBtn from "../atoms/buttons/CancelBtn";
import RematchBtn from "../atoms/buttons/RematchBtn";

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
