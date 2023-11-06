import Navbar from "../Navbar";



import "../../archivosCss/formulario.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css";



const Editar_sr = () => {
  let fecha
  const { id } = useParams();

  const [inputHD, setInputHD] = useState(true);

  const [modalidad, setModalidad] = useState([]);
  const [select_modalidad, setSelect_modalidad] = useState([]);

  const [color, setColor] = useState([]);
  const [select_color, setSelect_color] = useState([]);

  const [tipo_uso, setTipo_uso] = useState([]);
  const [select_tuso, setSelect_tuso] = useState([]);

  const [procedencia, setProcedencia] = useState([]);
  const [select_procedencia, setSelect_procedencia] = useState([]);

  const [tlugar, setTlugar] = useState([]);
  const [select_tl, setSelect_tl] = useState([]);

  const [entidades, setEntidades] = useState([]);
  let results2 = [];

  const [municipios, setMunicipios] = useState([]);
  const [entidadSeleccionada, setEntidadSeleccionada] = useState("");
  const [mSeleccionada, setMSeleccionada] = useState("");
  entidadSeleccionada;
  entidadSeleccionada;

  const [marca, setMarca] = useState([]);
  let result_marca = [];
  const [submarca, setSubmarca] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [submarca_selec, setSubmarca_selec] = useState("");
  marcaSeleccionada;

  const [denunciante, setDenunciante] = useState([]);
  let resultado = [];
  const [denunciante_muni, setDenunciante_muni] = useState([]);
  const [denuncinate_selec, setDenunciante_selec] = useState("");
  const [denuncinate_selec_m, setDenunciante_selec_m] = useState("");
  denuncinate_selec;

  results2 = entidades;
  result_marca = marca;
  resultado = denunciante

  let [moda, setModa] = useState([]);
  let [enti, setEnti] = useState([]);
  let [muni, setMuni] = useState([]);
  let [tipo, setTipo] = useState([]);
  let [enti_den, setEnti_den] = useState([]);
  let [muni_den, setMuni_den] = useState([]);
  let [ma, setMa] = useState([]);
  let [smarca, setSmarca] = useState([]);
  let [colo, setColo] = useState([]);
  let [uso, setUso] = useState([]);
  let [pro, setPro] = useState([]);
  let [tfecha, setTfecha] = useState([]);
  let [tfecha_robo, setTfecha_robo] = useState([]);

  //objeto principal
  const [modificar, setModificar] = useState({
    fe: "",
    hora: "",
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
  });




  useEffect(() => {
    traer_fecha()
    modalidad_moda()
    modalidad_enti()
    modalidad_muni()
    modalidad_tipo()
    modalidad_enti_den()
    modalidad_muni_den()
    modalidad_marca()
    modalidad_smarca()
    modalidad_colo()
    modalidad_uso()
    modalidad_procede()
    traer_fecha_robo()



  });

  useEffect(() => {

    traer_datos()
    modalidad_robo();
    modalidad_color();
    modalidad_tuso();
    entidadesSelect();
    modalidad_procedencia();
    marcaSelect();
    entidades_Denunciante();
    modalidad_tipolugar()



  }, []);


  //////////////  funciones    ///////////////////////////////////////////////////// 
  function traer_datos() {
    axios.get("http://localhost:8081/bId/" + id)
      .then(res => {
        console.log(res)
        setModificar(res.data[0])
      })
      .catch(err => console.log(err))
  }

  function traer_fecha() {
    axios.get("http://localhost:8081/fecha/" + id)
      .then(res => {
        console.log(res)
        setTfecha(res.data[0].fecha)
      })
      .catch(err => console.log(err))
  }


  function traer_fecha_robo() {
    axios.get("http://localhost:8081/fechaRobo/" + id)
      .then(res => {
        console.log(res)
        setTfecha_robo(res.data[0].fecha)
      })
      .catch(err => console.log(err))
  }

  function modalidad_moda() {
    axios.get("http://localhost:8081/moda/" + modificar.ID_MODALIDAD)
      .then(res => {
        console.log(res)
        setModa(res.data[0].tipo)
      })
      .catch(err => console.log(err))
  }

  function modalidad_enti() {
    axios.get("http://localhost:8081/entirobo/" + modificar.ID_ENTIDAD_ROBO)
      .then(res => {
        console.log(res)
        setEnti(res.data[0].ENTIDAD)
      })
      .catch(err => console.log(err))
  }

  function modalidad_muni() {
    axios.get("http://localhost:8081/munirobo/" + modificar.ID_MUNICIPIO_ROBO)
      .then(res => {
        console.log(res)
        setMuni(res.data[0].MUNICIPIO)
      })
      .catch(err => console.log(err))
  }

  function modalidad_tipo() {
    axios.get("http://localhost:8081/tlugar/" + modificar.ID_TIPO_LUGAR)
      .then(res => {
        console.log(res)
        setTipo(res.data[0].descripcion)
      })
      .catch(err => console.log(err))
  }

  console.log("tipo de lugar", tipo)

  function modalidad_enti_den() {
    axios.get("http://localhost:8081/entirobo/" + modificar.ID_ENTIDAD_DEN)
      .then(res => {
        console.log(res)
        setEnti_den(res.data[0].ENTIDAD)
      })
      .catch(err => console.log(err))
  }

  function modalidad_muni_den() {
    axios.get("http://localhost:8081/munirobo/" + modificar.ID_MUNICIPIO_DEN)
      .then(res => {
        console.log(res)
        setMuni_den(res.data[0].MUNICIPIO)
      })
      .catch(err => console.log(err))
  }


  function modalidad_marca() {
    axios.get("http://localhost:8081/m_marca/" + modificar.ID_MARCA)
      .then(res => {
        console.log(res)
        setMa(res.data[0].descripcion)
      })
      .catch(err => console.log(err))
  }

  function modalidad_smarca() {
    axios.get("http://localhost:8081/subm/" + modificar.ID_SUBMARCA)
      .then(res => {
        console.log(res)
        setSmarca(res.data[0].DESCRIPCION)
      })
      .catch(err => console.log(err))
  }

  function modalidad_colo() {
    axios.get("http://localhost:8081/color/" + modificar.ID_COLOR)
      .then(res => {
        console.log(res)
        setColo(res.data[0].DESCRIPCION)
      })
      .catch(err => console.log(err))
  }

  function modalidad_uso() {
    axios.get("http://localhost:8081/tipo/" + modificar.ID_TIPO_USO)
      .then(res => {
        console.log(res)
        setUso(res.data[0].descripcion)
      })
      .catch(err => console.log(err))
  }

  function modalidad_procede() {
    axios.get("http://localhost:8081/pro/" + modificar.ID_PROCEDENCIA)
      .then(res => {
        console.log(res)
        setPro(res.data[0].descripcion)
      })
      .catch(err => console.log(err))
  }









  ////////////////////////////////////////////////////
  function modalidad_robo() {
    fetch("http://localhost:8081/modalidad")
      .then((data) => data.json())
      .then((val) => setModalidad(val));
  }

  function modalidad_color() {
    fetch("http://localhost:8081/color")
      .then((data) => data.json())
      .then((val) => setColor(val));
  }

  function modalidad_tuso() {
    fetch("http://localhost:8081/tipouso")
      .then((data) => data.json())
      .then((val) => setTipo_uso(val));
  }

  function modalidad_procedencia() {
    fetch("http://localhost:8081/procedencia")
      .then((data) => data.json())
      .then((val) => setProcedencia(val));
  }

  function modalidad_tipolugar() {
    fetch("http://localhost:8081/tipolugar")
      .then((data) => data.json())
      .then((val) => setTlugar(val));
  }

  const entidadesSelect = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/entidades");
      setEntidades(data);
    } catch (err) {
      console.log(err);
    }
  };

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

  const marcaSelect = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/marca");
      setMarca(data);
    } catch (err) {
      console.log(err);
    }
  };

  const cargarSubmarca = async (marcaId) => {
    try {
      const response = await axios.get(`http://localhost:8081/submarca/${marcaId}`
      );
      setSubmarca(response.data);
    } catch (error) {
      console.error("Error al cargar las sub:", error);
    }
  };

  const entidades_Denunciante = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/entidades");
      setDenunciante(data);
    } catch (err) {
      console.log(err);
    }
  };

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
  /////////////   handle de entidades //////////////////////////////////////////
  const handleEntidadChange = (event) => {
    const selectedEntidad = event.target.value;
    setEntidadSeleccionada(selectedEntidad);
    if (selectedEntidad) {
      cargarMunicipios(selectedEntidad);
    } else {
      setMunicipios([]);
    }
  };

  const handleDenChange = (event) => {
    const selectedDen = event.target.value;
    setDenunciante_selec(selectedDen);
    if (selectedDen) {
      cargar_muni_denunciante(selectedDen);
    } else {
      setDenunciante_muni([]);
    }
  };

  const handleMarcaChange = (event) => {
    const selectMarca = event.target.value;
    setMarcaSeleccionada(selectMarca);
    if (selectMarca) {
      cargarSubmarca(selectMarca);
    } else {
      setSubmarca([]);
    }
  };

  //////////////////////////////////////////////////////////////////////


  formatoDia()
  const navigate = useNavigate();


  ///////////////////   handle general de movimientos   ////////////////////////////
  const handleChange = (e) => {

    setModificar((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSelect_modalidad((prev) => ({
      ...prev, [e.target.name]: e.target.value,
    }));
    setModificar["ID_MODALIDAD"] = select_modalidad;

    setSelect_tl(e.target.value);
    setModificar["ID_TIPO_LUGAR"] = select_tl;

    setSelect_color(e.target.value);
    setModificar["ID_COLOR"] = select_color;

    setSelect_tuso(e.target.value);
    setModificar["ID_TIPO_USO"] = select_tuso;

    setSelect_procedencia(e.target.value);
    setModificar["ID_PROCEDENCIA"] = select_procedencia;

    setMSeleccionada(e.target.value);
    setModificar["ID_MUNICIPIO_ROBO"] = mSeleccionada;

    setDenunciante_selec_m(e.target.value);
    setModificar["ID_MUNICIPIO_DEN"] = denuncinate_selec_m;

    setSubmarca_selec(e.target.value);
    setModificar["ID_SUBMARCA"] = submarca_selec;

    if (e.target.name === "ID_PROCEDENCIA") {
      // habilitar input si el valor seleccionado es igual a 2
      setInputHD(e.target.value !== "2");
      setModificar((prev) => ({ ...prev, edo: "" }));
    }


  };

  ultimo();




  function ultimo() {
    axios
      .get("http://localhost:8081/ultimo")
      .then((res) => {
        const id = res.data[0].ID_ALTERNA;
        modificar["id_alterna"] = id + 1;
      })
      .catch((err) => console.log(err));
  }

  console.log("datos", modificar);


  /*
    useEffect(()=>{
      ultimo();
     
    //  axios.post("http://localhost:8081/temporal_crear", create);
   //   console.log(create)
    //  alert("El nuevo registro ha sido guardado correctamente ")
      navigate(" ");
  
  
  
    },[])           */

  console.log("el id para mof: ", id)


  const handleClick = async (e) => {
    e.preventDefault();
    try {

      await axios.put("http://localhost:8081/modificar/" + id, modificar);
      console.log(modificar)
      alert("La modificacion se a realizado correctamente ")
      navigate(`/vrsr/${id}`)
    } catch (err) {
      console.log(err)
    }
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

    modificar["fe"] = fecha;
    console.log("variable: " + modificar.fe)

    let hora = new Date();
    console.log(hora.toLocaleTimeString())
    modificar["hora"] = hora.toLocaleTimeString();
  }

  // guarda archivos 










  return (
    <>
      <Navbar></Navbar>
      <div className="area_form">
        <div className="contenedor">
          <form>
            <h3>Edición del Registro </h3>

            <div className="row">
              <div className="col-sm-6">
                <label className="form-label">
                  <strong>NÚMERO DE AVERIGUANCION PREVIA ASIGNADA:</strong>

                </label>
                <input
                  type="text"
                  className="form-control"
                  id="AVERIGUACION"
                  name="AVERIGUACION"
                  defaultValue={modificar.AVERIGUACION}
                  onChange={handleChange}
                />

              </div>
              <div className="col-6">
                <label className="form-label">
                  <strong>FECHA EN LA QUE SE DIO DE ALTA LA DENUNCIA</strong></label>
                <input
                  type="date"
                  className="form-control"
                  id="FECHA_AVERIGUA"
                  name="FECHA_AVERIGUA"
                  defaultValue={tfecha}
                  onChange={handleChange}
                  min="2000-00-01"
                  max={modificar.fe}
                />

              </div>

            </div>
            <br />


            <div className="row">
              <div className="col-6 ">
                <label className="form-label">
                  <strong>AGENCIA DEL MINISTERIO PÚBLICO DONDE SE HIZO LA DENUNCIA</strong>

                </label>
                <input
                  type="text"
                  className="form-control"
                  id="AGENCIA_MP"
                  name="AGENCIA_MP"
                  defaultValue={modificar.AGENCIA_MP}
                  onChange={handleChange}
                />

              </div>

              <div className="col-6 ">
                <label className="form-label">
                  <strong>NOMBRE DEL AGENTE DEL MINISTERIO PUBLICO QUE LEVANTO LA
                    DEN.</strong>

                </label>
                <input
                  type="text"
                  className="form-control"
                  id="AGENTE_MP"
                  name="AGENTE_MP"
                  defaultValue={modificar.AGENTE_MP}
                  onChange={handleChange}
                />

              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-4">
                <label className="form-label">
                  <strong>MODALIDAD DEL ROBO</strong></label>
                <select
                  id="ID_MODALIDAD"
                  name="ID_MODALIDAD"

                  className="form-control"
                  onChange={handleChange}

                >
                  <option selected disabled  >{moda}</option>
                  {modalidad.map((elemento) => (
                    <option key={elemento.id} value={elemento.id}>
                      {elemento.tipo}{" "}
                    </option>
                  ))}
                </select>

              </div>

              <div className="col-4">
                <label className="form-label"> <strong>FECHA DEL ROBO</strong> </label>
                <input
                  type="date"
                  className="form-control"
                  id="FECHA_ROBO"
                  name="FECHA_ROBO"
                  defaultValue={tfecha_robo}
                  onChange={handleChange}
                  min="2000-00-01"
                  max={modificar.fe}

                />

              </div>

              <div className="col-4">
                <label className="form-label"><strong>HORA DEL ROBO</strong></label>
                <input
                  type="time"
                  className="form-control"
                  id="HORA_ROBO"
                  name="HORA_ROBO"
                  defaultValue={modificar.HORA_ROBO}
                  onChange={handleChange}

                />

              </div>

            </div>
            <br />
            <div className="row">
              <div className="col-4">
                <label className="form-label"><strong>CALLE DONDE OCURRIO EL ROBO</strong> </label>
                <input
                  type="text"
                  className="form-control"
                  id="CALLE_ROBO"
                  name="CALLE_ROBO"
                  onChange={handleChange}
                  defaultValue={modificar.CALLE_ROBO}
                />

              </div>
              <br />
              <div className="col-4">
                <label className="form-label"><strong>NUMERO EXTERIOR DONDE OCURRIO EL ROBO</strong>

                </label>
                <input
                  type="text"
                  className="form-control"
                  id="NUM_EXT_ROBO"
                  name="NUM_EXT_ROBO"
                  defaultValue={modificar.NUM_EXT_ROBO}
                  onChange={handleChange}
                />

              </div>
              <br />
              <div className="col-4">
                <label className="form-label"><strong>COLONIA DONDE OCURRIO EL ROBO</strong>

                </label>
                <input
                  type="text"
                  className="form-control"
                  id="COLONIA_ROBO"
                  name="COLONIA_ROBO"
                  defaultValue={modificar.COLONIA_ROBO}
                  onChange={handleChange}
                />

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
                <select
                  className="select col-10"
                  id="ID_ENTIDAD_ROBO"
                  name="ID_ENTIDAD_ROBO"
                  defaultValue={modificar.ID_ENTIDAD_ROBO}
                  onChange={handleEntidadChange}
                  onClick={handleChange}
                >
                  <option selected disabled value=" ">{enti}</option>
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

              </div>

              <div className="col-6">
                <label className="form-label">
                  <strong>MUNICIPIO DONDE OCURRIO EL ROBO:</strong>

                </label>
                <br />
                <select
                  className="select col-10"
                  id="ID_MUNICIPIO_ROBO"
                  name="ID_MUNICIPIO_ROBO"
                  defaultValue={modificar.ID_MUNICIPIO_ROBO}
                  onChange={handleChange}
                >
                  <option selected disabled value=" ">{muni}</option>
                  {municipios.map((municipio) => (
                    <option
                      key={municipio.id_municipio}
                      value={municipio.id_municipio}
                    >
                      {municipio.municipio}
                    </option>
                  ))}
                </select>

              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-4">
                <label className="form-label">
                  <strong>TIPO DEL LUGAR DONDE OCURRIO EL ROBO</strong>

                </label>


                <select
                  id="ID_TIPO_LUGAR"
                  name="ID_TIPO_LUGAR"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option selected disabled >{tipo}</option>
                  {tlugar.map((element) => (
                    <option
                      key={element.id_tipo_lugar}
                      value={element.id_tipo_lugar}
                    >
                      {element.descripcion}
                    </option>
                  ))}
                </select>



              </div>
              <br />
              <div className="col-4">
                <label className="form-label">
                  <strong>NOMBRE DE LA PERSONA QUIEN DENUNCIA</strong>

                </label>
                <input
                  type="text"
                  className="form-control"
                  id="NOMBRE_DEN"
                  name="NOMBRE_DEN"
                  defaultValue={modificar.NOMBRE_DEN}
                  onChange={handleChange}
                />

              </div>
              <br />
              <div className="col-4">
                <label className="form-label">
                  <strong>APELLIDO PATERNO QUIEN HIZO LA DENUNCIA</strong>

                </label>
                <input
                  type="text"
                  className="form-control"
                  id="PATERNO_DEN"
                  name="PATERNO_DEN"
                  defaultValue={modificar.PATERNO_DEN}
                  onChange={handleChange}
                />

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
                  id="CALLE_DEN"
                  name="CALLE_DEN"
                  defaultValue={modificar.CALLE_DEN}
                  onChange={handleChange}
                />

              </div>
              <br />
              <div className="col-4">
                <label className="form-label">
                  <strong>N° EXTERIOR DEL DOMICILIO DEL DENUNCIANTE</strong>

                </label>
                <input
                  type="text"
                  className="form-control"
                  id="NUMEXT_DOM_DEN"
                  name="NUMEXT_DOM_DEN"
                  defaultValue={modificar.NUMEXT_DOM_DEN}
                  onChange={handleChange}
                />

              </div>
              <br />
              <div className="col-4">
                <label className="form-label">
                  <strong>COLONIA DEL DOMICILIO DEL DENUNCIANTE</strong>

                </label>
                <input
                  type="text"
                  className="form-control"
                  id="COLONIA_DEN"
                  name="COLONIA_DEN"
                  defaultValue={modificar.COLONIA_DEN}
                  onChange={handleChange}
                />

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
                <select
                  className="select col-10"
                  id="ID_ENTIDAD_DEN"
                  name="ID_ENTIDAD_DEN"
                  defaultValue={modificar.ID_ENTIDAD_DEN}
                  onChange={handleDenChange}
                  onClick={handleChange}
                >
                  <option selected disabled value=" ">{enti_den}</option>
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

              </div>

              <div className="col-6">
                <label className="form-label">
                  <strong>IDENTIFICADOR DE LA ENTIDAD DENUNCIANTE:</strong>

                </label>
                <br />
                <select
                  className="select col-10"
                  id="ID_MUNICIPIO_DEN"
                  name="ID_MUNICIPIO_DEN"

                  onChange={handleChange}>
                  <option selected disabled value=" ">{muni_den}</option>
                  {denunciante_muni.map((municipio) => (
                    <option
                      key={municipio.id_municipio}
                      value={municipio.id_municipio}
                    >
                      {municipio.municipio}
                    </option>
                  ))}
                </select>

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
                  id="CP_DEN"
                  name="CP_DEN"
                  defaultValue={modificar.CP_DEN}
                  onChange={handleChange}
                />

              </div>

              <div className="col-6">
                <label className="form-label">
                  <strong>PLACA O PERMISO DEL VEHICULO (SIN ESPACIOS)</strong>

                </label>
                <input
                  type="text"
                  className="form-control"
                  id="PLACA"
                  name="PLACA"
                  defaultValue={modificar.PLACA}
                  onChange={handleChange}
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
                <select
                  className="select col-10"
                  id="ID_MARCA"
                  name="ID_MARCA"
                  defaultValue={modificar.ID_MARCA}
                  onChange={handleMarcaChange}
                  onClick={handleChange}
                >
                  <option selected disabled value=" ">{ma}</option>
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

              </div>
              <br />
              <div className="col-6">
                <label className="form-label">
                  <strong>SUBMARCA DEL VEHICULO ROBADO:</strong>

                </label>
                <br />
                <select
                  className="select col-10"
                  id="ID_SUBMARCA"
                  name="ID_SUBMARCA"
                  defaultValue={modificar.ID_SUBMARCA}
                  onClick={handleChange}
                >
                  <option disabled value="">{smarca}</option>
                  {submarca.map((sm) => (
                    <option
                      key={sm.id_submarca}
                      value={sm.id_submarca}>

                      {sm.descripcion}
                    </option>
                  ))}
                </select>

              </div>
            </div>
            <br />



            <div className="row">
              <div className="col-4">
                <label className="form-label">
                  <strong>AÑO DEL VEHICULO EN CUATRO DIGITOS</strong>

                </label>
                <input
                  placeholder=" AÑO EN CUATRO DIGITOS"
                  type="text"
                  className="form-control"
                  id="MODELO"
                  name="MODELO"
                  onChange={handleChange}
                  defaultValue={modificar.MODELO}
                  maxLength="4"
                />

              </div>

              <div className="col-4">
                <label className="form-label">
                  <strong>COLOR DEL VEHICULO</strong>
                </label>
                <select
                  id="ID_COLOR"
                  name="ID_COLOR"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option selected disabled value=" ">{colo}</option>
                  {color.map((colors) => (
                    <option key={colors.id_color} value={colors.id_color}>
                      {colors.descripcion}
                    </option>
                  ))}
                </select>

              </div>
              <div className="col-4">
                <label className="form-label">
                  <strong>N° DE SERIE O IDENTIFICADOR DEL VEHICULO</strong>

                </label>
                <input
                  type="text"
                  className="form-control"
                  id="SERIE"
                  name="SERIE"
                  defaultValue={modificar.SERIE}
                  onChange={handleChange}
                />

              </div>
            </div>
            <br />


            <div className="row">
              <div className="col-6">
                <label className="form-label">
                  <strong>CLAVE DEL TIPO DE USO DEL VEHICULO</strong>

                </label>
                <select
                  name="ID_TIPO_USO"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option selected disabled value=" ">{uso}</option>
                  {tipo_uso.map((elemento) => (
                    <option
                      key={elemento.id_tipo_uso}
                      value={elemento.id_tipo_uso}
                    >
                      {elemento.descripcion}
                    </option>
                  ))}
                </select>

              </div>

              <div className="col-6">
                <label className="form-label">
                  <strong>IDENTIFICADOR DE LA PROCEDENCIA DEL VEHICULO</strong>

                </label>
                <select
                  id="ID_PROCEDENCIA"
                  name="ID_PROCEDENCIA"
                  className="form-control"
                  onChange={handleChange}
                >

                  <option selected disabled value=" " >{pro}</option>
                  {procedencia.map((element) => (
                    <option
                      key={element.id_procedencia}
                      value={element.id_procedencia}
                    >
                      {element.descripcion}
                    </option>
                  ))}
                </select>
              </div>

              <br></br>

              <div className="col-4">
              <label className="form-label">Que tipo de placa usa:</label>
              <select className="form-control" id="PE" name="PE" value={modificar.PE} onChange={handleChange} disabled={inputHD}>
                <option value="">Seleccione un tipo de placa</option>
                <option value="0">Nacional</option>
                <option value="1">Extranjera</option>
              </select>

            </div>
            </div>
            <button type="submit" className="btn  btn-primary me-md-2" onClick={handleClick}>guardar cambios</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Editar_sr
