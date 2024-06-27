import axios, { AxiosError, AxiosInstance } from "axios";
import Cookies from 'js-cookie';
import { useBetterLife } from "../components/templates/provider";
class HttpClient {
  private static _instance: HttpClient;
  INSTANCE!: AxiosInstance;


  constructor() {
    this._init();
  }

  static getInstance(): HttpClient {
    if (!HttpClient._instance) {
      return new HttpClient();
    }
    return HttpClient._instance;
  }

  _init() {
    if (!this.INSTANCE) {
      this.INSTANCE = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
      });
      this.setInterceptorRequest();
    }
  }

  // Set Bearer Token here!!!
  setInterceptorRequest() {
    return this.INSTANCE.interceptors.request.use(
      async (config) => {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem('login_token')}`;
        config.headers["Accept"] = 'application/json';
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async getMethod(path: string, params?: Record<string, any>): Promise<any> {
    try {
      const response = await this.INSTANCE.get(path, { params });
      return response;
    } catch (error) {
      const e = error as AxiosError;
      return e.response;
    }
  }

  async postMethod(path: string, body?: Record<string, any>) {
    try {
      const response = await this.INSTANCE.post(path, body);
      return response;
    } catch (error) {
      const e = error as AxiosError;
      return e.response;
    }
  }
}

export default HttpClient.getInstance();
