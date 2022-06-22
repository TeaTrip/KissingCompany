import { Api } from "./api";
import { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { apiConfig } from "./api.config";


export class KissApi extends Api {

  constructor(config: AxiosRequestConfig) {
    super(config);
  }
  /**
     * Generates an HTTP Request to get All the users in the system.
     * 
     * @returns {Promise<any[]>} any[] - All the users
     */
  public async getAllDefki(): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.get<any[]>("/girls").catch((error: AxiosError) => { throw error });
    let users: any[] = response.data;
    return users;
  }

  public async login(data: any): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.post<any[], any[]>('/private',data).catch((error: AxiosError) => { throw error });
    let users: any[] = response.data;
    return users;
  }
}

export const kissApi = new KissApi(apiConfig as any)