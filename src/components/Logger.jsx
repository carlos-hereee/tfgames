export default function LobbyLog({ data }) {
  return data.map(({ id, message }) => (
    <div className="log" key={id}>
      <p>{message}</p>
    </div>
  ));
}
