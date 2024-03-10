// File: client/encode-front-end/src/services/apiService.tsx
// This file contains ApiService class

// Implement API service class to fetch data from backend
// Importing necessary modules
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000'; // Ensure this matches your actual backend server address

export class ApiService {
  private readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: BASE_URL,
      withCredentials: true, // This is important for sessions to work
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Redirects the user to Google's OAuth 2.0 login page
  public login() {
    window.location.href = `${BASE_URL}/auth/google`;
  }

  // Logs the user out by hitting the logout endpoint
  public async logout(): Promise<AxiosResponse> {
    return this.httpClient.get("/logout"); // Changed from "/api/logout" to match your backend route
  }

  // Fetches the user's channels
  public getChannels(): Promise<AxiosResponse> {
    return this.httpClient.get("/api/get-channels");
  }

  // Fetches recent live streams for a channel
  public getRecentLiveStreams(): Promise<AxiosResponse> {
    return this.httpClient.get("/api/get-recent-live-streams");
  }

  // Inserts channels into the database
  public insertChannels(): Promise<AxiosResponse> {
    return this.httpClient.get("/api/insert-channels");
  }

  // Gets the user data
  public async getUserData(): Promise<AxiosResponse> {
    return this.httpClient.get("/api/get-user-data");
  }

  // Fetches stream analytics for a specific stream ID
  public async getStreamAnalytics(streamId: string): Promise<AxiosResponse> {
    return this.httpClient.get(`/api/stream-analytics/${streamId}`);
  }

  // Performs sentiment analysis on the given stream ID
  public performSentimentAnalysis(streamID: string, timestamp: number, messages: string[]): Promise<AxiosResponse> {
    return this.httpClient.post('/sentimentAnalysis', { streamID, timestamp, messages });
  }

  // Utility methods for GET, POST, PUT, DELETE
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

const apiService = new ApiService();
export default apiService;
