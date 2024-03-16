import client from '@/lib/axios';
import { PaginatedResponse, VideoDetails, VideoSummary } from '@/types';

export const uploadVideo = async (formData: FormData): Promise<number> => {
  const response = await client.post('/upload-video', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.status;
};

export const getVideos = async (page: number): Promise<PaginatedResponse<VideoSummary>> => {
  const response = await client.get(`/videos?page=${page}`);
  return response.data;
};

export const getVideo = async (uuid: string): Promise<VideoDetails> => {
  const response = await client.get(`/video?uuid=${uuid}`);
  return response.data;
};
