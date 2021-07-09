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
  method: "POST",
});

// TODO: save using native APIs
let currentKey: string;

export const saveKey = (key: string) => {
  localStorage.setItem("apikey", key);
};

export const getKey = (): string | null => {
  return localStorage.getItem("apikey") as string;
};

axiosInstance.interceptors.response.use(
  (response) => {
    const {
      data: { code },
      config,
    } = response;
    if ("set-api-token" in response.headers) {
      saveKey(response.headers["set-api-token"]);
    }
    if (code && code !== 200) {
      if (code in config.codeHandlers) {
        config.codeHandlers[code]({
          response,
          code,
          config,
        });
      } else {
        console.log({ env: process.env.NODE_ENV, response });
        // throw 'fk'
        if (process.env.NODE_ENV === "development") {
          throw new Error(response.data?.error || code);
        }
      }
    }
    return response;
  },
  (error) => {
    console.log(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const k = getKey();
  if (k) {
    if (config.headers) {
      config.headers["api-token"] = k;
    } else {
      config.headers = { "api-token": k };
    }
  }
  console.log({ k });
  return config;
});

export default axiosInstance;
