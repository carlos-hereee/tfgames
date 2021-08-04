import shortid from "shortid";
import Frame from "../components/Frame";
import { randomNum } from "../utlils/usefulFunction";

const Shop = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Avatars</h3>
        </div>
        <div className="card-body d-flex flex-wrap justify-content-around">
          {Array(3)
            .fill({
              src: "https://cdn1.iconfinder.com/data/icons/education-160/100/user_free-512.png",
              title: "avatar",
              cost: randomNum(),
              id: shortid.generate(),
            })
            .map((i) => (
              <div key={i.id} className="d-flex flex-column">
                <Frame data={i} />
                <button type="button" className="btn btn-primary m-1">
                  {i.cost}
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Taunts/Emojis</h3>
        </div>
        <div className="card-body d-flex flex-wrap justify-content-around">
          {Array(2)
            .fill({
              src: "https://www.rocksdigital.com/wp-content/uploads/2018/02/emoji-marketing-tips-1.jpg",
              title: "emoji/taunt",
              cost: randomNum(),
              id: shortid.generate(),
            })
            .map((i) => (
              <div key={i.id} className="d-flex flex-column">
                <Frame data={i} />
                <button type="button" className="btn btn-primary m-1">
                  {i.cost}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Shop;
