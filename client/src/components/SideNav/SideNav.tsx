import './assets/styles.scss';

export default function Nav() {
  return (
    <div className='nav'>
      <div className='nav-logo'>T3</div>
      <div className='nav-menu-container'>
        <ul className='nav-menu'>
          <li>
            <a href='/dashboard'>
              <div className='nav-icon'></div>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href='/tasks'>
              <div className='nav-icon'></div>
              <span>Tasks</span>
            </a>
          </li>
          <li>
            <a href='/login'>
              <div className='nav-icon'></div>
              <span>Logout</span>
            </a>
          </li>
        </ul>
        <ul className='nav-submenu'>
          <li>
            <a href='/settings'>
              <div className='nav-icon'></div>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
