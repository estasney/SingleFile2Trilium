import React from "react";
import FlexContainer from "../FlexContainer/FlexContainer";
import Text from "../Text/Text";
import TextField from "../TextField/TextField";
import FormGroupRow from "../FormGroup/FormGroupRow";
import useServerConfigState from "../../ServerConfig/useServerConfigState";
import useServerConfigDispatch from "../../ServerConfig/useServerConfigDispatch";
import useUploadState from "../../Upload/useUploadState";
import useUploadDispatch from "../../Upload/useUploadDispatch";

const ConfigBox = () => {
  const serverConfig = useServerConfigState();
  const serverDispatch = useServerConfigDispatch();
  const uploadState = useUploadState();
  const uploadDispatch = useUploadDispatch();

  const handleEndpointChange = (val: string) => {
    if (val === "") {
      serverDispatch({
        type: "setServerEndpoint",
        payload: { endpoint: null },
      });
    } else {
      serverDispatch({ type: "setServerEndpoint", payload: { endpoint: val } });
    }
  };

  const handlePageTitleChange = (val: string) => {
    uploadDispatch({ type: "setPageTitle", payload: val });
  };

  const handlePageUrlChange = (val: string) => {
    uploadDispatch({ type: "setPageSourceUrl", payload: val });
  };

  return (
    <FlexContainer
      rowGap={"lg"}
      flex={"col"}
      justify={"center"}
      align={"center"}
    >
      <Text variant={"xl"}>Trilium SingleFile Uploader</Text>
      <FormGroupRow>
        <TextField
          value={
            serverConfig.serverConfig.endpoint
              ? serverConfig.serverConfig.endpoint
              : ""
          }
          label={"Server URL"}
          onChange={handleEndpointChange}
        />
      </FormGroupRow>
      <FormGroupRow>
        <TextField
          value={uploadState.pageTitle}
          label={"Page Title"}
          onChange={handlePageTitleChange}
        />
        <TextField
          value={uploadState.pageSourceUrl}
          label={"Source URL"}
          onChange={handlePageUrlChange}
        />
      </FormGroupRow>
    </FlexContainer>
  );
};
export default ConfigBox;
