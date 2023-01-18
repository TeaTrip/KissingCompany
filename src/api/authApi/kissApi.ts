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
    let response: AxiosResponse<any[]> = await this.get<any[]>('/girls').catch((error: AxiosError) => { throw error });
    let users: any[] = response.data;
    return users;
  }

  public async getDefka(id: number): Promise<any> {
    let response: AxiosResponse<any[]> = await this.get<any[]>(`/girls/${id}`).catch((error: AxiosError) => { throw error });
    let users: any = response.data;
    return users;
  }

  public async addDefka(data: any): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.post<any[], any[]>('/girls', data).catch((error: AxiosError) => { throw error });
    let defka: any[] = response.data;
    return defka;
  }

  public async addUser(data: any): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.post<any[], any[]>('/user', data).catch((error: AxiosError) => { throw error });
    let defka: any[] = response.data;
    return defka;
  }

  public async getUserByUsername(username: string): Promise<any> {
    let response: AxiosResponse<any[]> = await this.get<any[]>(`/users/${username}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async login(): Promise<any> {
    let response: AxiosResponse<any[]> = await this.get<any[]>('/users/me').catch((error: AxiosError) => { throw error });
    let users: any[] = response.data;
    return users;
  }

  public async getGirlSelf(): Promise<any> {
    let response: AxiosResponse<any[]> = await this.get<any[]>('/girls/me').catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async updateGirl(id: number,data: any): Promise<any> {
    let response: AxiosResponse<any[]> = await this.put<any[], any[]>(`/girls/${id}`, data).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async registration(data: any): Promise<any> {
    let response: AxiosResponse<any[]> = await this.post<any[], any[]>('/auth/registration',data).catch((error: AxiosError) => { throw error });
    let users: any[] = response.data;
    return users;
  }

  public async getInviteLink(): Promise<any> {
    let response: AxiosResponse<any[]> = await this.post<any[], any[]>('/invite_link').catch((error: AxiosError) => { throw error });
    let users: any[] = response.data;
    return users;
  }

  public async getInviteLinks(): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.get<any[]>('/invite_link').catch((error: AxiosError) => { throw error });
    let users: any[] = response.data;
    return users;
  }

  public async deleteInviteLink(token: string): Promise<any> {
    let response: AxiosResponse<any[]> = await this.delete<any[]>(`/invite_link/${token}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async registerDefka(token: string, data: any): Promise<any> {
    let response: AxiosResponse<any[]> = await this.post<any[], any[]>(`/girls/registration/${token}`, data).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  //Prices aka услуги
  public async createPrice(data: any): Promise<any> {
    let response: AxiosResponse<any[]> = await this.post<any[], any[]>('/price_list', data).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async getPrices(): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.get<any[]>('/price_list').catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async getPriceById(id: number): Promise<any> {
    let response: AxiosResponse<any[]> = await this.get<any[]>(`/price_list/${id}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async updatePrice(id: number,data: any): Promise<any> {
    let response: AxiosResponse<any[]> = await this.put<any[], any[]>(`/price_list/${id}`, data).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  //services
  public async getAllServicesForDefkaById(id: number): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.get<any[]>(`/service_history/get_all_for_girl/${id}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async postServiceHistory(data: any): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.post<any[], any[]>('/service_history', data).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async getAllServicesForClienByLogin(login: string): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.get<any[]>(`/service_history/get_all_for_client/${login}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async getServiceById(id: number): Promise<any> {
    let response: AxiosResponse<any[]> = await this.get<any[]>(`/service_history/${id}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async getNearestServicesForDefkaById(id: number): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.get<any[]>(`/service_history/get_nearest_by_girl_id/${id}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async approveServiceById(id: number): Promise<any> {
    let response: AxiosResponse<any[]> = await this.put<any[], any[]>(`/service_history/approve/${id}`).catch((error: AxiosError) => { throw error });
    return response;
  }

  public async endServiceById(id: number): Promise<any> {
    let response: AxiosResponse<any[]> = await this.put<any[], any[]>(`/service_history/stop/${id}`).catch((error: AxiosError) => { throw error });
    return response;
  }

  public async startServiceById(id: number): Promise<any> {
    let response: AxiosResponse<any> = await this.put<any[], any[]>(`/service_history/start/${id}`).catch((error: AxiosError) => { throw error });
    return response;
  }

  //feedbacks
  public async postGirlFeedback(data: any): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.post<any[], any[]>('/feedback', data).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  ///feedback/3
  public async getFeedbackByGirlId(id: number): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.get<any[]>(`/feedback/${id}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }
}

export class KissApiInstance {
  private kissApi: KissApi;
  private defaultConfig: any;
  private role: string;
  constructor(config: any){
    this.kissApi = new KissApi(config);
    this.role = 'UNAUTH';
    this.defaultConfig = config;
  }

  public getKissApi(): KissApi {
    return this.kissApi;
  }

  public setNewConfig(config: any) {
    this.kissApi = new KissApi(config);
  }

  public logout(){
    window.localStorage.removeItem('auth');
    this.role = 'UNAUTH';
    this.kissApi = new KissApi(this.defaultConfig);
  }

  public getRole(): string{
    return this.role;
  }

  public setRole(nRole: string){
    this.role = nRole;
  }
}

export const kissApi = new KissApiInstance(apiConfig as any);