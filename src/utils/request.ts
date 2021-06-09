import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface CodeHandlerProps {
  response: AxiosResponse;
  code: number;
  config: AxiosRequestConfig;
}

type CodeHandler = (props: CodeHandlerProps) => void;

declare module "axios" {
  export interface AxiosRequestConfig {
    codeHandlers: {
      [code: number]: CodeHandler;
    };
  }
}

const axiosInstance = axios.create({
  baseURL: "/api",
  codeHandlers: {},
});

// TODO: save using native APIs
let currentKey: string;

export const saveKey = (key: string) => {
  currentKey = key;
};

export const getKey = (): string | null => {
  return currentKey;
};

axiosInstance.interceptors.response.use((response) => {
  const {
    data: { code },
    config,
  } = response;
  if ("set-api-token" in response.headers) {
    saveKey(response.headers["set-api-token"]);
  }
  if (code !== 200 && code in config.codeHandlers) {
    config.codeHandlers[code]({
      response,
      code,
      config,
    });
  }
  return response;
});

axiosInstance.interceptors.request.use((config) => {
  const k = getKey();
  if (k) {
    if (config.headers) {
      config.headers["api-token"] = k;
    } else {
      config.headers = { "api-token": k };
    }
  }
  return config;
});

export default axiosInstance;
