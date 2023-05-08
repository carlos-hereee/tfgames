import Icons from "../atoms/Icons";

const NotificationCount = ({ count }) => {
  return (
    <>
      {count <= 9 && count > 0 && (
        <span className="notification-count">{<Icons name={count} />}</span>
      )}
      {count > 9 && (
        <span className="notification-count">
          {count
            .toString()
            .split("")
            .map((n) => (
              <Icons name={n} />
            ))}
        </span>
      )}
    </>
  );
};

export default NotificationCount;
