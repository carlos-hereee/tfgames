import { faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const RandomName = () => {
  const [name, setName] = useState("tictactoe-destroyer");
  const handleChange = (e) => {
    setName(...(name + e.target.value));
  };
  return (
    <div className="input-group p-2">
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={(e) => handleChange(e)}
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
      <button className="input-group-text">
        <FontAwesomeIcon icon={faDice} />
      </button>
    </div>
  );
};
export default RandomName;
