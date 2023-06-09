import React, { useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './index.module.scss';
import Header from '@src/component/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/../config/store';
import { fetchHomeData } from '@src/../reducers/HomeReducer';

const cx = classNames.bind(styles);

interface IOwnProps {
};

const Home: React.FC<IOwnProps> = ({

}) => {
  const { data } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeData({ id: 1 }));
  }, []);

  console.log('fetchHomeData:', data);

  return (
    <div className={cx('home')}>
      <Header />
      <img src="/assets/img/ico_loading.gif" />
    </div>
  )
}

export default Home;