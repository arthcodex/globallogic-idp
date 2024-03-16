import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { Pagination, Snackbar } from '@mui/material';
import { getVideos, uploadVideo, VIDEO_DIRECTORY_URL } from '@/lib/api';
import { VideoDetailsResponse } from '@/types/video.ts';
import VideoPreview from '@/components/VideoPreview/container.tsx';
import UploadVideo from '@/components/UploadVideo/container.tsx';
import { useNavigate } from 'react-router-dom';
import { HLSPaths } from '@/types/router.ts';

const Videos = (): ReactNode => {
  const [isErrorActive, setIsErrorActive] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [videos, setVideos] = useState<VideoDetailsResponse[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const navigate = useNavigate();

  const fetchVideos = async (page: number): Promise<void> => {
    try {
      const response = await getVideos(page);
      setVideos(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      setIsErrorActive(true);
    }
  };

  useEffect(() => {
    (async function() {
      await fetchVideos(page);
    })();
  }, [page]);

  const handleUpload = async (formData: FormData): Promise<void> => {
    setIsUploading(true);

    try {
      const video = await uploadVideo(formData);
      navigate(`${HLSPaths.VIDEO}/${video._id}`);
    } catch (error) {
      setIsErrorActive(true);
    }

    setIsUploading(false);
  };

  const handlePagination = (_: ChangeEvent<unknown>, page: number): void => {
    setPage(page - 1);
  };

  return (
    <>
      <h1 className='text-4xl mb-6 font-bold flex justify-between'>
        Videos
        <UploadVideo onUpload={handleUpload} disabled={isUploading} />
      </h1>

      <section className='w-full gap-4 grid grid-cols-1 justify-between md:grid-cols-3'>
        {videos.map((video) => (
          <VideoPreview
            key={video._id}
            id={video._id}
            name={video.name}
            previewUrl={`${VIDEO_DIRECTORY_URL}/${video._id}/${video._id}.png`}
            duration={video.duration}
          />
        ))}
      </section>

      <div className='flex w-full justify-center mt-8'>
        {totalPages > 0 && <Pagination
          count={totalPages}
          page={page + 1}
          onChange={handlePagination}
        />}
      </div>

      <Snackbar
        autoHideDuration={3000}
        message='Error while fetching videos API :('
        onClose={() => setIsErrorActive(false)}
        open={isErrorActive}
      />
    </>
  );
};

export default Videos;
