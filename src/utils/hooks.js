/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from "react";
import { GameContext } from "../context/GameContext";

export const useAnimationFrame = (cb) => {
  const { game } = useContext(GameContext);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (currentTime) => {
    requestAnimationFrame(animate);
    if (previousTimeRef.current !== undefined) {
      const deltaTime = (currentTime - previousTimeRef.current) / 1000;
      if (deltaTime < 1 / game.options.renderSpeed) return;
      cb(deltaTime);
    }
    previousTimeRef.current = currentTime;
    requestRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // return [requestRef, previousTimeRef];
};
