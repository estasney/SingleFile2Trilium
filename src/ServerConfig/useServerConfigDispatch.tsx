import { useContext } from "react";
import {
  ServerConfigDispatchContext,
  TServerConfigDispatch,
} from "./ServerConfigContext";

const useServerConfigDispatch = (): TServerConfigDispatch => {
  const c = useContext(ServerConfigDispatchContext);
  if (!c) {
    throw new Error("ServerConfigContext was not initialized");
  }
  return c;
};

export default useServerConfigDispatch;
