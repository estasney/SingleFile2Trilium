import React from "react";
import { IUploadState, TUploadStateActions } from "./UploadReducer";

export type TUploadDispatch = (action: TUploadStateActions) => void;

export const UploadStateContext = React.createContext<IUploadState | null>(
  null
);
export const UploadDispatchContext =
  React.createContext<TUploadDispatch | null>(null);
