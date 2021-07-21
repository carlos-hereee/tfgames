import { useState, useEffect, useContext } from "react";
import shortid from "shortid";
import { PlayerContext } from "../utlils/PlayerContext";
import { randomBoolean, ticTacToeRoomStart } from "../utlils/usefulFunction";
import PlayerCard from "./PlayerCard";
import { gameRoomRef } from "../utlils/firebase";
import GameInvitation from "./GameInvitation";
import GameMenu from "./GameMenu";
import GameInvitationButton from "./GameInvitationButton";
import { gameResult } from "./winCondition";
import Modal from "./Modal";

const TicTacToe = ({ history }) => {
  const { room, player, playMove, liveRoom, swapTurn, isLoading } =
    useContext(PlayerContext);
  const [gameStatus, setGameStatus] = useState({
    tie: false,
    reset: false,
    gameStart: false,
    isEmpty: false,
    show: false,
    message: "",
    title: "",
  });

  const inviteCode = parseInt(history.location.search.split("=").pop());
  useEffect(() => {
    const query = gameRoomRef.where("invitationCode", "==", inviteCode);
    // for invited users
    if (inviteCode) {
      query.get().then((item) => {
        // if its code doesnt match any room notify the player
        if (item.empty) {
          setGameStatus({ ...gameStatus, isEmpty: true });
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
      setGameStatus({ ...gameStatus, gameStart: true });
    }
  }, [room.roomUuid]);
  useEffect(() => {
    const playerTurnBool = randomBoolean();
    if (gameStatus.gameStart && !room.playerTurn) {
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
  }, [gameStatus.gameStart]);
  useEffect(() => {
    if (room.winner) {
      room.winner === player.playerUuid
        ? setGameStatus({
            ...gameStatus,
            show: true,
            message: "Congratulations! You Won",
            title: "VICTORY!",
          })
        : setGameStatus({
            ...gameStatus,
            show: true,
            message: "You Lose",
            title: "DEFEAT!",
          });
    }
    if (room.winner === "draw") {
      setGameStatus({
        ...gameStatus,
        show: true,
        message: "It's a draw",
        title: "DRAW!",
      });
    }
  }, [room.winner]);

  const playerMove = (square) => {
    // if its your turn
    if (room.playerTurn === player.playerUuid) {
      const weapon =
        room.playerTurn === room.player1Uuid
          ? room.player1Weapon || "X"
          : room.player2Weapon || "O";
      // update the game board
      playMove(room, square);
      // check for win condition
      const status = gameResult(room.game, room.turn, weapon);
      if (status.result === "winner") {
        gameRoomRef
          .doc(room.roomUuid)
          .set({ ...room, winner: room.playerTurn }, { merge: true });
      }
      if (status.result === "draw") {
        gameRoomRef
          .doc(room.roomUuid)
          .set({ ...room, winner: "draw" }, { merge: true });
      }
      if (status.result === "continue") {
        // swap turns
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
      {gameStatus.isEmpty ? (
        <div className="card">
          <div className="card-body text-center">
            <h3 className="card-title">Expired or Invalid invitation code</h3>
            <GameInvitation />
          </div>
        </div>
      ) : (
        <div className="card-deck mb-3 text-center">
          <div className="card mb-4 p-1 shadow-sm">
            {gameStatus.gameStart ? (
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
                  disabled={isLoading}>
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
      <Modal data={gameStatus} />
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
