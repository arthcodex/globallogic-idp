import { ReactNode, useEffect, useState } from 'react';
import HLSPlayer from '@/components/HLSPlayer/container.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { HLSPaths, VideoDetails } from '@/types';
import { getVideo } from '@/lib/api';

const Video = (): ReactNode => {
  const [video, setVideo] = useState<VideoDetails>();

  const { uuid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async function() {
      try {
        const video = await getVideo(uuid ?? '');
        setVideo(video);
      } catch (error) {
        navigate(HLSPaths.VIDEOS);
      }
    })();
  }, [navigate, uuid]);

  const handleBackClick = (): void => {
    navigate(HLSPaths.VIDEOS);
  };

  return (video && <>
    <div className='w-full flex justify-between items-center mb-6'>
      { video.name }
      <button onClick={ handleBackClick } type='button' className='text-white hover:bg-blue-700 active:bg-blue-900 focus:outline-none font-medium rounded-lg text-sm w-10 h-10 text-center bg-blue-600'>
        &larr;
      </button>
    </div>
    <HLSPlayer controls={ true } source={video.m3u8} />
  </>);
};

export default Video;
