import { ChangeEvent, ReactNode } from 'react';
import { VisuallyHiddenInput } from '@/styled-components';
import { UploadVideoProps } from '@/components/UploadVideo/types.ts';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadVideo = ({ onUpload }: UploadVideoProps): ReactNode => {
  const handleUpload = async (event: ChangeEvent): Promise<void> => {
    const [file] = (event.target as HTMLInputElement).files ?? [null];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('video', file);
      onUpload(formData);
    }
  };

  return (
    <Button
      component='label'
      role='button'
      variant='contained'
      tabIndex={ -1 }
      startIcon={ <CloudUploadIcon /> }
    >
      Upload a video
      <VisuallyHiddenInput
        type='file'
        accept='video/mp4,video/x-m4v,video/*'
        onChange={ handleUpload }
      />
    </Button>
  );
};

export default UploadVideo;
