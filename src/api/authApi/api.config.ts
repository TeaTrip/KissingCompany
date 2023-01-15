import * as qs from "qs";
import { PathLike } from "fs";

export const API_BASE_URL = "http://localhost:3233/api/";
//export const API_BASE_URL = "http://192.168.1.33:3233/api/";

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
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json", 
    },
  },
  paramsSerializer: (params: PathLike) => qs.stringify(params, { indices: false }),
}