import { useState, useEffect, useContext } from "react";
import shortid from "shortid";
import { PlayerContext } from "../utlils/PlayerContext";
import { randomBoolean, ticTacToeRoomStart } from "../utlils/usefulFunction";
import PlayerCard from "./PlayerCard";
import GameStatus from "./GameStatus";
import { gameRoomRef } from "../utlils/firebase";
import GameInvitation from "./GameInvitation";
import GameMenu from "./GameMenu";
import GameInvitationButton from "./GameInvitationButton";
import { gameResult } from "./winCondition";

const TicTacToe = ({ history }) => {
  const { room, player, playMove, liveRoom, swapTurn, isLoading } =
    useContext(PlayerContext);
  const [winCondition, setWinCondition] = useState({
    win: false,
    tie: false,
    reset: false,
  });
  const [gameMessage, setGameMessage] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  const inviteCode = parseInt(history.location.search.split("=").pop());
  useEffect(() => {
    const query = gameRoomRef.where("invitationCode", "==", inviteCode);
    // for invited users
    if (inviteCode) {
      query.get().then((item) => {
        // if its code doesnt match any room notify the player
        if (item.empty) {
          setGameMessage(true);
        }
        // if the room exits
        item.forEach((doc) => liveRoom(doc.data()));
      });
    }
  }, [inviteCode]);
  useEffect(() => {
    // start with an empty game board
    if (!room.gameHasStarted) {
      gameRoomRef.doc(room.roomUuid).set(
        {
          ...room,
          game: ticTacToeRoomStart,
          roomTurn: "",
          turn: 0,
          gameHasStarted: true,
        },
        { merge: true }
      );
    }
    // if client enter the room and player1 has not been chosen
    if (!room.player1Uuid) {
      // then player is player1
      gameRoomRef.doc(room.roomUuid).set(
        {
          ...room,
          player1Uuid: player.playerUuid,
          player1Name: player.playerName,
        },
        { merge: true }
      );
    }
    // if client is not player1 and player2 is empty
    if (room.player1Uuid !== player.playerUuid && !room.player2Uuid) {
      // then the player is player2
      gameRoomRef.doc(room.roomUuid).set(
        {
          ...room,
          player2Uuid: player.playerUuid,
          player2Name: player.playerName,
        },
        { merge: true }
      );
    }
    // if player1 and player 2 are int he room
    if (room.player1Uuid && room.player2Uuid) {
      // TODO: send ready checks
      // the match can begin
      setGameStart(true);
    }
  }, [room.roomUuid]);
  useEffect(() => {
    const playerTurnBool = randomBoolean();
    if (gameStart && !room.playerTurn) {
      // start the match
      gameRoomRef.doc(room.roomUuid).set(
        {
          ...room,
          playerTurn: playerTurnBool ? room.player1Uuid : room.player2Uuid,
          player1Weapon: playerTurnBool ? "X" : "O",
          player2Weapon: playerTurnBool ? "O" : "X",
          roomMessage: "Game Start",
          turn: 0,
        },
        { merge: true }
      );
    }
  }, [gameStart]);

  const playerMove = (square) => {
    // if its your turn
    if (room.playerTurn === player.playerUuid) {
      const weapon =
        room.playerTurn === room.player1Uuid
          ? room.player1Weapon || "X"
          : room.player2Weapon || "O";
      // update the game board
      playMove(room, square);
      // swap turns
      // check for win condition
      const status = gameResult(room.game, room.turn, weapon);
      if (status.result === "winner") {
      }
      if (status.result === "continue") {
        swapTurn(room);
      }
    } else {
      // TODO: notification that's its not your turn
      console.log("not your turn");
    }
  };
  const player1 = {
    playerName: room.player1Name,
    playerWeapon: room.player1Weapon,
    playerUuid: room.player1Uuid,
  };
  const player2 = {
    playerName: room.player2Name,
    playerWeapon: room.player2Weapon,
    playerUuid: room.player2Uuid,
  };
  return (
    <div className="container">
      {gameMessage ? (
        <div className="card">
          <div className="card-body text-center">
            <h3 className="card-title">Expired or Invalid invitation code</h3>
            <GameInvitation />
          </div>
        </div>
      ) : (
        <div className="card-deck mb-3 text-center">
          <div className="card mb-4 p-1 shadow-sm">
            {gameStart ? (
              <h4 classNames="card-title">
                {room.playerTurn === room.player1Uuid
                  ? room.player1Name
                  : room.player2Name}
                's turn
              </h4>
            ) : (
              <h4 className="card-title">{room.roomMessage}</h4>
            )}
            <div className="tictactoe">
              {room.game?.map((item) => (
                <button
                  className={`room x-${item.x} y-${item.y} `}
                  key={shortid.generate()}
                  onClick={() => playerMove(item)}
                  // disabled={isLoading}
                >
                  {item.piece}
                </button>
              ))}
            </div>
            <p className="card-text text-muted ml-auto">Turn # {room.turn}</p>
            <p className="card-text text-muted ml-auto">
              Room Id# {room.roomUuid}
            </p>
          </div>
          <PlayerCard data={player1} />
          {room.player2Uuid ? (
            <PlayerCard data={player2} />
          ) : (
            <GameInvitationButton invite={room} />
          )}
        </div>
      )}
    </div>
  );
};
export default TicTacToe;

const playAgain = () => {
  // reset everything
  // setTurn(0);
  // setShow(false);
  // setWinner(false);
  // setTie(false);
  // setReset(true);
  // setLog([...log, `Player: ${player} started a new game`]);
};
