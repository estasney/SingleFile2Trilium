import { useContext } from "react";
import { ServerConfigState } from "./ServerConfigContext";
import { IServerConfigState } from "./ServerConfigReducer";

const useServerConfigState = (): IServerConfigState => {
  const c = useContext(ServerConfigState);
  if (!c) {
    throw new Error("ServerConfigContext was not initialized");
  }
  return c;
};

export default useServerConfigState;
