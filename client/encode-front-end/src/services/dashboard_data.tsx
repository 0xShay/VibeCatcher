// File: client/encode-front-end/src/services/dashboard_data.tsx
// This file contains dashboard data service
// Importing necessary modules
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Defining dashboard data service

class ApiService {
  private readonly httpClient: AxiosInstance;

  constructor(baseURL: string) {
    this.httpClient = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Here you can add interceptors if needed
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

  // Add more methods as needed
}

// You can export a singleton instance or create a new instance where needed
const BASE_URL = 'https://your.api.url.here'; // Replace with your actual API base URL
const apiService = new ApiService(BASE_URL);

// Exporting dashboard data service
export default apiService;
