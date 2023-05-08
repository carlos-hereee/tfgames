import CamelSpace from "../../atoms/Text/CamelSpace";
import CapFirstChar from "../../atoms/Text/CapFirstChar";

const VehicleDetails = ({ data }) => {
  return (
    <div className="card-body">
      {/* TODO: add to saved list */}
      <strong>
        {data.year} {data.make} {data.model} Features:
      </strong>
      <span>VIN: {data.vin.toUpperCase()}</span>
      <div className="vehicle-details">
        {data.features?.map((feature) => (
          <div className="vehicle-details-wrapper" key={feature.vin}>
            {data.mileage && (
              <p>
                Miles: <span>{data.mileage?.toLocaleString() || 0}</span>
              </p>
            )}
            {Object.keys(feature).map((f) => (
              <p key={feature[f]}>
                <CamelSpace str={f} />: <CapFirstChar str={feature[f]} />
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleDetails;
