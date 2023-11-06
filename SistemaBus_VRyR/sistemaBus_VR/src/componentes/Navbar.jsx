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
      <div>
        <center><h2 style={{paddingTop:"30px", paddingBottom:"20px"}}>BUS DE INTEGRACIÓN</h2></center>
      </div>
      <div style={{marginLeft:"40px", marginRight:"40px"}}>
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
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup" >
            <div className="navbar-nav " >
              <nav >
                <ul>
                  <div className="logo">
                    <span></span>
                    
                  </div>
                  <li>
                    <img src="/src/assets/logo2.jpeg" style={{ width: "75px"}} />
                  </li>
                  <li>
                    <NavLink to="/Registrar" className={({ isActive }) => isActive ? "active" : ""}>
                      Registrar 
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/ListaArchivos" className={({ isActive }) => isActive ? "active" : ""}>
                      <FontAwesomeIcon icon={faSearch} /> Búsqueda
                    </NavLink>
                  </li>
                 {/* <li>
                    <NavLink to="/RegistroUsuarios" className={({ isActive }) => isActive ? "active" : ""}>
                       Registrar usuarios
                    </NavLink>
  </li>*/}
                 

                  <li>
                    <Dropdown id="MyDropDown" className="d-inline mx-2 custom-frop">
                      <Dropdown.Toggle variant="transparent" id="dropdown-autoclose-true">
                        Subir Registros
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="/TablaRecuperado">
                          <FontAwesomeIcon icon={faArrowRight} /> Vehículos Recuperados
                        </Dropdown.Item>
                        <Dropdown.Item href="/TablaEntregado">
                          <FontAwesomeIcon icon={faArrowRight} /> Vehículos Entregados
                        </Dropdown.Item>
                        <Dropdown.Item href="/lrsr">
                          <FontAwesomeIcon icon={faArrowRight} /> Vehiculos Robados
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                  {/*<li>
                    <NavLink to="/" onClick={handleChange} className={({ isActive }) => isActive ? "active" : ""}>
                      Cerrar sesión
                    </NavLink>
  </li>*/}

                  <li>
                    <Dropdown id="MyDropDown" className="d-inline mx-2 custom-frop">
                      <Dropdown.Toggle variant="transparent" id="dropdown-autoclose-true">
                        Sistema
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="/RegistroUsuarios">
                          <FontAwesomeIcon icon={faArrowRight} /> registrar usuarios
                        </Dropdown.Item>
                        <Dropdown.Item href="/" onClick={handleChange}>
                          <FontAwesomeIcon icon={faArrowRight} /> cerrar sesión
                        </Dropdown.Item>

                      </Dropdown.Menu>
                    </Dropdown>
                  </li>

                  <li>
                    <p style={{ marginLeft: "300px", color: "black", paddingTop: "15px" }}> Bienvenido: {correo}</p>
                  </li>
                  <li>
                    <img src="/src/assets/logo1.jpeg" style={{ width: "150px", marginLeft:"20px"}} />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </nav>
      </div>
    </>
  );
}

export default Navbar