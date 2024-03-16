import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CommonPaths, HLSPaths } from '@/types';

/* Layouts */
const DefaultLayout = lazy(
  () => import('@/layouts/DefaultLayout/container'),
);
const LoadingLayout = lazy(
  () => import('@/layouts/LoadingLayout/container'),
);

/* Pages */
const Error = lazy(
  () => import('@/pages/Error/container'),
);
const Videos = lazy(
  () => import('@/pages/Videos/container.tsx'),
);
const Video = lazy(
  () => import('@/pages/Video/container.tsx'),
);

const AppRoutes = () => (
  <Suspense fallback={ <LoadingLayout /> }>
    <Routes>
      <Route element={ <DefaultLayout /> }>
        <Route path={ CommonPaths.ROOT } element={ <Navigate to={ HLSPaths.VIDEOS } /> } />
        <Route path={ HLSPaths.VIDEOS } element={ <Videos /> } />
        <Route path={ `${ HLSPaths.VIDEO }/:uuid` } element={ <Video /> } />
        <Route path={ HLSPaths.UPLOAD } element={ <></> } />
      </Route>
      <Route path={ CommonPaths.ERROR } element={ <Error /> } />
      <Route
        path={ CommonPaths.NOT_FOUND }
        element={ <Error code={ 404 } message={ 'Page not found' } /> }
      />
    </Routes>
  </Suspense>
);

export default AppRoutes;
