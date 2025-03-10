import { HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Exception } from 'src/error/error.service';

class Request {
  private axiosInstance: AxiosInstance;
  constructor(
    baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL,
    defaultHeaders?: Record<string, string>,
  ) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        ...defaultHeaders,
      },
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return error;
      },
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        return new Exception('Bad Request', HttpStatus.BAD_REQUEST);
      },
    );
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const  request = (
  baseUrl?: string,
  defaultHeaders?: Record<string, string>,
) => {
  return new Request(baseUrl, defaultHeaders);
};
