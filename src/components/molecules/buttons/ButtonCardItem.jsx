import React from "react";
import Hero from "../../atoms/Hero";

const ButtonCardItem = ({ data, click }) => {
  return (
    <button className="btn card-item" onClick={() => click(data)}>
      <h2>{data.name.toUpperCase()}</h2>
      {data.src && <Hero data={data} />}
      {/* <img src={image[data.imageName]} alt={data.imageName} className="hero" /> */}
    </button>
  );
};

export default ButtonCardItem;
