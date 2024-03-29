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

  public async deletePrice(id: number): Promise<any> {
    let response: AxiosResponse<any[]> = await this.delete<any[]>(`/price_list/${id}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  //services
  public async getAllServicesForDefkaById(id: number): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.get<any[]>(`/service_history/get_all_for_girl/${id}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async postServiceHistory(data: any): Promise<any> {
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
  public async postGirlFeedback(data: any): Promise<any> {
    let response: AxiosResponse<any[]> = await this.post<any[], any[]>('/feedback', data).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async getFeedbackByGirlId(id: number): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.get<any[]>(`/feedback/girl/${id}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async getAppFeedbacks(): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.get<any[]>('/app_feedback').catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async postAppFeedback(data: any): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.post<any[], any[]>('/app_feedback', data).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async getAvgRatingById(id: number): Promise<number> {
    let response: AxiosResponse<any> = await this.get<any[]>(`/feedback/avg/${id}`).catch((error: AxiosError) => { throw error });
    if(response.data.stars_avg === "Infinity"){
      return 0
    }
    else {
      return response.data.stars_avg
    }
  }

  //photos
  public async postGirlPhoto(data: any, isAvatar?: boolean): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.post<any[], any[]>(`/girls_photos${isAvatar ? '?is_profile_photo=true' : '?is_profile_photo=false'}`, data, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }}).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async getPhoto(id: number): Promise<string> {
    let data = new FormData();
    let response: AxiosResponse<Blob> = await this.get<Blob>(`/girls_photos/download_image/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json, text/plain, */*'
      },
      responseType: 'blob',
      data: data
    }).catch((error: AxiosError) => { throw error });
    let reader = new FileReader();
    reader.readAsDataURL(response.data); // конвертирует Blob в base64 и вызывает onload
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
    });
  }

  public async getGirlPhotosById(id: number, isAvatar?: boolean): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.get<any[]>(`/girls_photos/${id}${isAvatar ? '?is_profile_photo=true' : '?is_profile_photo=false'}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async deletePhotoById(id: number): Promise<any[]> {
    let response: AxiosResponse<any[]> = await this.delete<any[]>(`/girls_photos/${id}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }

  public async getSlutCoins(): Promise<any> {
    let response: AxiosResponse<any[]> = await this.get<any[]>('/cashback').catch((error: AxiosError) => { throw error });
    return response.data;
  }

  //payment

  public async getPaymentLink(orderId: number, coinsToUse?: number): Promise<any> {
    let response: AxiosResponse<any[]> = await this.get<any[]>(`/payment/get_link/${orderId}${coinsToUse ? '?coins_to_use=' + coinsToUse : ''}`);
    return response.data;
  }

  public async checkPayment(billId: string): Promise<any> {
    let response: AxiosResponse<any[]> = await this.get<any[]>(`/payment/info/${billId}`).catch((error: AxiosError) => { throw error });
    return response.data;
  }

}

export class KissApiInstance {
  private kissApi: KissApi;
  private defaultConfig: any;
  private role: string;
  constructor(config: any){
    this.kissApi = new KissApi(config);
    console.log(window.localStorage.getItem('role'));
    let prevRole = window.localStorage.getItem('role');
    console.log('prevRole', prevRole);
    if(prevRole){
      this.role = prevRole;
    }else{
      window.localStorage.setItem('role', 'UNAUTH')
      this.role = 'UNAUTH';
    }
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
    window.localStorage.setItem('role', 'UNAUTH')
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