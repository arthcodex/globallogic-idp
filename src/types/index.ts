export enum CommonPaths {
  ROOT = '/',
  ERROR = '/error',
  NOT_FOUND = '*',
}

export enum HLSPaths {
  VIDEOS = '/videos',
  VIDEO = `/video`,
  UPLOAD = '/upload-video',
}

export type PaginatedResponse<T> = {
  totalPages: number;
  page: number;
  items: T[];
};

export type VideoSummary = {
  uuid: string;
  length: number;
  name: string;
  previewUrl: string;
};

export type VideoDetails = {
  name: string;
  uuid: string;
  m3u8: string;
};
