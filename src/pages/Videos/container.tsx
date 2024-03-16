import { ChangeEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import { Pagination, Snackbar } from '@mui/material';
import { VideoSummary } from '@/types';
import { getVideos, uploadVideo } from '@/lib/api';
import VideoPreview from '@/components/VideoPreview/container.tsx';
import UploadVideo from '@/components/UploadVideo/container.tsx';

const Videos = (): ReactNode => {
  const [isErrorActive, setIsErrorActive] = useState<boolean>(false);
  const [videos, setVideos] = useState<VideoSummary[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchVideos = useCallback(async (page: number): Promise<void> => {
    try {
      const response = await getVideos(page);
      setVideos(response.items);
      setTotalPages(response.totalPages);
    } catch (error) {
      setIsErrorActive(true);
    }
  }, []);

  useEffect(() => {
    (async function() {
      await fetchVideos(page);
    })();
  }, [fetchVideos, page]);

  const handleUpload = async (formData: FormData): Promise<void> => {
    try {
      await uploadVideo(formData);
    } catch (error) {
      setIsErrorActive(true);
    }
  };

  const handlePagination = (_: ChangeEvent<unknown>, page: number): void => {
    setPage(page);
  };

  return (
    <>
      <h1 className='text-4xl mb-6 font-bold flex justify-between'>
        Videos
        <UploadVideo onUpload={ handleUpload } />
      </h1>

      <section className='w-full gap-4 grid grid-cols-1 justify-between md:grid-cols-3'>
        { videos.map((video) => (
          <VideoPreview
            key={ video.uuid }
            uuid={ video.uuid }
            name={ video.name }
            previewUrl={ video.previewUrl }
            length={ video.length }
          />
        )) }
      </section>

      { totalPages > 0 && <Pagination
        count={ totalPages }
        page={ page }
        onChange={ handlePagination }
      /> }

      <Snackbar
        autoHideDuration={ 3000 }
        message='Error while fetching videos API :('
        onClose={ () => setIsErrorActive(false) }
        open={ isErrorActive }
      />
    </>
  );
};

export default Videos;
