import { useContext, useEffect, useState } from "react";
import Coins from "../components/Coins";
import Frame from "../components/Frame";
import { storageRef, avatarRef } from "../utlils/firebase";
import { PlayerContext } from "../utlils/PlayerContext";
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
          <img src="../assets/rocky.svg" />
          {avatarsArray.map((item) => (
            <div key={item.id}>
              {item.path}
              <p>{item.name?.split(".")[0]}</p>
              <button className="btn btn-primary">{item.cost}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Shop;
