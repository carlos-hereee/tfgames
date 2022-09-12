import { useContext } from "react";
import Coins from "../components/Coins";
import Notification from "../components/Notification";
// import { avatarsArray } from "../data/shop";
import { PlayerContext } from "../context/PlayerContext";

const Shop = () => {
  const { player, purchaseAvatar, ownedAvatars, setError } =
    useContext(PlayerContext);
  // check if client can buy the item
  const addToCart = (avatar) => {
    if (player?.coins >= avatar.cost) {
      purchaseAvatar(player, avatar);
    } else {
      setError("not enough coins play some games");
    }
  };
  // find out if the client owns an avatar
  const isOwned = (array, id) => {
    return array.filter((i) => i.id === id).length;
  };
  return (
    <div className="container">
      <Coins />
      <Notification />
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Avatars</h3>
        </div>
        <div className="card-body d-flex flex-wrap justify-content-around">
          {/* {avatarsArray.map((item) => (
            <div key={item.id} className="card mb-3">
              <h3 className="card-header">{item.name?.split(".")[0]}</h3>
              <div className="card-body text-center">{item.path}</div>
              <div className="card-footer text-center">
                <button
                  className="btn btn-primary"
                  disabled={isOwned(ownedAvatars, item.id)}
                  onClick={() => addToCart(item)}>
                  {isOwned(ownedAvatars, item.id) ? "Sold Out" : item.cost}
                </button>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};
export default Shop;
