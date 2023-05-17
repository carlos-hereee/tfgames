const Hero = ({ data }) => {
  return <img className="hero" src={data.link} alt={data.name} />;
};

export default Hero;
