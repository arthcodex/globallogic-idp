import * as api from '@/lib/api';
import Videos from '@/pages/Videos/container.tsx';
import VideoPreview from '@/components/VideoPreview/container.tsx';
import UploadVideo from '@/components/UploadVideo/container.tsx';
import { VideoDetailsResponse } from '@/types/video.ts';
import { mount, ReactWrapper } from 'enzyme';

const mockVideosList: VideoDetailsResponse[] = [
  {
    _id: 'id1',
    name: 'Video 1',
    duration: 100,
    alive: true,
  },
  {
    _id: 'id2',
    name: 'Video 2',
    duration: 250,
    alive: true,
  },
  {
    _id: 'id3',
    name: 'Video 3',
    duration: 700,
    alive: true,
  },
  {
    _id: 'id4',
    name: 'Video 4',
    duration: 500,
    alive: true,
  },
  {
    _id: 'id5',
    name: 'Video 5',
    duration: 1000,
    alive: true,
  },
];

describe('<Videos /> component', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    jest.spyOn(api, 'getVideos').mockImplementation(async (page) => ({
      data: mockVideosList,
      totalPages: page + 1,
      page,
    }));
    wrapper = mount(<Videos />);
  });

  it('should render title correctly', () => {
    expect(wrapper.contains('Videos')).toEqual(true);
  });

  it('should render upload button', () => {
    expect(wrapper.find(UploadVideo)).toHaveLength(1)
  });

  it('should render 5 video previews', () => {
    expect(wrapper.find(VideoPreview)).toHaveLength(5);
  });
});
