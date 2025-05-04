import "./assets/styles.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavLink } from "./types";
import { navLinks, subNavLinks } from "./assets/links";
import { RootState } from "../../store";

export default function SideNav() {
  const { user } = useSelector((state: RootState) => state.session);

  const renderLinks = (links: Array<NavLink>) => {
    return links.map(({ name, href, icon, auth }: NavLink) => {
      if ((auth === true && !user) || (auth === false && user)) {
        return null;
      }
      return (
        <li key={name}>
          <Link title={name} to={href}>
            <i className={icon ? icon : "nav-icon"}></i>
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="nav">
      <Link to="/" className="nav-logo">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="20" y="20" width="40" height="40" rx="8" fill="#0052CC" />
          <rect
            x="40"
            y="40"
            width="40"
            height="40"
            rx="8"
            fill="#2684FF"
            opacity="0.8"
          />
        </svg>
      </Link>
      <div className="nav-menu-container">
        <ul className="nav-menu">{renderLinks(navLinks)}</ul>
        <ul className="nav-submenu">{renderLinks(subNavLinks)}</ul>
      </div>
    </div>
  );
}
