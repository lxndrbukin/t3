import { NavLink } from "../types";

export const navLinks: Array<NavLink> = [
  { name: "Boards", href: "/boards", icon: "fa-solid fa-table" },
  { name: "Search", href: "/search", icon: "fa-solid fa-magnifying-glass" },
  { name: "New Task", href: "#", icon: "fa-solid fa-plus" },
];

export const subNavLinks: Array<NavLink> = [
  { name: "Settings", href: "/settings", icon: "fa-solid fa-gear" },
  {
    name: "Login",
    href: "/auth",
    icon: "fa-solid fa-right-to-bracket",
    auth: false,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "fa-solid fa-circle-user",
    auth: true,
  },
];
