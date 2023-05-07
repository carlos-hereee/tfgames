const Loading = ({ message }) => (
  <div className="card-body text-center">
    <h3 className="card-title">{message}</h3>
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  </div>
);
export default Loading;
