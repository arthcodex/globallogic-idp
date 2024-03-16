import React from 'react';
import { HlsConfig } from 'hls.js';

export type HLSPlayerProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  source: string;
  hlsConfig?: HlsConfig;
};
