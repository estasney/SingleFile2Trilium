import React, { useEffect, useRef } from "react";
import "./FileField.scss";
import useUploadState from "../../Upload/useUploadState";

export interface IFileFieldProps {
  label: string;
  onChange: (file: null | File) => void;
}

const FileField = (props: IFileFieldProps) => {
  const { label, onChange } = props;
  const fileInputField = useRef<null | HTMLInputElement>(null);
  const uploadState = useUploadState();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files;
    const file = f ? f[0] : null;
    onChange(file);
  };

  useEffect(() => {
    if (!uploadState.fileObj) {
      if (fileInputField !== null && fileInputField.current) {
        const e = fileInputField.current;
        if (e && e.files && e.files.length) {
          e.value = "";
        }
      }
    }
  }, [uploadState.fileObj]);

  return (
    <>
      <label className={"filefield-label"}>{label}</label>
      <div className={"filefield"}>
        <input
          className={"filefield-input"}
          type={"file"}
          ref={fileInputField}
          onChange={handleUpload}
        />
      </div>
    </>
  );
};

export default FileField;
