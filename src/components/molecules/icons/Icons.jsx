import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { svg } from "./Assets";

const Icons = ({ name, size, spin }) => {
  return (
    <FontAwesomeIcon
      icon={svg[name]}
      size={size}
      className="icon"
      spin={spin === "spin"}
      pulse={spin === "pulse"}
    />
  );
};

export default Icons;
