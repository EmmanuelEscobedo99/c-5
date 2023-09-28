import { Link } from "react-router-dom"
import { NavLink } from 'react-router-dom'
import Login from "./Login"

const Navbar = () => {
  const handleChange = (e) => {
    localStorage.removeItem('token')
    Location.reload()
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              <nav>
                <ul>
                  <div className="logo">
                    <span></span>
                    <h2>Registro</h2>
                  </div>
                  <li>
                    <NavLink to="/Registrar" className={({ isActive }) => isActive ? "active" : ""}>Registrar vehiculo</NavLink>
                  </li>
                  <li>
                    <NavLink to="/ListaArchivos" className={({ isActive }) => isActive ? "active" : ""}>Buscar vehiculo</NavLink>
                  </li>
                  <li>
                    <NavLink to="/RegistroUsuarios" className={({ isActive }) => isActive ? "active" : ""}>Registrar usuarios</NavLink>
                  </li>
                  <li>
                    <NavLink to="/" onClick={handleChange} className={({ isActive }) => isActive ? "active" : ""}>Cerrar sesión</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar