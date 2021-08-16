import Coins from "../components/Coins";
import { avatarsArray } from "../data/shop";

const Shop = () => {
  // const { player } = useContext(PlayerContext);

  return (
    <div className="container">
      <Coins />
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Avatars</h3>
        </div>
        <div className="card-body d-flex flex-wrap justify-content-around">
          {avatarsArray.map((item) => (
            <div key={item.id} className="card mb-3">
              <div>
                <h3 className="card-header">{item.name?.split(".")[0]}</h3>
              </div>
              <div className="card-body text-center">{item.path}</div>
              <div className="card-footer text-center">
                <button className="btn btn-primary">{item.cost}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Shop;
