import React from "react";
import {
  IServerConfigState,
  TServerConfigActions,
} from "./ServerConfigReducer";

export type TServerConfigDispatch = (action: TServerConfigActions) => void;

export const ServerConfigState = React.createContext<IServerConfigState | null>(
  null
);
export const ServerConfigDispatchContext =
  React.createContext<TServerConfigDispatch | null>(null);
