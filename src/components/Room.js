const Room = ({ room }) => {
  return (
    <div className={`room x:${room.x} y:${room.y} a:${room.active}`}> X </div>
  );
};
export default Room;
