import {Link} from 'react-router-dom';
import "../App.css"

function Navbar(){
  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">
        Inicio
      </Link>
      <Link className="nav-link" to="/preprimaria">
        Pre-Primaria
      </Link>
      <Link className="nav-link" to="/primaria">
        Primaria
      </Link>
      <Link className="nav-link" to="/reporte">
        Reporte
      </Link>
    </nav>
  );
};

export default Navbar;