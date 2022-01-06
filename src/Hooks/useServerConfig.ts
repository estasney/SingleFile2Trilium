import { useState } from "react";

export type TServerConfig = {
  endpoint: string | null;
};
export type TSetUserConfig = (data: TServerConfig | null) => void;

export type TUseServerConfig = [TServerConfig, TSetUserConfig];

function useServerConfig(): TUseServerConfig {
  const getServerConfig = () => {
    const dataString = localStorage.getItem("serverConfig");
    if (!dataString) {
      return {
        endpoint: null,
      };
    }
    const serverConfig = JSON.parse(dataString);
    return {
      endpoint: serverConfig.endpoint ? serverConfig.endpoint : null,
    };
  };

  const [serverConfig, setServerConfig] = useState<TServerConfig>(() =>
    getServerConfig()
  );

  const saveServerConfig = (data: TServerConfig | null) => {
    if (!data) {
      localStorage.removeItem("serverConfig");
      setServerConfig({ endpoint: null });
    } else {
      localStorage.setItem("serverConfig", JSON.stringify(data));
      setServerConfig(data);
    }
  };

  return [serverConfig, saveServerConfig];
}

export default useServerConfig;
