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
        <i title="Taskify" className="fa-solid fa-check-double"></i>
      </Link>
      <div className="nav-menu-container">
        <ul className="nav-menu">{renderLinks(navLinks)}</ul>
        <ul className="nav-submenu">{renderLinks(subNavLinks)}</ul>
      </div>
    </div>
  );
}
