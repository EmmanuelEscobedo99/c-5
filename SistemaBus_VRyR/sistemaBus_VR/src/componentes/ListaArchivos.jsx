import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import ReactPaginate from "react-paginate";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../archivosCss/estilo.css";

const ListaArchivos = () => {
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
  const [userData, setUserData] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [validado, setValidado] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const registroVerificadoId = localStorage.getItem("registroVerificadoId");
    if (!registroVerificadoId) {
      console.log("NO SE PUEDE ACCEDER");
    } else {
      if (registroVerificadoId === id) {
        setValidado(true);
      } else {
        setValidado(false);
      }
      console.log("SI SE PUEDE ACCEDER");
    }
  }, [id]);

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
  };

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

  const btn_busqueda = (e) => {
    setBusqueda(e.target.value);
  };

  let filteredResults = registros;

  if (busqueda) {
    const searchTerms = busqueda.toLowerCase().split(' ');

    filteredResults = registros.filter((datos) => {
      return searchTerms.every((term) => {
        return (
          datos.AVERIGUACION.toLowerCase().includes(term) ||
          datos.PLACA.toLowerCase().includes(term) ||
          datos.FECHA_ROBO.includes(term) ||
          datos.NOMBRE_DEN.toLowerCase().includes(term)
        );
      });
    });
  }

  const cardsPerPage = 3;
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
        {/*<p style={{ color: registro.recuperado ? "green" : "red", fontSize: "15px" }}>
          {registro.recuperado ? "RECUPERADO" : "NO RECUPERADO"}
    </p>*/}
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
          <Navbar />
          <div className="titulo">
            <h3>Vehiculos Robados</h3>
            {userData.map((user) => (
              <div key={user.id}></div>
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
