import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import ReactPaginate from "react-paginate";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar"; // Asegúrate de importar el componente Navbar
import "../archivosCss/estilo.css"; // Asegúrate de importar tus estilos existentes si es necesario


const ListaArchivos = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
  const [userData, setUserData] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [pageNumber, setPageNumber] = useState(0); // Página actual

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

  let filteredResults = [];
  if (!busqueda) {
    filteredResults = registros;
  } else {
    filteredResults = registros.filter((datos) =>
      datos.AVERIGUACION.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  // Paginación
  const cardsPerPage = 3; // Cantidad de tarjetas por página
  const pagesVisited = pageNumber * cardsPerPage;
  const pageCount = Math.ceil(filteredResults.length / cardsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayResults = filteredResults
    .slice(pagesVisited, pagesVisited + cardsPerPage)
    .map((registro, i) => (
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
          <div className="btn-container">
            <Link id="btn" className="btn" to={`/detalles/${registro.ID_ALTERNA}`}>
              Detalles
            </Link>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar /> {/* Renderiza el componente Navbar */}
          <div className="titulo">
            <h3>Registros</h3>
            {userData.map((user) => (
              <div key={user.id}>
                {/* Render user-specific content here */}
              </div>
            ))}
          </div>
          <div className="search-container">
            <div className="search-input">
              <input
                value={busqueda}
                onChange={btn_busqueda}
                type="text"
                placeholder="Búsqueda"
                className="google"
              />
            </div>
          </div>
          <div>
            <section>
              <div className="container">
                <div className="cards">{displayResults}</div>
                <ReactPaginate
                  previousLabel={"Anterior"}
                  nextLabel={"Siguiente"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"pagination-container"} 
                  previousLinkClassName={"pagination-button previous"} 
                  nextLinkClassName={"pagination-button next"} 
                  disabledClassName={"disabled"}
                  activeClassName={"pagination-button active"} 
                />
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
