import '../App.css';
import { Link } from "react-router-dom";

function SideNav({ isSideNavActive, setIsSideNavActive }) {

  return (
    <aside>
      <nav className={isSideNavActive ? "sidenav sidenav--active " : "sidenav" }>
        <div className="sidenav__wrapper">
          <div onClick={() => setIsSideNavActive(false)} className="sidenav__close">
            <div className="sidenav__line"></div>
            <div className="sidenav__line"></div>
          </div>
          <ul className="sidenav__menu">
            <li className="sidenav__item"><Link to="/procedimentos">Procedimentos</Link></li>
            <li className="sidenav__item"><Link to="/autorizacoes">Autorizações</Link></li>
            <li className="sidenav__item"><Link to="/solicitacoes">Solicitações</Link></li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export default SideNav;
