import React from "react";
import Icons from "../../atoms/Icons";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate(-1)} className="btn-back">
      <Icons name="left" />
      Back
    </button>
  );
};

export default BackButton;
