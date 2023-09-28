import Navbar from "./Navbar";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import "../archivosCss/formulario.css";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Validation from "./../Elementos/Validacion"
import Login from "./Login";


const Registrar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))
  const [userData, setUserData] = useState([]);
  let result = []
  console.log(isLoggedIn, "MASD")

  useEffect(() => {
    if (isLoggedIn) {
      console.log("SE EJECUTO EL useEFFECT")
      const token = localStorage.getItem('token');
      const traerUsuario = async () => {
        if (token) {
          try {
            const res = await axios.get('http://localhost:8081/todosDatos', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            setUserData(res.data)
            console.log(userData)
          } catch (err) {
            console.log(err)
          }
        }
      }
      traerUsuario()
    }

  }, [isLoggedIn]);

  let nombre_bitacora
  let apellidos_bitacora, correoIns_bitacora, username_bitacora, municipio_bitacora, idUser_bitacora

  console.log(userData)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }



  let fecha


  useEffect(() => { }, []);

  useEffect(() => {
    modalidad_robo();
    modalidad_color();
    modalidad_tuso();
    //3
    entidadesSelect();
    modalidad_procedencia();
    //3 marca
    marcaSelect();
    //4 denunciante
    entidades_Denunciante();
  }, []);

  const [modalidad, setModalidad] = useState([]);
  const [select_modalidad, setSelect_modalidad] = useState([]);

  function modalidad_robo() {
    fetch("http://localhost:8081/modalidad")
      .then((data) => data.json())
      .then((val) => setModalidad(val));
  }

  const [color, setColor] = useState([]);
  const [select_color, setSelect_color] = useState([]);

  function modalidad_color() {
    fetch("http://localhost:8081/color")
      .then((data) => data.json())
      .then((val) => setColor(val));
  }

  const [tipo_uso, setTipo_uso] = useState([]);
  const [select_tuso, setSelect_tuso] = useState([]);

  function modalidad_tuso() {
    fetch("http://localhost:8081/tipouso")
      .then((data) => data.json())
      .then((val) => setTipo_uso(val));
  }

  const [procedencia, setProcedencia] = useState([]);
  const [select_procedencia, setSelect_procedencia] = useState([]);

  function modalidad_procedencia() {
    fetch("http://localhost:8081/procedencia")
      .then((data) => data.json())
      .then((val) => setProcedencia(val));
  }

  //1      modalidad entidad municipio
  const [entidades, setEntidades] = useState([]);
  let results2 = [];

  const [municipios, setMunicipios] = useState([]);

  const [entidadSeleccionada, setEntidadSeleccionada] = useState("");
  const [mSeleccionada, setMSeleccionada] = useState("");
  entidadSeleccionada;
  entidadSeleccionada;

  // 2
  const entidadesSelect = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/entidades");
      setEntidades(data);
    } catch (err) {
      console.log(err);
    }
  };

  //4
  const cargarMunicipios = async (entidadId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/municipios/${entidadId}`
      );
      setMunicipios(response.data);
    } catch (error) {
      console.error("Error al cargar los municipios:", error);
    }
  };

  // marca
  //1marca modalidad marca
  const [marca, setMarca] = useState([]);
  let result_marca = [];

  const [submarca, setSubmarca] = useState([]);

  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [submarca_selec, setSubmarca_selec] = useState("");
  marcaSeleccionada;

  //2 marca
  const marcaSelect = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/marca");
      setMarca(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 4marca
  const cargarSubmarca = async (marcaId) => {
    try {
      const response = await axios.get(`http://localhost:8081/submarca/${marcaId}`
      );
      setSubmarca(response.data);
    } catch (error) {
      console.error("Error al cargar las sub:", error);
    }
  };

  // otra entidad del denunciante 
  //1denunciante    
  const [denunciante, setDenunciante] = useState([]);
  let resultado = [];

  const [denunciante_muni, setDenunciante_muni] = useState([]);

  const [denuncinate_selec, setDenunciante_selec] = useState("");
  const [denuncinate_selec_m, setDenunciante_selec_m] = useState("");
  denuncinate_selec;

  // 2 denunciante
  const entidades_Denunciante = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/entidades");
      setDenunciante(data);
    } catch (err) {
      console.log(err);
    }
  };

  //4 denunciante
  const cargar_muni_denunciante = async (entidadId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/municipios/${entidadId}`
      );
      setDenunciante_muni(response.data);
    } catch (error) {
      console.error("Error al cargar los municipios:", error);
    }
  };

  //paso 6
  const handleDenChange = (event) => {
    const selectedDen = event.target.value;
    setDenunciante_selec(selectedDen);

    // Cargar los municipios correspondientes a la entidad seleccionada
    if (selectedDen) {
      cargar_muni_denunciante(selectedDen);
    } else {
      // Si no se selecciona ninguna entidad, vaciar la lista de municipios
      setDenunciante_muni([]);
    }
  };

  const handleMarcaChange = (event) => {
    const selectMarca = event.target.value;
    setMarcaSeleccionada(selectMarca);

    // Cargar los municipios correspondientes a la entidad seleccionada
    if (selectMarca) {
      cargarSubmarca(selectMarca);
    } else {
      // Si no se selecciona ninguna entidad, vaciar la lista de municipios
      setSubmarca([]);
    }
  };

  //5
  results2 = entidades;
  // 5marca
  result_marca = marca;
  //
  resultado = denunciante

  //paso 6
  const handleEntidadChange = (event) => {
    const selectedEntidad = event.target.value;
    setEntidadSeleccionada(selectedEntidad);

    // Cargar los municipios correspondientes a la entidad seleccionada
    if (selectedEntidad) {
      cargarMunicipios(selectedEntidad);
    } else {
      // Si no se selecciona ninguna entidad, vaciar la lista de municipios
      setMunicipios([]);
    }
  };





  //objeto principal
  const [create, setUser] = useState({
    fe: "",
    hora: "",
    id_alterna: "",
    averiguacion: "",
    fecha_averigua: "",
    agencia_mp: "",

    agente_mp: "",
    id_modalidad: "",
    fecha_robo: "",

    hora_robo: "",
    calle_robo: "",
    num_ext_robo: "",
    colonia_robo: "",

    id_municipio_robo: "",
    id_entidad_robo: "",
    id_tipo_lugar: "",
    nombre_den: "",
    paterno_den: "",

    calle_den: "",
    numext_dom_den: "",
    colonia_den: "",
    id_municipio_den: "",
    id_entidad_den: "",
    cp_den: "",
    placa: "",

    id_marca: "",
    id_submarca: "",
    modelo: "",
    id_color: "",
    serie: "",
    id_tipo_uso: "",
    id_procedencia: "",
  });
  formatoDia()
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();


    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    setSelect_modalidad((prev) => ({
      ...prev, [e.target.name]: e.target.value,
    }));
    setUser["id_modalidad"] = select_modalidad;

    setSelect_color(e.target.value);
    setUser["id_color"] = select_color;

    setSelect_tuso(e.target.value);
    setUser["id_tipo_uso"] = select_tuso;

    setSelect_procedencia(e.target.value);
    setUser["id_procedencia"] = select_procedencia;

    setMSeleccionada(e.target.value);
    setUser["id_municipio_robo"] = mSeleccionada;

    setDenunciante_selec_m(e.target.value);
    setUser["id_municipio_den"] = denuncinate_selec_m;

    setSubmarca_selec(e.target.value);
    setUser["id_submarca"] = submarca_selec;


  };

  ultimo();




  function ultimo() {
    axios
      .get("http://localhost:8081/ultimo")
      .then((res) => {
        const id = res.data[0].ID_ALTERNA;
        create["id_alterna"] = id + 1;
      })
      .catch((err) => console.log(err));
    console.log("datos", create);

  }


  // funcion de envio con la validacion.............. *****************************
  const [errors, setErrors] = useState({})
  useEffect(() => {
    ultimo();
    if (Object.keys(errors).length === 0 && (create.averiguacion !== "" && create.apellido !== "")) {
      axios.post("http://localhost:8081/crear", create);
      console.log(create)
      alert("El nuevo registro ha sido guardado correctamente ")
      navigate("/");
    }


  }, [errors])


  function handleValidation(e) {
    e.preventDefault();
    setErrors(Validation(create))


  }

  function formatoDia() {
    const today = new Date();
    let dia = today.getDate();
    if (dia < 10)
      dia = '0' + dia.toString();

    let mes = today.getMonth() + 1;
    if (mes < 10)
      mes = '0' + mes.toString();
    let ano = today.getFullYear();
    fecha = ano + "-" + mes + "-" + dia;


    create["fe"] = fecha;
    console.log("variable: " + create.fe)


    let hora = new Date();
    console.log(hora.toLocaleTimeString())
    create["hora"] = hora.toLocaleTimeString();
  }

  result = userData
  result.map(userData => {
    nombre_bitacora = userData.nombre
    apellidos_bitacora = userData.apellidos
    correoIns_bitacora = userData.correoIns
    username_bitacora = userData.username
    municipio_bitacora = userData.municipio
    idUser_bitacora = userData.id

  })
  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar></Navbar>
          <div className="area_form">
            <div className="contenedor">
              <Form>
                {result.map(userData => {
                  return (
                    <>

                      <input id='nombre_bitacora' type="hidden" name="nombre_bitacora" value={nombre_bitacora} onChange={handleChange} ></input>
                      <input id='apellidos_bitacora' type="hidden" name="apellidos_bitacora" value={apellidos_bitacora} onChange={handleChange} ></input>
                      <input id='correoIns_bitacora' type="hidden" name="correoIns_bitacora" value={correoIns_bitacora} onChange={handleChange} ></input>
                      <input id='username_bitacora' type="hidden" name="username_bitacora" value={username_bitacora} onChange={handleChange} ></input>
                      <input id='municipio_bitacora' type="hidden" name="municipio_bitacora" value={municipio_bitacora} onChange={handleChange} ></input>
                      <input id='idUser_bitacora' type="hidden" name="idUser_bitacora" value={idUser_bitacora} onChange={handleChange} ></input>
                    </>
                  )
                })}
                <h3>Registro de Vehiculo Robado</h3>

                <div className="row">
                  <div className="col-sm-6">
                    <label className="form-label">
                      NÚMERO DE AVERIGUANCION PREVIA ASIGNADA:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="averiguacion_"
                      name="averiguacion"
                      onChange={handleChange}
                    />
                    {errors.averiguacion && <p style={{ color: "red", fontSize: "13px" }}> {errors.averiguacion}</p>}
                  </div>

                  {/*  */}

                  <div className="col-6">
                    <label className="form-label">FECHA EN LA QUE SE DIO DE ALTA LA DENUNCIA</label>
                    <input
                      type="date"
                      className="form-control"
                      id="fecha_averigua"
                      name="fecha_averigua"
                      onChange={handleChange}
                      min="2000-00-01"
                      max={create.fe}
                    />
                    {errors.fecha_averigua && <p style={{ color: "red", fontSize: "13px" }}> {errors.fecha_averigua}</p>}
                  </div>

                </div>
                <br />


                <div className="row">
                  <div className="col-6 ">
                    <label className="form-label">
                      AGENCIA DEL MINISTERIO PÚBLICO DONDE SE HIZO LA DENUNCIA
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="agencia_mp"
                      name="agencia_mp"
                      onChange={handleChange}
                    />
                    {errors.agencia_mp && <p style={{ color: "red", fontSize: "13px" }}> {errors.agencia_mp}</p>}
                  </div>

                  <div className="col-6 ">
                    <label className="form-label">
                      {" "}
                      NOMBRE COMPLETO DEL AGENTE DEL MINISTERIO PÚBLICO QUE LEVANTO LA
                      DENUNCIA:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="agente_mp"
                      name="agente_mp"
                      onChange={handleChange}
                    />
                    {errors.agente_mp && <p style={{ color: "red", fontSize: "13px" }}> {errors.agente_mp}</p>}
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-4">
                    <label className="form-label">MODALIDAD DEL ROBO</label>
                    <select
                      name="id_modalidad"
                      className="form-control"
                      onChange={handleChange}
                    >
                      <option selected disabled value=" ">Seleccione una modalidad</option>
                      {modalidad.map((elemento) => (
                        <option key={elemento.id} value={elemento.id}>
                          {elemento.tipo}{" "}
                        </option>
                      ))}
                    </select>
                    {errors.id_modalidad && <p style={{ color: "red", fontSize: "13px" }}> {errors.id_modalidad}</p>}
                  </div>

                  <div className="col-4">
                    <label className="form-label">FECHA DEL ROBO</label>
                    <input
                      type="date"
                      className="form-control"
                      id="fecha_robo"
                      name="fecha_robo"
                      onChange={handleChange}
                      min="2000-00-01"
                      max={create.fe}

                    />
                    {errors.fecha_robo && <p style={{ color: "red", fontSize: "13px" }}> {errors.fecha_robo}</p>}
                  </div>

                  <div className="col-4">
                    <label className="form-label">HORA DEL ROBO</label>
                    <input
                      type="time"
                      className="form-control"
                      id="hora_robo"
                      name="hora_robo"
                      defaultValue="00:00"
                      onChange={handleChange}
                    />
                    {errors.hora_robo && <p style={{ color: "red", fontSize: "13px" }}> {errors.hora_robo}</p>}
                  </div>

                </div>
                <br />
                <div className="row">
                  <div className="col-4">
                    <label className="form-label">CALLE DONDE OCURRIO EL ROBO</label>
                    <input
                      type="text"
                      className="form-control"
                      id="calle_robo"
                      name="calle_robo"
                      onChange={handleChange}
                    />
                    {errors.calle_robo && <p style={{ color: "red", fontSize: "13px" }}> {errors.calle_robo}</p>}
                  </div>
                  <br />
                  <div className="col-4">
                    <label className="form-label">
                      NUMERO EXTERIOR DONDE OCURRIO EL ROBO
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="num_ext_robo"
                      name="num_ext_robo"
                      onChange={handleChange}
                    />
                    {errors.num_ext_robo && <p style={{ color: "red", fontSize: "13px" }}> {errors.num_ext_robo}</p>}
                  </div>
                  <br />
                  <div className="col-4">
                    <label className="form-label">
                      COLONIA DONDE OCURRIO EL ROBO
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="colonia_robo"
                      name="colonia_robo"
                      onChange={handleChange}
                    />
                    {errors.colonia_robo && <p style={{ color: "red", fontSize: "13px" }}> {errors.colonia_robo}</p>}
                  </div>
                </div>
                <br />
                <br />
                <div className="row">

                  <div className="col-6">
                    <label className="form-label ">
                      {" "}
                      ENTIDAD DONDE OCURRIO EL ROBO:
                    </label>
                    <br />
                    <select
                      className="select col-10"
                      id="id_entidad_robo"
                      name="id_entidad_robo"
                      onChange={handleEntidadChange}
                      onClick={handleChange}
                    >
                      <option selected disabled value=" ">SELECCIONE UNA ENTIDAD</option>
                      {results2.map((entidades) => {
                        return (
                          <option
                            name={entidades.id_entidad}
                            key={entidades.id_entidad}
                            value={entidades.id_entidad}>
                            {entidades.entidad}
                          </option>
                        );
                      })}
                    </select>
                    {errors.id_entidad_robo && <p style={{ color: "red", fontSize: "13px" }}> {errors.id_entidad_robo}</p>}
                  </div>

                  <div className="col-6">
                    <label className="form-label">
                      MUNICIPIO DONDE OCURRIO EL ROBO:
                    </label>
                    <br />
                    <select
                      className="select col-10"
                      id="id_municipio_robo"
                      name="id_municipio_robo"
                      onChange={handleChange}
                    >
                      <option selected disabled value=" ">SELECCIONE UN MUNICIPIO</option>
                      {municipios.map((municipio) => (
                        <option
                          key={municipio.id_municipio}
                          value={municipio.id_municipio}
                        >
                          {municipio.municipio}
                        </option>
                      ))}
                    </select>
                    {errors.id_municipio_robo && <p style={{ color: "red", fontSize: "13px" }}> {errors.id_municipio_robo}</p>}
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-4">
                    <label className="form-label">
                      TIPO DEL LUGAR DONDE OCURRIO EL ROBO
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="id_tipo_lugar"
                      name="id_tipo_lugar"
                      placeholder="CENTRO COMERCIAL, CASA, ETC"
                      onChange={handleChange}
                    />
                    {errors.id_tipo_lugar && <p style={{ color: "red", fontSize: "13px" }}> {errors.id_tipo_lugar}</p>}
                  </div>
                  <br />
                  <div className="col-4">
                    <label className="form-label">
                      NOMBRE DE LA PERSONA QUE REALIZA LA DENUNCIA
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre_den"
                      name="nombre_den"
                      onChange={handleChange}
                    />
                    {errors.nombre_den && <p style={{ color: "red", fontSize: "13px" }}> {errors.nombre_den}</p>}
                  </div>
                  <br />
                  <div className="col-4">
                    <label className="form-label">
                      APELLIDO PATERNO DE QUIEN QUE REALIZA LA DENUNCIA
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="paterno_den"
                      name="paterno_den"
                      onChange={handleChange}
                    />
                    {errors.paterno_den && <p style={{ color: "red", fontSize: "13px" }}> {errors.paterno_den}</p>}
                  </div>
                </div>
                <br />


                <div className="row">
                  <div className="col-4">
                    <label className="form-label">
                      CALLE DEL DOMICILIO DEL DENUNCIANTE
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="calle_den"
                      name="calle_den"
                      onChange={handleChange}
                    />
                    {errors.calle_den && <p style={{ color: "red", fontSize: "13px" }}> {errors.calle_den}</p>}
                  </div>
                  <br />
                  <div className="col-4">
                    <label className="form-label">
                      NUMERO EXTERIOR DEL DOMICILIO DEL DENUNCIANTE
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="numext_dom_den"
                      name="numext_dom_den"
                      onChange={handleChange}
                    />
                    {errors.numext_dom_den && <p style={{ color: "red", fontSize: "13px" }}> {errors.numext_dom_den}</p>}
                  </div>
                  <br />
                  <div className="col-4">
                    <label className="form-label">
                      COLONIA DEL DOMICILIO DEL DENUNCIANTE
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="colonia_den"
                      name="colonia_den"
                      onChange={handleChange}
                    />
                    {errors.colonia_den && <p style={{ color: "red", fontSize: "13px" }}> {errors.colonia_den}</p>}
                  </div>
                </div>
                <br />
                <br />
                <div className="row">
                  <div className="col-6">
                    <label className="form-label">

                      IDENTIFICADOR DEL DOMICILIO DEL DENUNCIANTE
                    </label>
                    <br />
                    <select
                      className="select col-10"
                      id="id_entidad_den"
                      name="id_entidad_den"
                      onChange={handleDenChange}
                      onClick={handleChange}
                    >
                      <option selected disabled value=" ">SELECCIONE LA ENTIDAD DEL DENUNCIANTE</option>
                      {resultado.map((entidades) => {
                        return (
                          <option
                            name={entidades.id_entidad}
                            key={entidades.id_entidad}
                            value={entidades.id_entidad}
                          >
                            {entidades.entidad}
                          </option>
                        );
                      })}
                    </select>
                    {errors.id_entidad_den && <p style={{ color: "red", fontSize: "13px" }}> {errors.id_entidad_den}</p>}
                  </div>

                  <div className="col-6">
                    <label className="form-label">
                      IDENTIFICADOR DE LA ENTIDAD DENUNCIANTE:
                    </label>
                    <br />
                    <select
                      className="select col-10"
                      id="id_municipio_den"
                      name="id_municipio_den"
                      onChange={handleChange}>
                      <option selected disabled value=" ">SELECCIONE EL MUNICIPIO DEL DENUNCIANTE</option>
                      {denunciante_muni.map((municipio) => (
                        <option
                          key={municipio.id_municipio}
                          value={municipio.id_municipio}
                        >
                          {municipio.municipio}
                        </option>
                      ))}
                    </select>
                    {errors.id_municipio_den && <p style={{ color: "red", fontSize: "13px" }}> {errors.id_municipio_den}</p>}
                  </div>
                </div>
                <br />


                <div className="row">
                  <div className="col-6">
                    <label className="form-label">
                      CODIGO POSTAL DEL LUGAR DEL ROBO
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cp_den"
                      name="cp_den"
                      onChange={handleChange}
                    />
                    {errors.cp_den && <p style={{ color: "red", fontSize: "13px" }}> {errors.cp_den}</p>}
                  </div>

                  <div className="col-6">
                    <label className="form-label">
                      PLACA O PERMISO DEL VEHICULO (SIN ESPACIOS)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="placa"
                      name="placa"
                      onChange={handleChange}
                    />
                    {errors.placa && <p style={{ color: "red", fontSize: "13px" }}> {errors.placa}</p>}
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-6">
                    <label className="form-label">
                      IDENTIFICADOR DE LA MARCA DEL VEHÍCULO
                    </label>
                    <br />
                    <select
                      className="select col-10"
                      id="id_marca"
                      name="id_marca"
                      onChange={handleMarcaChange}
                      onClick={handleChange}
                    >
                      <option selected disabled value=" ">SELECCIONE UNA MARCA</option>
                      {result_marca.map((marca) => {
                        return (
                          <option
                            name={marca.id_marca}
                            key={marca.id_marca}
                            value={marca.id_marca}
                          >
                            {marca.descripcion}
                          </option>
                        );
                      })}
                    </select>
                    {errors.id_marca && <p style={{ color: "red", fontSize: "13px" }}> {errors.id_marca}</p>}
                  </div>
                  <br />
                  <div className="col-6">
                    <label className="form-label">
                      SUBMARCA DEL VEHICULO ROBADO:
                    </label>
                    <br />
                    <select
                      className="select col-10"
                      id="id_submarca"
                      name="id_submarca"
                      onClick={handleChange}
                    >
                      <option disabled value="">SELECCIONE LA SUB-MARCA</option>
                      {submarca.map((sm) => (
                        <option
                          key={sm.id_submarca}
                          value={sm.id_submarca}>

                          {sm.descripcion}
                        </option>
                      ))}
                    </select>
                    {errors.id_submarca && <p style={{ color: "red", fontSize: "13px" }}> {errors.id_submarca}</p>}
                  </div>
                </div>
                <br />



                <div className="row">
                  <div className="col-4">
                    <label className="form-label">
                      AÑO DEL VEHICULO EN CUATRO DIGITOS
                    </label>
                    <input
                      placeholder=" AÑO EN CUATRO DIGITOS"
                      type="text"
                      className="form-control"
                      id="modelo"
                      name="modelo"
                      onChange={handleChange}
                      maxLength="4"
                    />
                    {errors.modelo && <p style={{ color: "red", fontSize: "13px" }}> {errors.modelo}</p>}
                  </div>

                  <div className="col-4">
                    <label className="form-label">COLOR DEL VEHICULO</label>
                    <select
                      id="id_color"
                      name="id_color"
                      className="form-control"
                      onChange={handleChange}
                    >
                      <option selected disabled value=" ">Seleccione un color</option>
                      {color.map((colors) => (
                        <option key={colors.id_color} value={colors.id_color}>
                          {colors.descripcion}
                        </option>
                      ))}
                    </select>
                    {errors.id_color && <p style={{ color: "red", fontSize: "13px" }}> {errors.id_color}</p>}
                  </div>
                  <div className="col-4">
                    <label className="form-label">
                      N° DE SERIE O NUMERO DE IDENTIFICADOR DEL VEHICULO
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="serie"
                      name="serie"
                      onChange={handleChange}
                    />
                    {errors.serie && <p style={{ color: "red", fontSize: "13px" }}> {errors.serie}</p>}
                  </div>
                </div>
                <br />


                <div className="row">
                  <div className="col-6">
                    <label className="form-label">
                      CLAVE DEL TIPO DE USO DEL VEHICULO
                    </label>
                    <select
                      name="id_tipo_uso"
                      className="form-control"
                      onChange={handleChange}
                    >
                      <option selected disabled value=" ">Seleccione un tipo de uso</option>
                      {tipo_uso.map((elemento) => (
                        <option
                          key={elemento.id_tipo_uso}
                          value={elemento.id_tipo_uso}
                        >
                          {elemento.descripcion}
                        </option>
                      ))}
                    </select>
                    {errors.id_tipo_uso && <p style={{ color: "red", fontSize: "13px" }}> {errors.id_tipo_uso}</p>}
                  </div>

                  <div className="col-6">
                    <label className="form-label">
                      IDENTIFICADOR DE LA PROCEDENCIA DEL VEHICULO
                    </label>
                    <select
                      id="id_procedencia"
                      name="id_procedencia"
                      className="form-control"
                      onChange={handleChange}


                    >
                      <option selected disabled value=" " >Seleccione la procedencia del vehiculo</option>
                      {procedencia.map((element) => (
                        <option
                          key={element.id_procedencia}
                          value={element.id_procedencia}
                        >
                          {element.descripcion}
                        </option>
                      ))}
                    </select>
                    {errors.id_procedencia && <p style={{ color: "red", fontSize: "13px" }}> {errors.id_procedencia}</p>}
                  </div>
                </div>




                <Button variant="primary" type="submit" onClick={handleValidation}>
                  Guardar
                </Button>
                <Link to="/" className="btn btn-info">
                  {" "}
                  Inicio
                </Link>
              </Form>
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

export default Registrar;
