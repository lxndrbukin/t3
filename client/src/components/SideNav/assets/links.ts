import { NavLink } from '../types';

export const navLinks: Array<NavLink> = [
  { name: 'Dashboard', href: '/dashboard', icon: '' },
  { name: 'Boards', href: '/boards', icon: 'fa-solid fa-table' },
  { name: 'Members', href: '/members', icon: '' },
];

export const subNavLinks: Array<NavLink> = [
  { name: 'Settings', href: '/settings', icon: 'fa-solid fa-gear' },
  { name: 'Login', href: '/login', icon: 'fa-solid fa-right-to-bracket' },
];
