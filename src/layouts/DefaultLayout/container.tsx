import styles from './styles.module.css';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

const LoadingLayout = (): ReactNode => {
  return (
    <main className={ styles.viewport }>
      <Outlet />
    </main>
  );
};

export default LoadingLayout;
