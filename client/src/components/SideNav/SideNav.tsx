import './assets/styles.scss';

import { NavLink } from './types';

import { navLinks, subNavLinks } from './assets/links';

export default function SideNav() {
  const renderLinks = (links: Array<NavLink>) => {
    return links.map(({ name, href, icon }: NavLink) => {
      return (
        <li key={name}>
          <a href={href}>
            <div className='nav-icon'></div>
            <span>{name}</span>
          </a>
        </li>
      );
    });
  };

  return (
    <div className='nav'>
      <div className='nav-logo'>T3</div>
      <div className='nav-menu-container'>
        <ul className='nav-menu'>{renderLinks(navLinks)}</ul>
        <ul className='nav-submenu'>{renderLinks(subNavLinks)}</ul>
      </div>
    </div>
  );
}
