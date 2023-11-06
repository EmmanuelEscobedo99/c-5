import Navbar from "../Navbar";

import { Link,/* useNavigate */ } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Ver_reg_sr = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  // const [mandarId,setMandarId] = useState([])
  const [temporal, setTemporal] = useState({
    fe: "",
    hora: "",
    ID_TEMPORAL: "",
    ID_ALTERNA: "",
    AVERIGUACION: "",
    FECHA_AVERIGUA: "",
    AGENCIA_MP: "",

    AGENTE_MP: "",
    ID_MODALIDAD: "",
    FECHA_ROBO: "",

    HORA_ROBO: "",
    CALLE_ROBO: "",
    NUM_EXT_ROBO: "",
    COLONIA_ROBO: "",

    ID_MUNICIPIO_ROBO: "",
    ID_ENTIDAD_ROBO: "",
    ID_TIPO_LUGAR: "",
    NOMBRE_DEN: "",
    PATERNO_DEN: "",

    CALLE_DEN: "",
    NUMEXT_DOM_DEN: "",
    COLONIA_DEN: "",
    ID_MUNICIPIO_DEN: "",
    ID_ENTIDAD_DEN: "",
    CP_DEN: "",
    PLACA: "",

    ID_MARCA: "",
    ID_SUBMARCA: "",
    MODELO: "",
    ID_COLOR: "",
    SERIE: "",
    ID_TIPO_USO: "",
    ID_PROCEDENCIA: "",

  })

  let [ultimo, setUltimo] = useState([]);
  setUltimo
  let [moda, setModa] = useState([]);
  let [enti, setEnti] = useState([]);
  let [muni, setMuni] = useState([]);
  let [tipo, setTipo] = useState([]);
  let [enti_den, setEnti_den] = useState([]);
  let [muni_den, setMuni_den] = useState([]);
  let [marca, setMarca] = useState([]);
  let [smarca, setSmarca] = useState([]);
  let [color, setColor] = useState([]);
  let [uso, setUso] = useState([]);
  let [pro, setPro] = useState([]);
  let [fechad, setFechad] = useState([]);
  let [fecharobo, setFecharobo] = useState([]);
  let [tipoplaca, setTipoplaca] = useState("");
  const pnacional = "Placa nacional"
  const pextranjera = " placa extranjera"

  useEffect(() => {
    traer_ultimo()
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      traer_datos()

      modalidad_moda();
      modalidad_enti()
      modalidad_muni()
      modalidad_tipo()
      modalidad_enti_den()
      modalidad_muni_den()
      modalidad_marca()
      modalidad_smarca()
      modalidad_color()
      modalidad_uso()
      modalidad_procedencia()
      traer_fecha()
      traer_fecha_robo()
    }, 2000);
    return () => clearTimeout(timer);
  })

  useEffect(() => {
    console.log("PLACA EXT", temporal.PLACA_EXT)

    if (temporal.PLACA_EXT) {
      console.log("hola 1")
      console.log("valor: ", temporal.PLACA_EXT)
      setTipoplaca(pextranjera)
    } else {
      console.log("hola 2")
      console.log("valor: ", temporal.PLACA_EXT)
      setTipoplaca(pnacional)
    }


  }, [temporal]);


  let id_temporal = id;
  temporal["id_temporal"] = id_temporal;
  console.log("id temporal: ", temporal["id_temporal"])

  function traer_ultimo() {
    axios.get("http://localhost:8081/ultimo")
      .then(res => {
        const id = res.data[0].ID_ALTERNA
        temporal["ID_ALTERNA"] = id + 1;
      })
      .catch(err => console.log(err))
  }

  function traer_fecha() {
    axios.get("http://localhost:8081/fecha/" + id)
      .then(res => {
        console.log(res)
        setFechad(res.data[0].fecha)
      })
      .catch(err => console.log(err))
  }

  function traer_fecha_robo() {
    axios.get("http://localhost:8081/fechaRobo/" + id)
      .then(res => {
        console.log(res)
        setFecharobo(res.data[0].fecha)
      })
      .catch(err => console.log(err))
  }

  function traer_datos() {
    axios.get("http://localhost:8081/bId/" + id)
      .then(res => {
        console.log(res)
        setTemporal(res.data[0])
      })
      .catch(err => console.log(err))
  }

  function modalidad_moda() {
    axios.get("http://localhost:8081/moda/" + temporal.ID_MODALIDAD)
      .then(res => {
        console.log(res)
        setModa(res.data[0].tipo)
      })
      .catch(err => console.log(err))
  }

  function modalidad_enti() {
    axios.get("http://localhost:8081/entirobo/" + temporal.ID_ENTIDAD_ROBO)
      .then(res => {
        console.log(res)
        setEnti(res.data[0].ENTIDAD)
      })
      .catch(err => console.log(err))
  }

  function modalidad_muni() {
    axios.get("http://localhost:8081/munirobo/" + temporal.ID_MUNICIPIO_ROBO)
      .then(res => {
        console.log(res)
        setMuni(res.data[0].MUNICIPIO)
      })
      .catch(err => console.log(err))
  }

  function modalidad_tipo() {
    axios.get("http://localhost:8081/tlugar/" + temporal.ID_TIPO_LUGAR)
      .then(res => {
        console.log(res)
        setTipo(res.data[0].descripcion)
      })
      .catch(err => console.log(err))
  }

  function modalidad_enti_den() {
    axios.get("http://localhost:8081/entirobo/" + temporal.ID_ENTIDAD_DEN)
      .then(res => {
        console.log(res)
        setEnti_den(res.data[0].ENTIDAD)
      })
      .catch(err => console.log(err))
  }

  function modalidad_muni_den() {
    axios.get("http://localhost:8081/munirobo/" + temporal.ID_MUNICIPIO_DEN)
      .then(res => {
        console.log(res)
        setMuni_den(res.data[0].MUNICIPIO)
      })
      .catch(err => console.log(err))
  }


  function modalidad_marca() {
    axios.get("http://localhost:8081/m_marca/" + temporal.ID_MARCA)
      .then(res => {
        console.log(res)
        setMarca(res.data[0].descripcion)
      })
      .catch(err => console.log(err))
  }

  function modalidad_smarca() {
    axios.get("http://localhost:8081/subm/" + temporal.ID_SUBMARCA)
      .then(res => {
        console.log(res)
        setSmarca(res.data[0].DESCRIPCION)
      })
      .catch(err => console.log(err))
  }

  function modalidad_color() {
    axios.get("http://localhost:8081/color/" + temporal.ID_COLOR)
      .then(res => {
        console.log(res)
        setColor(res.data[0].DESCRIPCION)
      })
      .catch(err => console.log(err))
  }

  function modalidad_uso() {
    axios.get("http://localhost:8081/tipo/" + temporal.ID_TIPO_USO)
      .then(res => {
        console.log(res)
        setUso(res.data[0].descripcion)
      })
      .catch(err => console.log(err))
  }

  function modalidad_procedencia() {
    axios.get("http://localhost:8081/pro/" + temporal.ID_PROCEDENCIA)
      .then(res => {
        console.log(res)
        setPro(res.data[0].descripcion)
      })
      .catch(err => console.log(err))
  }

  console.log("id modalidad: ", temporal.ID_MODALIDAD)
  console.log("id entidad: ", temporal.ID_ENTIDAD_ROBO)
  console.log("id municipio: ", temporal.ID_MUNICIPIO_ROBO)
  console.log(temporal)
  console.log("modalidad: ", moda)
  console.log("entidad: ", enti)
  console.log("municipio: ", muni)
  console.log("tipo: ", tipo)
  console.log("enti den: ", enti_den)
  console.log("muni den: ", muni_den)
  console.log("marca: ", marca)
  console.log("submarca: ", smarca)
  console.log("color: ", color)
  console.log("tipo: ", tipo)
  console.log("PROCEDENCIA: ", pro)
  console.log("fecha BD: ", fechad)
  console.log("objeto a guardar...", temporal)
  console.log("ultimo id", ultimo)
  // setMandarId["ID_AL"]=ultimo;
  // console.log("ultimo id",setMandarId["ID_AL"])



  /////////////////////////////////////////////////////////////////////////////////




  const handleClick = async (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:8081/tabla_VR", temporal);
      console.log(temporal)
      alert("El nuevo registro ha sido guardado correctamente ")
      navigate("/")

    } catch (err) {
      console.log(err)
    }
  }





  return (
    <>
      <Navbar></Navbar>
      <div className="area_form">
        <div className="contenedor">

          <h3>REVISION DEL REGISTRO VEHICULO ROBADO</h3>

          <div className="row">
            <h3>Datos de registro de la averiguación</h3>
            <div className="col-sm-6">

              <label className="form-label"><strong>NÚMERO DE AVERIGUANCION PREVIA ASIGNADA:</strong>

              </label>
              <input
                type="text"
                className="form-control"
                id="averiguacion_"
                name="averiguacion"

                value={temporal.AVERIGUACION}
              />

            </div>

            {/*  */}

            <div className="col-6">
              <label className="form-label"><strong>FECHA EN LA QUE SE DIO DE ALTA LA DENUNCIA</strong></label>
              <input
                type="TEXT"
                className="form-control"
                id="fecha_averigua"
                name="fecha_averigua"
                value={fechad}
              />
            </div>
          </div>
          <br />


          <div className="row">
            <div className="col-6 ">
              <label className="form-label"> <strong>AGENCIA DEL MINISTERIO PÚBLICO DONDE SE HIZO LA DENUNCIA</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="agencia_mp"
                name="agencia_mp"
                value={temporal.AGENCIA_MP} />
            </div>

            <div className="col-6 ">
              <label className="form-label">
                <strong>AGENTE DEL MINISTERIO PÚBLICO QUE LEVANTO LA
                  DENUNCIA:</strong>

              </label>
              <input
                type="text"
                className="form-control"
                id="agente_mp"
                name="agente_mp"
                value={temporal.AGENTE_MP} />
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-4">
              <label className="form-label">
                <strong> MODALIDAD DEL ROBO</strong>
              </label>
              <input
                name="id_modalidad"
                className="form-control"
                value={moda}>
              </input>
            </div>

            <div className="col-4">
              <label className="form-label">
                <strong>FECHA DEL ROBO</strong></label>
              <input
                type="TEXT"
                className="form-control"
                id="fecha_robo"
                name="fecha_robo"
                value={fecharobo} />
            </div>

            <div className="col-4">
              <label className="form-label">
                <strong>HORA DEL ROBO</strong>
              </label>
              <input
                type="time"
                className="form-control"
                id="hora_robo"
                name="hora_robo"
                value={temporal.HORA_ROBO} />
            </div>

          </div>
          <br />
          <div className="row">
            <div className="col-4">
              <label className="form-label">
                <strong> CALLE DONDE OCURRIO EL ROBO</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="calle_robo"
                name="calle_robo"
                value={temporal.CALLE_ROBO}
              />

            </div>
            <br />
            <div className="col-4">
              <label className="form-label">
                <strong>NUMERO EXTERIOR DONDE OCURRIO EL ROBO</strong>

              </label>
              <input
                type="text"
                className="form-control"
                id="num_ext_robo"
                name="num_ext_robo"
                value={temporal.NUM_EXT_ROBO} />
            </div>
            <br />
            <div className="col-4">
              <label className="form-label">
                <strong>COLONIA DONDE OCURRIO EL ROBO</strong>

              </label>
              <input
                type="text"
                className="form-control"
                id="colonia_robo"
                name="colonia_robo"
                value={temporal.COLONIA_ROBO} />
            </div>
          </div>
          <br />
          <br />
          <div className="row">

            <div className="col-6">
              <label className="form-label ">
                <strong>ENTIDAD DONDE OCURRIO EL ROBO:</strong>

              </label>
              <br />
              <input
                className="select col-10"
                id="id_entidad_robo"
                name="id_entidad_robo"
                value={"   " + enti}>
              </input>

            </div>

            <div className="col-6">
              <label className="form-label">
                <strong>MUNICIPIO DONDE OCURRIO EL ROBO:</strong>
              </label>
              <br />
              <input
                className="select col-10"
                id="id_municipio_robo"
                name="id_municipio_robo"
                value={"   " + muni}>
              </input>

            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-4">
              <label className="form-label">
                <strong>TIPO DE LUGAR DONDE OCURRIO EL ROBO</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="id_tipo_lugar"
                name="id_tipo_lugar"
                value={tipo} />
            </div>
            <br />
            <div className="col-4">
              <label className="form-label">
                <strong>PERSONA QUIEN REALIZA LA DENUNCIA</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre_den"
                name="nombre_den"
                value={temporal.NOMBRE_DEN} />
            </div>
            <br />
            <div className="col-4">
              <label className="form-label">
                <strong> APELLIDO PATERNO DE QUIEN DENUNCIA</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="paterno_den"
                name="paterno_den"
                value={temporal.PATERNO_DEN} />
            </div>
          </div>
          <br />


          <div className="row">
            <div className="col-4">
              <label className="form-label">
                <strong>CALLE DEL DOMICILIO DEL DENUNCIANTE</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="calle_den"
                name="calle_den"
                value={temporal.CALLE_DEN} />
            </div>
            <br />
            <div className="col-4">
              <label className="form-label">
                <strong> N° EXTERIOR DEL DOMICILIO DEL DENUNCIANTE</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="numext_dom_den"
                name="numext_dom_den"
                value={temporal.NUMEXT_DOM_DEN} />
            </div>
            <br />
            <div className="col-4">
              <label className="form-label">
                <strong>COLONIA DEL DOMICILIO DEL DENUNCIANTE</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="colonia_den"
                name="colonia_den"
                value={temporal.COLONIA_DEN} />
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-6">
              <label className="form-label">
                <strong>IDENTIFICADOR DEL DOMICILIO DEL DENUNCIANTE</strong>
              </label>
              <br />
              <input
                className="select col-10"
                id="id_entidad_den"
                name="id_entidad_den"
                value={"   " + enti_den} >
              </input>
            </div>

            <div className="col-6">
              <label className="form-label">
                <strong>IDENTIFICADOR DE LA ENTIDAD DENUNCIANTE:</strong>
              </label>
              <br />
              <input
                className="select col-10"
                id="id_municipio_den"
                name="id_municipio_den"
                value={"   " + muni_den} >
              </input>

            </div>
          </div>
          <br />


          <div className="row">
            <div className="col-6">
              <label className="form-label">
                <strong>CODIGO POSTAL DEL LUGAR DEL ROBO</strong>

              </label>
              <input
                type="text"
                className="form-control"
                id="cp_den"
                name="cp_den"
                value={temporal.CP_DEN}
              />

            </div>

            <div className="col-6">
              <label className="form-label">
                <strong> PLACA O PERMISO DEL VEHICULO (SIN ESPACIOS)</strong>

              </label>
              <input
                type="text"
                className="form-control"
                id="placa"
                name="placa"
                value={temporal.PLACA}
              />

            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-6">
              <label className="form-label">
                <strong>IDENTIFICADOR DE LA MARCA DEL VEHÍCULO</strong>
              </label>
              <br />
              <input

                className="select col-10"
                id="id_marca"
                name="id_marca"
                value={"   " + marca}>
              </input>
            </div>
            <br />
            <div className="col-6">
              <label className="form-label">
                <strong> SUBMARCA DEL VEHICULO ROBADO:</strong>
              </label>
              <br />
              <input
                className="select col-10"
                id="id_submarca"
                name="id_submarca"
                value={"   " + smarca}>
              </input>
            </div>
          </div>
          <br />



          <div className="row">
            <div className="col-4">
              <label className="form-label">
                <strong> AÑO DEL VEHICULO EN CUATRO DIGITOS</strong>

              </label>
              <input
                placeholder=" AÑO EN CUATRO DIGITOS"
                type="text"
                className="form-control"
                id="modelo"
                name="modelo"
                value={temporal.MODELO}
                maxLength="4"
              />

            </div>

            <div className="col-4">
              <label className="form-label">
                <strong>COLOR DEL VEHICULO</strong>
              </label>
              <input
                id="id_color"
                name="id_color"
                className="form-control"
                value={color}
              >

              </input>

            </div>
            <div className="col-4">
              <label className="form-label">
                <strong>N° DE SERIE O IDENTIFICADOR DEL VEHICULO</strong>

              </label>
              <input
                type="text"
                className="form-control"
                id="serie"
                name="serie"
                value={temporal.SERIE}
              />

            </div>
          </div>
          <br />


          <div className="row">
            <div className="col-6">
              <label className="form-label">
                <strong>CLAVE DEL TIPO DE USO DEL VEHICULO</strong>

              </label>
              <input
                name="id_tipo_uso"
                className="form-control"
                value={uso}
              >
              </input>
            </div>

            <div className="col-6">
              <label className="form-label">
                <strong>IDENTIFICADOR DE LA PROCEDENCIA DEL VEHICULO</strong>

              </label>
              <input
                id="id_procedencia"
                name="id_procedencia"
                className="form-control"
                value={pro}
              >

              </input>
            </div>
            <div className="col-4">
              <label className="form-label">
                <strong>TIPO DE PLACA </strong>

              </label>
              <input
                type="text"
                className="form-control"
                id="placa_ext"
                name="placa_ext"
                value={tipoplaca}
              />

            </div>
          </div>



          <br></br>

          <button type="submit" className="btn btn-primary" onClick={handleClick}>Verificar</button>
          <Link to={`/edicion/${id}`} className="btn btn-info">
            Editar Registro
          </Link>

        </div>
      </div>
    </>
  );
};

export default Ver_reg_sr;
