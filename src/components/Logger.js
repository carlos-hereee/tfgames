export default function LobbyLog({ data }) {
  return data.map(({ id, message }) => (
    <div className="log-wrapper" key={id}>
      <p> {message} </p>
    </div>
  ));
}
