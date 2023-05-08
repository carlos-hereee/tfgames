import Games from "../components/Games";
import Socials from "../components/molecules/Socials";
import About from "./About";

const Landing = () => {
  return (
    <main className="primary-container">
      <About />
      <Socials />
      <Games />
    </main>
  );
};
export default Landing;
