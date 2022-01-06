import { TServerConfig } from "../Hooks/useServerConfig";

export interface IServerConfigState {
  serverConfig: TServerConfig;
}

type TSetServerEndpoint = {
  type: "setServerEndpoint";
  payload: TServerConfig;
};

export type TServerConfigActions = TSetServerEndpoint;

export const initialServerConfigState = (): IServerConfigState => {
  const dataString = localStorage.getItem("serverConfig");
  const base = {
    serverConfig: {
      endpoint: null,
    },
  };
  if (!dataString) {
    return base;
  }
  const parsed = JSON.parse(dataString);
  if (parsed.endpoint) {
    base.serverConfig.endpoint = parsed.endpoint;
  }
  return base;
};
export const serverConfigReducer = (
  state: IServerConfigState,
  action: TServerConfigActions
): IServerConfigState => {
  switch (action.type) {
    case "setServerEndpoint": {
      if (!action.payload) {
        localStorage.removeItem("serverConfig");
      } else {
        localStorage.setItem("serverConfig", JSON.stringify(action.payload));
      }
      return {
        ...state,
        serverConfig: action.payload,
      };
    }
  }
};
