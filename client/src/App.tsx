import './assets/styles.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, getCurrentSession } from './store';

import { Outlet } from 'react-router-dom';

import SideNav from './components/SideNav/SideNav';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentSession());
  }, [dispatch]);

  return (
    <div className='app'>
      <SideNav />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}
