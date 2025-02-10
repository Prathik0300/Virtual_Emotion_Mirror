import { ACCESS_TOKEN } from "@/src/constants/keys";
import { getErrorToast } from "@/src/utils/commonUtils";
import { getCookieData } from "@/src/utils/cookieUtil";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class Request {
  private axiosInstance: AxiosInstance;
  private static instance: Request;

  constructor(
    baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL,
    defaultHeaders?: Record<string, string>
  ) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        ...defaultHeaders,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  public static getInstance(defaultHeaders?: Record<string, string>): Request {
    if (!Request.instance) {
      Request.instance = new Request(defaultHeaders);
    }
    return Request.instance;
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`,
            ...config.headers,
          };
        }
        return config;
      },
      (error) => {
        return error;
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log("axios inter > ", { response });
        return response;
      },
      (error) => {
        if (Array.isArray(error?.response?.data?.message)) {
          error?.response?.data?.message.map((err: string) =>
            getErrorToast(err)
          );
        } else {
          getErrorToast(error.response.statusText);
        }
        return error;
      }
    );
  }

  private getToken() {
    return getCookieData(ACCESS_TOKEN);
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const request = (
  baseUrl?: string,
  defaultHeaders?: Record<string, string>
) => {
  return new Request(baseUrl, defaultHeaders);
};
