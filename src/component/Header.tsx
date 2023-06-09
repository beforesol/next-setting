import React from 'react';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';
const cx = classNames.bind(styles);

interface IOwnProps {
};

const Header: React.FC<IOwnProps> = ({

}) => {
  return (
    <div className={cx('header')}>Header</div>
  )
}

export default Header;