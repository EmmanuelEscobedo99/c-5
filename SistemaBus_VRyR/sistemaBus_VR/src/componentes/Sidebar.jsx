import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <h4 style={{fontSize:"19px"}}>FALTA VERIFICAR</h4>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/" style={{fontSize:"15px"}}>Vehuculos Recuperados</Link>
        </li>
        <li>
          <Link to="/registros">Registros</Link>
        </li>
        {/* Agrega más enlaces según tus necesidades */}
      </ul>
    </nav>
  );
};

export default Sidebar;
