// File: client/encode-front-end/src/interfaces/ChartData.ts
// This file contains ChartData interface

export interface ISentimentScore {
    timestamp: string; // ISO string or your preferred format
    score: number;
  }
  
  export interface IEntitySentiment {
    entity: string;
    score: number;
  }
