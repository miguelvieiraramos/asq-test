import '../App.css';
import Logo from '../assets/logo_10anos.png'
import { Link } from "react-router-dom";

function Header({ setIsSideNavActive }) {

  return (
    <header>
      <nav className="nav">
        <div className="nav__wrapper">
          <div className="nav__logo">
            <Link to="/"><img src={Logo} alt="Logo Qualirede dez anos" /></Link>
          </div>
          <ul className="nav__menu">
            <li className="nav__item"><Link to="/procedimentos">Procedimentos</Link></li>
            <li className="nav__item"><Link to="/autorizacoes">Autorizações</Link></li>
            <li className="nav__item"><Link to="/solicitacoes">Solicitações</Link></li>
          </ul>
          <div onClick={() => setIsSideNavActive(true)} className="nav__hamburguer">
            <div className="nav__line"></div>
            <div className="nav__line"></div>
            <div className="nav__line"></div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
