import client from '@/lib/axios';
import { PaginatedResponse, VideoDetails, VideoSummary } from '@/types';

export const VIDEO_DIRECTORY_URL = client.getUri({ url: '/public/storage/' });

export const uploadVideo = async (formData: FormData): Promise<number> => {
  const response = await client.post('/videos/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.status;
};

export const getVideos = async (page: number): Promise<PaginatedResponse<VideoSummary>> => {
  const response = await client.get(`/videos?page=${page}`);
  return response.data;
};

export const getVideo = async (id: string): Promise<VideoDetails> => {
  const response = await client.get(`/videos/${id}`);
  return response.data;
};
