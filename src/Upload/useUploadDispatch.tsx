import { useContext } from "react";
import { UploadDispatchContext, TUploadDispatch } from "./UploadContext";

const useUploadDispatch = (): TUploadDispatch => {
  const c = useContext(UploadDispatchContext);
  if (!c) {
    throw new Error("UploadDispatchContext was not initialized");
  }
  return c;
};

export default useUploadDispatch;
