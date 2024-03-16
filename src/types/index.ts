export enum CommonPaths {
  ROOT = '/',
  NOT_FOUND = '*',
}

export enum HLSPaths {
  VIDEOS = '/videos',
  VIDEO = `/video`,
}

export type PaginatedResponse<T> = {
  totalPages: number;
  page: number;
  data: T[];
};

export type VideoSummary = {
  _id: string;
  duration: number;
  name: string;
};

export type VideoDetails = {
  name: string;
  _id: string;
};
