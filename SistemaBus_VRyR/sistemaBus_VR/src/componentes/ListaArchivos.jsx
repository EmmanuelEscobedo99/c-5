import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../archivosCss/estilo.css";
import Login from "./Login";

const ListaArchivos = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
  const [userData, setUserData] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [busqueda, setBusqueda] = useState("");

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

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  useEffect(() => {
    const buscarRegistros = async () => {
      try {
        const res = await axios.get("http://localhost:8081/registro");
        setRegistros(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    buscarRegistros();
  }, []);

  const { id } = useParams();

  const btn_busqueda = (e) => {
    setBusqueda(e.target.value);
  };

  let results = [];
  if (!busqueda) {
    results = registros;
  } else {
    results = registros.filter((datos) =>
      datos.AVERIGUACION.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar></Navbar>
          <div className="titulo">
            <h3>Registros</h3>
            {userData.map((user) => (
              <div key={user.id}>
                {/* Render user-specific content here */}
              </div>
            ))}
          </div>
          <div className="btn-busqueda">
            <input
              value={busqueda}
              onChange={btn_busqueda}
              type="text"
              placeholder="Búsqueda"
              className="form-control"
            />
          </div>
          <div>
            <section>
              <div className="container">
                <div className="cards">
                  {results.map((registro, i) => (
                    <div key={i} className="card">
                      <h4>DENUNCIANTE</h4>
                      <p>
                        {registro.NOMBRE_DEN} {registro.PATERNO_DEN}
                      </p>
                      <h4>AVERIGUACION</h4>
                      <p>{registro.AVERIGUACION}</p>
                      <h4>FECHA DE ROBO</h4>
                      <p>{formatDate(registro.FECHA_ROBO)}</p>
                      <h4>PLACA DEL VEHICULO ROBADO</h4>
                      <p>{registro.PLACA}</p>
                      <h4>MODELO</h4>
                      <p>{registro.MODELO}</p>
                      <div>
                        <Link id="btn" className="btn" to={`/detalles/${registro.ID_ALTERNA}`}>
                          Detalles
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
};

// Helper function to format a date as YYYY-MM-DD
function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default ListaArchivos;
