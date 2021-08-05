/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { PlayerContext } from "../utlils/PlayerContext";
import PlayerCard from "../components/PlayerCard";
import { gameRoomRef } from "../utlils/firebase";
import GameInvitation from "../components/GameInvitation";
import GameInvitationButton from "../components/GameInvitationButton";
import { gameResult } from "../components/winCondition";
import GameResultModal from "../components/GameResultModal";
import { isPlayer1 } from "../utlils/usefulFunction";

const TicTacToe = ({ history }) => {
  const {
    room,
    player,
    playMove,
    liveRoom,
    swapTurn,
    isLoading,
    addPlayer1,
    addPlayer2,
    startGame,
    roomIsEmpty,
    showResultModal,
    leaveRoom,
  } = useContext(PlayerContext);

  const { player1Uuid, player2Uuid, roomUuid, playerTurn } = room;
  const { playerUuid } = player;
  useEffect(() => {
    const inviteCode = parseInt(history.location.search.split("=").pop());
    const query = gameRoomRef.where("invitationCode", "==", inviteCode);
    // for invited users
    if (inviteCode) {
      query.get().then((item) => {
        // if invitecode doesnt match any room notify the player
        if (item.empty) {
          roomIsEmpty(room);
        }
        // if the room exits
        item.forEach((doc) => liveRoom(doc.data()));
      });
    }
  }, []);
  useEffect(() => {
    if (roomUuid) {
      // is player1 if player1 has not been chosen
      if (!player1Uuid) addPlayer1(room, player);
      // is player2 if is not player1 and player2 is empty
      if (player1Uuid !== playerUuid && !player2Uuid) addPlayer2(room, player);
      // the match can begin when both players are ready
      if (room.player1Ready && room.player2Ready && !room.gameStart) {
        startGame(room);
      }
      // handle error if player1 is also player2
      if (player1Uuid === player2Uuid) {
        leaveRoom(room, {
          playerName: room.player2Name,
          playerUuid: room.player2Uuid,
        });
      }
    }
  }, [roomUuid, room.player1Ready, room.player2Ready]);

  const playerMove = (square) => {
    // update the game board if its player turn
    if (playerTurn === player.playerUuid) {
      if (!square.piece) playMove(room, square);
      else console.log("illegal move");
      // check for win condition
      const status = gameResult(
        room.game,
        room.turn,
        isPlayer1(room, player.playerUuid)
          ? room.player1Weapon || "X"
          : room.player2Weapon || "O"
      );
      // show results winner shows pop up continue swaps turns
      if (status.result === "continue") swapTurn(room);
      else showResultModal(status.result, room);
    } else console.log("not your turn");
  };
  const player1 = {
    playerName: room.player1Name,
    playerWeapon: room.player1Weapon,
    playerUuid: room.player1Uuid,
    ready: room.player1Ready,
  };
  const player2 = {
    playerName: room.player2Name,
    playerWeapon: room.player2Weapon,
    playerUuid: room.player2Uuid,
    ready: room.player2Ready,
  };

  return (
    <main className="container">
      {room.isEmpty ? (
        <div className="card">
          <div className="card-body text-center">
            <h3 className="card-title">Expired or Invalid invitation code</h3>
            <GameInvitation />
          </div>
        </div>
      ) : (
        <div className="card-deck mb-3 text-center">
          <div className="card mb-3 p-1 shadow-sm">
            <h4 className="card-title">{room.roomMessage}</h4>
            <div className="tictactoe">
              {room.game?.map((item) => (
                <button
                  className={`room x-${item.x} y-${item.y} `}
                  key={item.id}
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
      <GameResultModal />
    </main>
  );
};
export default TicTacToe;
