import { VideoLength } from '@/components/VideoPreview/types.ts';

export const getVideoLength = (length: number): VideoLength => {
  const minutes: number = Math.floor(length / 60);
  const seconds: number = length % 60;
  return { minutes, seconds };
};
