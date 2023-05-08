/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from "react";
import { GameContext } from "../utils/context/GameContext";

export const useAnimationFrame = (cb) => {
  const { game } = useContext(GameContext);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const main = (currentTime) => {
    window.requestAnimationFrame(main);
    if (previousTimeRef.current !== undefined) {
      const deltaTime = (currentTime - previousTimeRef.current) / 1000;
      if (deltaTime < 1 / game.options.renderSpeed) return;
      cb(deltaTime);
    }
    previousTimeRef.current = currentTime;
    requestRef.current = window.requestAnimationFrame(main);
  };
  useEffect(() => {
    requestRef.current = window.requestAnimationFrame(main);
    return () => window.cancelAnimationFrame(requestRef.current);
  }, []);
};
