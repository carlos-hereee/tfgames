import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export const useIsPlayerLoggedIn = () => {
  const [user] = useAuthState(auth);
  return user?.uid ? true : false;
};
