import './assets/styles.scss';
import { Link } from 'react-router-dom';

import { NavLink } from './types';

import { navLinks, subNavLinks } from './assets/links';

export default function SideNav() {
  const renderLinks = (links: Array<NavLink>) => {
    return links.map(({ name, href, icon }: NavLink) => {
      return (
        <li key={name}>
          <Link to={href}>
            <i className={icon ? icon : 'nav-icon'}></i>
            <span>{name}</span>
          </Link>
        </li>
      );
    });
  };

  return (
    <div className='nav'>
      <div className='nav-logo'>Taskify</div>
      <div className='nav-menu-container'>
        <ul className='nav-menu'>{renderLinks(navLinks)}</ul>
        <ul className='nav-submenu'>{renderLinks(subNavLinks)}</ul>
      </div>
    </div>
  );
}
