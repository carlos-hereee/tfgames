const Heading = ({ data }) => {
  return (
    <div className="heading-container">
      <h3 className="heading">{data.title}</h3>
    </div>
  );
};

export default Heading;
