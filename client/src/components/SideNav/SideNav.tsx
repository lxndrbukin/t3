import './assets/styles.scss';

export default function Nav() {
  return (
    <div className='nav'>
      <div className='nav-logo'>T3</div>
      <ul className='nav-menu'>
        <li>
          <a href='/dashboard'>Dashboard</a>
        </li>
        <li>
          <a href='/tasks'>Tasks</a>
        </li>
        <li>
          <a href='/login'>Login</a>
        </li>
      </ul>
    </div>
  );
}
