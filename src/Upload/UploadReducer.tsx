export interface IUploadState {
  pageTitle: string;
  pageSourceUrl: string;
  fileObj: File | null;
  networkStatus: null | "pending" | "success" | "fail";
}

type TSetPageTitle = {
  type: "setPageTitle";
  payload: string;
};

type TSetPageSourceUrl = {
  type: "setPageSourceUrl";
  payload: string;
};

type TSetFileObject = {
  type: "setFileObject";
  payload: File | null;
};

type TSetNetworkStatus = {
  type: "setNetworkStatus";
  payload: IUploadState["networkStatus"];
};

type TResetStatus = {
  type: "reset";
};

export type TUploadStateActions =
  | TSetPageTitle
  | TSetFileObject
  | TSetNetworkStatus
  | TSetPageSourceUrl
  | TResetStatus;

export const initialUploadState = (): IUploadState => {
  return {
    pageTitle: "",
    pageSourceUrl: "",
    fileObj: null,
    networkStatus: null,
  };
};

export const uploadStateReducer = (
  state: IUploadState,
  action: TUploadStateActions
): IUploadState => {
  switch (action.type) {
    case "setPageTitle": {
      return {
        ...state,
        pageTitle: action.payload,
      };
    }
    case "setFileObject": {
      return {
        ...state,
        fileObj: action.payload,
      };
    }
    case "setNetworkStatus": {
      return {
        ...state,
        networkStatus: action.payload,
      };
    }
    case "setPageSourceUrl": {
      return {
        ...state,
        pageSourceUrl: action.payload,
      };
    }
    case "reset": {
      return initialUploadState();
    }
  }
};
