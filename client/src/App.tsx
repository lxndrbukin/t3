import './assets/styles.scss';

import { Outlet } from 'react-router-dom';

import SideNav from './components/SideNav/SideNav';

export default function App() {
  return (
    <div className='app'>
      <SideNav />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}
