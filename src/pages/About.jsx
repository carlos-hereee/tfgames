import React, { useContext } from "react";
import { AppContext } from "../utils/context/AppContext";
import SectionHeader from "../components/molecules/SectionHeader";

const About = () => {
  const { about } = useContext(AppContext);
  return (
    <div className="container">
      <SectionHeader data={about} />
      <div className="section-body">
        <p>{about.description}</p>
        {about.details.length > 0 && about.details.map((d) => <p key={d}>{d}</p>)}
      </div>
    </div>
  );
};

export default About;
