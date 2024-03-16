import HLSPlayer from '@/components/HLSPlayer/container.tsx';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VideoDetailsResponse } from '@/types/video';
import { HLSPaths } from '@/types/router';
import { getVideo, VIDEO_DIRECTORY_URL } from '@/lib/api';

const Video = (): ReactNode => {
  const [video, setVideo] = useState<VideoDetailsResponse>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async function() {
      try {
        const video = await getVideo(id ?? '');
        setVideo(video);
      } catch (error) {
        navigate(HLSPaths.VIDEOS);
      }
    })();
  }, [navigate, id]);

  const handleBackClick = (): void => {
    navigate(HLSPaths.VIDEOS);
  };

  const m3u8 = `${VIDEO_DIRECTORY_URL}/${id}/${id}.m3u8`;

  return (video && <>
    <div className='w-full flex justify-between items-center mb-6 font-bold text-2xl'>
      {video.name}
      <button onClick={handleBackClick} type='button'
              className='text-white hover:bg-blue-700 active:bg-blue-900 focus:outline-none font-medium rounded-lg text-sm w-10 h-10 text-center bg-blue-600'>
        &larr;
      </button>
    </div>
    <HLSPlayer controls={true} source={m3u8} />
  </>);
};

export default Video;
