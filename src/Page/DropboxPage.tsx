import React, { useReducer } from "react";
import Container from "../Components/Container/Container";
import {
  initialServerConfigState,
  serverConfigReducer,
} from "../ServerConfig/ServerConfigReducer";
import {
  ServerConfigDispatchContext,
  ServerConfigState,
} from "../ServerConfig/ServerConfigContext";
import ConfigBox from "../Components/ConfigBox/ConfigBox";
import FlexContainer from "../Components/FlexContainer/FlexContainer";
import {
  UploadDispatchContext,
  UploadStateContext,
} from "../Upload/UploadContext";
import {
  initialUploadState,
  uploadStateReducer,
} from "../Upload/UploadReducer";
import UploadBox from "../Components/UploadBox/UploadBox";

const DropboxPage = () => {
  const [state, dispatch] = useReducer(
    serverConfigReducer,
    initialServerConfigState()
  );
  const [uploadState, uploadDispatch] = useReducer(
    uploadStateReducer,
    initialUploadState()
  );

  const postData = async (data: string) => {
    if (!state.serverConfig.endpoint) {
      throw new Error("No Server URL");
    }
    const payload = {
      title: uploadState.pageTitle,
      url: uploadState.pageSourceUrl,
      content: data,
    };
    const response = await fetch(state.serverConfig.endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.status;
  };

  const handleUpload = async () => {
    if (!uploadState.fileObj) {
      throw new Error("No File");
    }
    uploadDispatch({ type: "setNetworkStatus", payload: "pending" });
    const result = await uploadState.fileObj.text();
    const postResult = await postData(result);
    if (postResult < 400) {
      uploadDispatch({ type: "setNetworkStatus", payload: "success" });
      uploadDispatch({ type: "reset" });
    } else {
      uploadDispatch({ type: "setNetworkStatus", payload: "fail" });
      uploadDispatch({ type: "reset" });
    }
  };

  return (
    <ServerConfigState.Provider value={state}>
      <ServerConfigDispatchContext.Provider value={dispatch}>
        <UploadDispatchContext.Provider value={uploadDispatch}>
          <UploadStateContext.Provider value={uploadState}>
            <Container>
              <FlexContainer flex={"col"} justify={"center"} align={"center"}>
                <ConfigBox />
                <UploadBox handleUpload={handleUpload} />
              </FlexContainer>
            </Container>
          </UploadStateContext.Provider>
        </UploadDispatchContext.Provider>
      </ServerConfigDispatchContext.Provider>
    </ServerConfigState.Provider>
  );
};
export default DropboxPage;
