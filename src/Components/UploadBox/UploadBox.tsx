import React from "react";
import FlexContainer from "../FlexContainer/FlexContainer";
import FormGroupRow from "../FormGroup/FormGroupRow";
import useUploadState from "../../Upload/useUploadState";
import useUploadDispatch from "../../Upload/useUploadDispatch";
import FileField from "../FileField/FileField";
import ActionBar from "../ActionBar/ActionBar";

export interface IUploadBoxProps {
  handleUpload: () => void;
}

const UploadBox = (props: IUploadBoxProps) => {
  const { handleUpload } = props;
  const uploadState = useUploadState();
  const uploadDispatch = useUploadDispatch();

  const handleFileUpload = (file: File | null) => {
    uploadDispatch({ type: "setFileObject", payload: file });
  };
  const handleActionClick = (type: "ok" | "reset") => {
    if (type === "ok") {
      handleUpload();
    } else {
      uploadDispatch({ type: "reset" });
    }
  };

  return (
    <FlexContainer
      rowGap={"lg"}
      flex={"col"}
      justify={"center"}
      align={"center"}
    >
      <FormGroupRow>
        <FileField label={"File"} onChange={handleFileUpload} />
      </FormGroupRow>
      <ActionBar
        onClick={handleActionClick}
        networkStatus={uploadState.networkStatus}
      />
    </FlexContainer>
  );
};
export default UploadBox;
