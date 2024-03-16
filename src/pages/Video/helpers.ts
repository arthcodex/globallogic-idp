import client from '@/lib/axios';

export const m3u8 = (id: string): string => {
  return client.getUri({ url: `/public/storage/${id}/${id}.m3u8` });
};
