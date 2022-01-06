import { useContext } from "react";
import { IUploadState } from "./UploadReducer";
import { UploadStateContext } from "./UploadContext";

const useUploadState = (): IUploadState => {
  const c = useContext(UploadStateContext);
  if (!c) {
    throw new Error("UploadStateContent was not initialized");
  }
  return c;
};

export default useUploadState;
