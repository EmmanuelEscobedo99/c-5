import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import Login from "./Login";

const MasD = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [datos, setDatos] = useState([]);
  const [validado, setValidado] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
  const [userData, setUserData] = useState([]);
  
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/buscarId/${id}`);
        setDatos(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  // Formatear la fecha
  let fechaFormat, newFechaFormat;
  let getFecha;

  let fechaFormat2, newFechaFormat2
  let getFecha2

  if (datos.FECHA_AVERIGUA) {
    getFecha = datos.FECHA_AVERIGUA;
    fechaFormat = new Date(getFecha);
    let monthFecha = (fechaFormat.getMonth() + 1).toString().padStart(2, '0');
    let dayFecha = (fechaFormat.getDate()).toString().padStart(2, '0');
    newFechaFormat = `${fechaFormat.getFullYear()}-${monthFecha}-${dayFecha}`;
  }

  if (datos.FECHA_ROBO) {
    getFecha2 = datos.FECHA_ROBO;
    fechaFormat2 = new Date(getFecha2);
    let monthFecha = (fechaFormat2.getMonth() + 1).toString().padStart(2, '0');
    let dayFecha = (fechaFormat2.getDate()).toString().padStart(2, '0');
    newFechaFormat2 = `${fechaFormat2.getFullYear()}-${monthFecha}-${dayFecha}`;
  }

  return (

    <>
      {isLoggedIn ? (
        <>
          <Navbar></Navbar>
          <div className="area_form">
            {userData.map((userData) => {
              return (
                <>

                </>
              )
            })}
            <div className="contenedor">

              <h3>Vehiculo Robado Datos Registrados</h3>

              <form className="row g-6">

                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">AVERIGUACION:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.AVERIGUACION} />
                </div>

                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">FECHA DE AVERIGUACION:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={newFechaFormat} />
                </div>

                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">AGENCIA:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.AGENCIA_MP} />
                </div>

                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">FECHA DEL ROBO:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={newFechaFormat2} />
                </div>



                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">CALLE DEL ROBO:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.CALLE_ROBO} />
                </div>




                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">NÚMERO EXTERIOR:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.NUM_EXT_ROBO} />
                </div>



                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">COLONIA DEL ROBO:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.COLONIA_ROBO} />
                </div>



                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">MUNICIPIO DEL ROBO:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.ID_MUNICIPIO_ROBO} />
                </div>




                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">ENTIDAD DEL ROBO:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.ID_ENTIDAD_ROBO} />
                </div>



                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">NOMBRE DEL DENUNCIANTE:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.NOMBRE_DEN} />
                </div>



                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">APELLIDO DEL DENUNCIANTE:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.PATERNO_DEN} />
                </div>




                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">PLACA:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.PLACA} />
                </div>



                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">MARCA DEL VEHICULO:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.ID_MARCA} />
                </div>



                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">SUBMARCA DEL VEHICULO:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.ID_SUBMARCA} />
                </div>




                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">MODELO DEL VEHICULO:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.MODELO} />
                </div>



                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">COLOR DEL VEHICULO:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.ID_COLOR} />
                </div>



                <div className="col-sm-2">
                  <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">SERIE DEL VEHICULO:</label></strong>
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.SERIE} />

                </div>

                { /* <Button variant="primary" type="submit" onClick={handleClick}></Button>  */}
                <Link to="/ListaArchivos" className="btn  btn-info " onClick={() => setIsLoggedIn(false)}> Inicio</Link>
                <Link className="btn  btn-info" to={`/recuperado/${id}`}>Recuperado</Link>
                {validado ? (
                  <>
                    <Link to={`/entregado/${id}`} className="btn  btn-info" disabled={!validado}> Entregado</Link>
                  </>
                ) : (
                  <>

                  </>
                )
                }
              </form>
              <br />
              <h4 style={{ color: 'green' }}>NOTA: Recuerda que si el botón RECUPERADO o ENTREGADO no aparecen es que la información no ha sido validada.</h4>
            </div>
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )
      }

    </>
  );
};

export default MasD;
