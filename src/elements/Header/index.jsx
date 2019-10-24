import React from 'react';
import styles from './Header.module.scss';

const Header = (props) => {
  const { children } = props;
  return (
    <h2 className={styles.Header}>{children}</h2>
  );
};

export default Header;