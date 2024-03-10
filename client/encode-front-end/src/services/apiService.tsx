// File: client/encode-front-end/src/services/apiService.tsx
// This file contains ApiService class

// Implement API service class to fetch data from backend
// Importing necessary modules
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000';

export class ApiService {
  private readonly httpClient: AxiosInstance;

  constructor(baseURL: string) {
    this.httpClient = axios.create({
      baseURL,
      withCredentials: true, // Enable sending cookies over cross-domain requests
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  public getUserData(): Promise<AxiosResponse> {
    return this.httpClient.get("/api/get-user-data");
  }

  public getStreamAnalytics(): Promise<AxiosResponse> {
    return this.httpClient.get("/api/stream-analytics");
  }

  public login() {
    window.location.href = `${BASE_URL}/auth/google`;
  }

  public getChannels(): Promise<AxiosResponse> {
    return this.httpClient.get("/api/get-channels");
  }

  public getRecentLiveStreams(): Promise<AxiosResponse> {
    return this.httpClient.get("/api/get-recent-live-streams");
  }

  public insertChannels(): Promise<AxiosResponse> {
    return this.httpClient.get("/api/insert-channels");
  }

  public get<T = any>(url: string, params?: object): Promise<AxiosResponse<T>> {
    return this.httpClient.get<T>(url, { params });
  }

  public post<T = any>(url: string, data?: object): Promise<AxiosResponse<T>> {
    return this.httpClient.post<T>(url, data);
  }

  public put<T = any>(url: string, data?: object): Promise<AxiosResponse<T>> {
    return this.httpClient.put<T>(url, data);
  }

  public delete<T = any>(url: string): Promise<AxiosResponse<T>> {
    return this.httpClient.delete<T>(url);
  }
}


const apiService = new ApiService(BASE_URL);
export default apiService;
