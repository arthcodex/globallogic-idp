import styles from './styles.module.css';
import { BarLoader } from 'react-spinners';
import { ReactNode } from 'react';

const LoadingLayout = (): ReactNode => {
  return (
    <main className={ styles.loading }>
      <BarLoader color={ '#FFFFFF' } loading={ true } />
    </main>
  );
};

export default LoadingLayout;
