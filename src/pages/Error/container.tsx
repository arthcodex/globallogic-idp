import { ReactNode } from 'react';
import { ErrorProps } from '@/pages/Error/types.ts';
import { useNavigate } from 'react-router-dom';

const Error = ({
 message = 'An error occurred',
 code,
}: ErrorProps): ReactNode => {
  const navigate = useNavigate();

  return <main className='flex min-h-screen items-center justify-center'>
    <div className='text-center'>
      {code && <p className='text-base font-semibold text-indigo-600'>{code}</p>}
      <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>{message}</h1>
      <div className='mt-10 flex items-center justify-center w-full'>
        <a
          onClick={() => navigate('/')}
          className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Go back home
        </a>
      </div>
    </div>
  </main>;
};

export default Error;
