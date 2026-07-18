import React from 'react';
import { Circles } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <Circles
        height="80"
        width="80"
        color="#0a66c2"
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;