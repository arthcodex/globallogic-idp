import client from '@/lib/axios';
import { VideoUploadResponse, VideoDetailsResponse } from '@/types/video';
import { PaginatedResponse } from '@/types/pagination';

export const VIDEO_DIRECTORY_URL = client.getUri({ url: '/public/storage/' });

export const uploadVideo = async (formData: FormData): Promise<VideoUploadResponse> => {
  const response = await client.post('/videos/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getVideos = async (page: number): Promise<PaginatedResponse<VideoDetailsResponse>> => {
  const response = await client.get(`/videos?page=${page}`);
  return response.data;
};

export const getVideo = async (id: string): Promise<VideoDetailsResponse> => {
  const response = await client.get(`/videos/${id}`);
  return response.data;
};
