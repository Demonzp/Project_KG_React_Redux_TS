import axios, { AxiosInstance } from 'axios';

export default class AxiosService {
  private static baseURL = 'http://localhost:5000/api';
  guestAxios: AxiosInstance;
  userAxios: AxiosInstance | null = null;
  private static instance: AxiosService;

  private constructor() {
    this.guestAxios = axios.create({
      baseURL: AxiosService.baseURL,
    });
  }

  static getInstance() {
    if (AxiosService.instance) {
      return this.instance;
    }
    this.instance = new AxiosService();
    return this.instance;
  }

  set user(token: string | null) {
    if(typeof token === 'string'){
      this.userAxios = axios.create({
        baseURL: AxiosService.baseURL,
        headers: {
          Authorization: token,
        }
      });
    }else{
      this.userAxios = null;
    }
  }
}