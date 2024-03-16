import { ReactNode } from 'react';
import { VideoPreviewProps } from '@/components/VideoPreview/types.ts';
import { getVideoDuration } from '@/components/VideoPreview/helpers.ts';
import { useNavigate } from 'react-router-dom';
import { HLSPaths } from '@/types';

const VideoPreview = ({
  id,
  name,
  previewUrl,
  duration,
}: VideoPreviewProps): ReactNode => {
  const videoDuration: string = getVideoDuration(duration);
  const navigate = useNavigate();

  const handleClick = (id: string): void => {
    navigate(`${HLSPaths.VIDEO}/${id}`);
  };

  return (
    <article onClick={() => handleClick(id)} className='flex flex-col gap-y-2 flex-shrink-0 flex-grow-0 flex-basis-0'>
      <img className='w-full overflow-hidden rounded-md h6' alt='video-preview' src={previewUrl} />
      <h2 className='text-lg font-bold flex justify-between items-center'>
        {name}
        <span className='text-sm'>
          {videoDuration}
        </span>
      </h2>
    </article>
  );
};

export default VideoPreview;
