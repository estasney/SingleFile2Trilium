import FlexContainer from "../FlexContainer/FlexContainer";
import "./ActionBar.scss";
import React from "react";
import Progress from "../Progress/Progress";
import { IUploadState } from "../../Upload/UploadReducer";
import Text from "../Text/Text";
import useUploadState from "../../Upload/useUploadState";
import useDelayedStateChange from "../../Hooks/useDelayedStateChange";

export interface IActionBarProps {
  onClick: (type: "ok" | "reset") => void;
  networkStatus: IUploadState["networkStatus"];
}

type TActionBarProps = Pick<IActionBarProps, "onClick">;

const ActionButtons = (props: TActionBarProps) => {
  const uploadStatus = useUploadState();
  const { onClick } = props;
  return (
    <React.Fragment>
      <button
        disabled={uploadStatus.fileObj === null}
        key={"ok"}
        className={"action-btn--primary"}
        onClick={() => onClick("ok")}
      >
        OK
      </button>
      <button
        key={"reset"}
        className={"action-btn--secondary"}
        onClick={() => onClick("reset")}
      >
        Cancel
      </button>
    </React.Fragment>
  );
};

const ActionBar = (props: IActionBarProps) => {
  const { onClick, networkStatus } = props;
  const networkState = useDelayedStateChange(
    networkStatus,
    ["success", "fail"],
    3000
  );
  return (
    <FlexContainer
      rowGap={"lg"}
      justify={"center"}
      align={"center"}
      flex={"row-wrap"}
    >
      {networkState ? (
        networkState === "pending" ? (
          <Progress key={"progress"} />
        ) : networkState === "success" ? (
          <Text variant={"xl"}>Created!</Text>
        ) : (
          <Text variant={"xl"}>Failed To Upload</Text>
        )
      ) : (
        <ActionButtons onClick={onClick} />
      )}
    </FlexContainer>
  );
};

export default ActionBar;
