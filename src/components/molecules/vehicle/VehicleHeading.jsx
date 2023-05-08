const VehicleHeading = ({ data }) => {
  return (
    <div className="vehicle-heading">
      <p>
        <strong>
          {data.year} {data.make} {data.model}
        </strong>
      </p>
      <p className="price">
        <strong>${data.price ? data.price.toLocaleString() : 0}</strong>
      </p>
    </div>
  );
};

export default VehicleHeading;
