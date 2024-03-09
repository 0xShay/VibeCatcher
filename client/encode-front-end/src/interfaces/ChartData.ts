// File: client/encode-front-end/src/interfaces/ChartData.ts
// This file contains ChartData interface

export interface ISentimentScore {
    timestamp: string; // ISO string or your preferred format
    score: number;
  }

export interface IStreamData {
    label: string;
    data: ISentimentScore[];
    borderColor: string;
    backgroundColor: string;
  }
  
export interface IEntitySentiment {
    entity: string;
    score: number;
  }

export interface PieChartProps {
    sentimentLabels: { label: string; count: number }[];
  }

export interface IStreamSentimentData {
    streamId: string; // Identifier for the stream
    data: ISentimentScore[]; // Sentiment data for the stream
  }

export interface IComparisonChartData {
    streams: IStreamSentimentData[]; // Array of stream sentiment data for comparison
  }
