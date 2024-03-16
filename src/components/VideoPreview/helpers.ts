export const getVideoDuration = (duration: number): string => {
  const minutes: number = Math.floor(duration / 60);
  const seconds: number = duration % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
