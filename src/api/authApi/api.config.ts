import * as qs from "qs";
import { PathLike } from "fs";

export const API_BASE_URL = "http://localhost:1232/";

export const apiConfig = {
  returnRejectedPromiseOnError: true,
  
  timeout: 30000,
  baseURL: API_BASE_URL,
  headers: {
    common: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      'Access-Control-Allow-Origin': '*',
      Pragma: "no-cache",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  paramsSerializer: (params: PathLike) => qs.stringify(params, { indices: false }),
}