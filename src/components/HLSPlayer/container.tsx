import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { HLSPlayerProps } from '@/components/HLSPlayer/types.ts';
import Hls, { ErrorTypes } from 'hls.js';

const withHlsSupport = <T,>(component: FC<T>): FC<T> => {
  return (props: T): ReactNode => {
    if (!Hls.isSupported()) {
      return <span>HLS is not supported by your browser!</span>;
    }

    return component(props);
  };
};

const HLSPlayerComponent = ({ source, hlsConfig, ...props }: HLSPlayerProps): ReactNode => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isErrorOccurred, setIsErrorOccurred] = useState<boolean>(false);

  useEffect(() => {
    const hls: Hls = new Hls({
      enableWorker: true,
      ...hlsConfig,
    });

    if (videoRef.current) {
      hls.attachMedia(videoRef.current);
    }

    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(source);
    });

    hls.on(Hls.Events.ERROR, (_, data) => {
      console.log(data.type);
      switch (data.type) {
        case ErrorTypes.NETWORK_ERROR:
          hls.startLoad();
          break;
        case ErrorTypes.MEDIA_ERROR:
          hls.recoverMediaError();
          break;
        default:
          setIsErrorOccurred(true);
          break;
      }
    });

    return () => {
      hls.destroy();
      setIsErrorOccurred(false);
    }
  }, [hlsConfig, source, videoRef, isErrorOccurred]);

  return <video ref={videoRef} {...props}></video>;
};

const HLSPlayer = withHlsSupport(HLSPlayerComponent)

export default HLSPlayer;
