import { ReactNode } from 'react';
import { VideoLength, VideoPreviewProps } from '@/components/VideoPreview/types.ts';
import { getVideoLength } from '@/components/VideoPreview/helpers.ts';
import { useNavigate } from 'react-router-dom';
import { HLSPaths } from '@/types';

const VideoPreview = ({
  uuid,
  name,
  previewUrl,
  length,
}: VideoPreviewProps): ReactNode => {
  const videoLength: VideoLength = getVideoLength(length);
  const navigate = useNavigate();

  const handleClick = (uuid: string): void => {
    navigate(`${ HLSPaths.VIDEO }/${ uuid }`);
  };

  return (
    <article onClick={ () => handleClick(uuid) } className='flex flex-col gap-y-2 flex-shrink-0 flex-grow-0 flex-basis-0'>
      <img className='w-full overflow-hidden rounded-md h6' alt='video-preview' src={ previewUrl } />
      <h2 className='text-lg font-bold flex justify-between items-center'>
        { name }
        <span className='text-sm'>
          { videoLength.minutes }:{ videoLength.seconds }
        </span>
      </h2>
    </article>
  );
};

export default VideoPreview;
