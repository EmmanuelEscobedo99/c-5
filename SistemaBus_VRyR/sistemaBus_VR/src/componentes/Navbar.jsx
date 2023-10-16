import { Link } from "react-router-dom"
import "../archivosCss/estilo.css"
import { NavLink } from 'react-router-dom'
import Login from "./Login"
import Dropdown from 'react-bootstrap/Dropdown'
import { useState, useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCar, faSearch, faUser, faSignOutAlt, faCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons" // Asegúrate de importar los iconos que necesitas


const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
  const [userData, setUserData] = useState([]);
  let results = []

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      const traerUsuario = async () => {
        if (token) {
          try {
            const res = await axios.get('http://localhost:8081/todosDatos', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUserData(res.data);
          } catch (err) {
            console.error(err);
          }
        }
      };
      traerUsuario();
    }
  }, [isLoggedIn]);

  results = userData
  let correo = ""

  results.map(userData => {
    correo = userData.correoIns
  })

  const handleChange = (e) => {
    localStorage.removeItem('token')
    Location.reload()
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-custom">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              <nav>
                <ul>
                  <div className="logo">
                    <span></span>
                    <h4 style={{paddingRight:"65px", fontSize:"19px"}} className="navbar-title">BUS DE INTEGRACIÓN</h4>
                  </div>
                  <li>
                    <NavLink to="/Registrar" className={({ isActive }) => isActive ? "active" : ""}>
                      <FontAwesomeIcon icon={faCar} /> Registrar vehiculo
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/ListaArchivos" className={({ isActive }) => isActive ? "active" : ""}>
                      <FontAwesomeIcon icon={faSearch} /> Buscar vehiculo
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/RegistroUsuarios" className={({ isActive }) => isActive ? "active" : ""}>
                      <FontAwesomeIcon icon={faUser} /> Registrar usuarios
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" onClick={handleChange} className={({ isActive }) => isActive ? "active" : ""}>
                      <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
                    </NavLink>
                  </li>

                  <li>
                    <Dropdown id="MyDropDown" className="d-inline mx-2 custom-frop">
                      <Dropdown.Toggle variant="transparent" id="dropdown-autoclose-true">
                        <FontAwesomeIcon icon={faCheck} /> Falta Verificar
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="/TablaRecuperado">
                          <FontAwesomeIcon icon={faArrowRight} /> Vehículos Recuperados
                        </Dropdown.Item>
                        <Dropdown.Item href="/TablaEntregado">
                          <FontAwesomeIcon icon={faArrowRight} /> Vehículos Entregados
                        </Dropdown.Item>
                        <Dropdown.Item href="/">
                          <FontAwesomeIcon icon={faArrowRight} /> Menu Item
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                  <li>
                    <p style={{marginLeft:"200px", color:"black", paddingTop:"15px"}}><FontAwesomeIcon icon={faUser} className="mr-2" /> Bienvenid@: {correo}</p>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar