import { useContext, useEffect, useState } from "react";
import Coins from "../components/Coins";
import Frame from "../components/Frame";
import { storageRef } from "../utlils/firebase";
import { PlayerContext } from "../utlils/PlayerContext";

const Shop = () => {
  // const { player } = useContext(PlayerContext);
  const [avatarsArray, setAvatarsArray] = useState([]);
  useEffect(() => {
    const getAvatarUrl = async () => {
      const avatars = await storageRef.child("avatars").listAll();
      avatars.items.forEach(async (avatar) => {
        const avatarUrl = await avatar.getDownloadURL();

        setAvatarsArray([
          {
            cost: 2000,
            path: avatarUrl,
            id: avatar.fullPath,
            name: avatar.name,
          },
        ]);
      });
    };
    getAvatarUrl();
  }, []);
  return (
    <div className="container">
      <Coins />
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Avatars</h3>
        </div>
        <div className="card-body d-flex flex-wrap justify-content-around">
          {avatarsArray.map((item) => (
            <div key={item.id}>
              <Frame data={{ src: item.path, title: item.name }} />
              <p>{item.name?.split(".")[0]}</p>
              <button> {item.cost}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Shop;
