import { useContext } from "react";
import AuthContext from "./authProvider";

const useUser = () => {
  return useContext(AuthContext);
};
export default useUser;