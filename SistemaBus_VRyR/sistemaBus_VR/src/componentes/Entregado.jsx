import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import "../archivosCss/formulario.css"
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { Link, useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import { Toaster, toast } from 'sonner'
import { BiCheck } from 'react-icons/bi'

export const Entregado = () => {

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

  const { id } = useParams()
  const [editar, setEditar] = useState(0)

  const handleClickModificarEntregado = async (e, id) => {
    e.preventDefault();
    formatoDia()
    formatoHora()
    setEditar(0)
    try {
      await axios.post(`http://localhost:8081/modificarEntregado/${id}`, modificarEntregado)
      console.log(setModificarEntregado + "SetModificarEntregado")

      alert("El nuevo registro ha sido guardado correctamente ")
      navigate("/")

    } catch (err) {
      console.log(err)
    }
  }

  let id_alterna = id
  let id_entidad = 0

  let dateRobo, newDateRobo
  let dateRecuperado, newDateRecuperado

  const [entregado, setEntregado] = useState({
    id_fuente: '',
    calle_entrega: '',
    colonia_entrega: '',
    id_municipio_entrega: '',
    id_entidad_entrega: '',
    cp_entrega: '',
    inspeccion: '',
    id_fuente_entrega: '',
    fecha_entrega: '',
    hora_entrega: '',
    serie: '',
    motor: '',
    factura_vehiculo: '',
    comprob_domic_prop: '',
    persona_entrega: '',
    nombre_entrega: '',
    paterno_entrega: ''
  })

  const [modificarEntregado, setModificarEntregado] = useState({
    id_fuente: '',
    calle_entrega: '',
    colonia_entrega: '',
    id_municipio_entrega: '',
    id_entidad_entrega: '',
    cp_entrega: '',
    inspeccion: '',
    id_fuente_entrega: '',
    fecha_entrega: '',
    hora_entrega: '',
    serie: '',
    motor: '',
    factura_vehiculo: '',
    comprob_domic_prop: '',
    persona_entrega: '',
    nombre_entrega: '',
    paterno_entrega: ''
  })

  const [entregadoBD, setEntregadoBD] = useState([])
  let results6 = []

  const [showModalValidacion, setShowModalValidacion] = useState(false)
  const [showModalSuccess, setShowModalSuccess] = useState(false)

  console.log(entregado)

  const [ultimoId, setUltimoId] = useState([])
  let results5 = []

  const [entidades, setEntidades] = useState([])
  let results2 = []

  const [municipios, setMunicipios] = useState([])
  let results3 = []

  const [fechaRobado, setFechaRobado] = useState([])
  let results7 = []

  const [fechaRecuperado, setFechaRecuperado] = useState([])
  let results8 = []

  const [entidadSeleccionada, setEntidadSeleccionada] = useState('')

  const [descValidacion, setDescValidacion] = useState('')
  const [desc2Validacion, setDesc2Validacion] = useState('')

  const handleCloseModalValidacion = () => {
    setDescValidacion('')
    setDesc2Validacion('')
    setShowModalValidacion(false)
  }

  const handleCloseModalSuccess = () => {
    setShowModalSuccess(false)
  }

  const handleShowModalValidacion = () => setShowModalValidacion(true)
  const handleShowModalSuccess = () => setShowModalSuccess(true)

  const EntregadoBD = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8081/entregado/${id}`)
      setEntregadoBD(data)
    }
    catch (err) {

    }
  }

  const entidadesSelect = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/entidades");
      setEntidades(data)
    }
    catch (err) {
      console.log(err)
    }
  }

  const municipiosSelect = async (id_entidad) => {
    id_entidad = entidades.ID_ENTIDAD
    console.log(entidades.ID_ENTIDAD + "ENTIDADES")
    try {
      const { data } = await axios.get("http://localhost:8081/municipios", { id_entidad: id_entidad })
      setMunicipios(data)
    }
    catch (err) {
      console.log(err)
    }
  }

  const cargarMunicipios = async (entidadId) => {
    try {
      const response = await axios.get(`http://localhost:8081/municipios/${entidadId}`);
      setMunicipios(response.data)
    } catch (error) {
      console.error('Error al cargar los municipios:', error);
    }
  }

  const ultimoIdSelect = async () => {
    try {
      const { data } = await axios.get("http://localhost:8081/ultimoId")
      setUltimoId(data)
    }
    catch (err) {
      console.log(err)
    }
  }

  const fechaDeRobado = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8081/fechaRobado/${id}`)
      setFechaRobado(data)
    }
    catch (err) {

    }
  }

  const fechaDeRecuperado = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8081/fechaRecuperado/${id}`)
      setFechaRecuperado(data)
    }
    catch (err) {

    }
  }
  useEffect(() => {
    entidadesSelect()
    ultimoIdSelect()
    fechaDeRobado()
    fechaDeRecuperado()
  }, [])

  useEffect(() => {
    EntregadoBD()
  }, setEditar)


  results2 = entidades
  results3 = municipios
  results5 = ultimoId
  results6 = entregadoBD
  results7 = fechaRobado
  results8 = fechaRecuperado

  const formatoDia = () => {

    let fecha
    let today = new Date()
    let mes = today.getMonth() + 1
    fecha = today.getFullYear() + "/" + mes + "/" + today.getDate()
    entregado['fecha'] = fecha
    console.log("la fecha de la funcion es :", fecha)
  }

  const formatoHora = () => {
    let horaCompleta
    let today = new Date()
    let hora = today.getHours()
    let minutos = today.getMinutes()
    horaCompleta = hora + ':' + minutos
    entregado['hora'] = horaCompleta
    console.log('La hora de registro es: ', horaCompleta)
  }

  const handleChange = (e) => {
    formatoDia()
    formatoHora()
    setEntregado((prev) => ({ ...prev, id_alterna, nombre_bitacora, apellidos_bitacora, correoIns_bitacora, username_bitacora, municipio_bitacora, idUser_bitacora, [e.target.name]: e.target.value }))
    id_entidad = document.getElementById('id_entidad_entrega')
  }

  const handleChangeModificacionEntregado = (e) => {
    formatoDia()
    formatoHora()
    setModificarEntregado((prev) => ({ ...prev, id_alterna, [e.target.name]: e.target.value }))
    id_entidad = document.getElementById('id_entidad_recupera')
  }

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
  }

  const loading = () => {
    return new Promise((resolve) => setTimeout(resolve, 3000))
  }

  //OBTENER LA FECHA ACTUAL PARA VALIDAD INPUT TYPE DATE
  let today = new Date().toISOString().split('T')[0];
  let minDate = "1900-01-01"

  console.log(modificarEntregado)

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(entregado)

    try {
      console.log("Entre al try")
      let camposValidados = validarCampos()

      if (!camposValidados) return

      await axios.post("http://localhost:8081/crearEntregado", entregado);
      console.log(setEntregado + "SetEntregado")
      alert("El nuevo registro ha sido guardado correctamente ")
      navigate("/")

    } catch (err) {
      console.log(err)
    }
  }

  //VALIDA QUE LOS CAMPOS TEXTO NO ACEPTEN NUMEROS
  const Solo_Texto = (e) => {
    var code
    if (!e) var e = window.event
    if (e.keyCode) code = e.keyCode
    else if (e.which) code = e.which
    var character = String.fromCharCode(code)
    var AllowRegex = /^[\ba-zA-Z\s-]$/
    if (AllowRegex.test(character)) return true
    event.preventDefault()
  }

  //VALIDA QUE LOS CAMPOS NUMERICOS NO ACEPTEN LETRAS
  function filterInteger(event) {
    var regex = new RegExp("^[0-9]+$")
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode)
    if (!regex.test(key)) {
      event.preventDefault()
      return false
    }
  }


  const validarCampos = () => {
    let hayErrores = false
    let desc = ''
    let desc2 = ''
    let desc3 = ''
    let flag = true

    if (entregado.serie.includes('o') || entregado.serie.includes('i') || entregado.serie.includes('ñ') || entregado.serie.includes('q') || entregado.serie.includes('O') || entregado.serie.includes('I') || entregado.serie.includes('Ñ') || entregado.serie.includes('Q')) {
      desc3 = 'La serie no debe contener (o,i,ñ,q)'
      document.getElementById('grupo_serie').classList.add('formulario_grupo-incorrecto')

      hayErrores = true
    } else {
      document.getElementById('grupo_serie').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.serie.length < 1) {
      desc = desc + ', SERIE '
      document.getElementById('grupo_serie').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_serie').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.id_entidad_entrega.length < 1) {
      document.getElementById('grupo_entidad').classList.add('formulario_grupo-incorrecto')
      desc = desc + ', ENTIDAD '
      hayErrores = true
    } else {
      document.getElementById('grupo_entidad').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.id_municipio_entrega.length < 1) {
      desc = desc + ', MUNICIPIO '
      document.getElementById('grupo_municipio').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_municipio').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.calle_entrega.length < 1) {
      desc = desc + ', CALLE '
      document.getElementById('grupo_calle').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_calle').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.colonia_entrega.length < 1) {
      desc = desc + ', COLONIA '
      document.getElementById('grupo_colonia').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_colonia').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.cp_entrega.length < 1) {
      desc = desc + ', CÓDIGO POSTAL '
      document.getElementById('grupo_cp').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_cp').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.inspeccion.length < 1) {
      desc = desc + ', INSPECCIÓN '
      document.getElementById('grupo_inspeccion').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_inspeccion').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.fecha_entrega.length < 1) {
      desc = desc + ', FECHA '
      document.getElementById('grupo_fecha').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_fecha').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.hora_entrega.length < 1) {
      desc = desc + ', HORA '
      document.getElementById('grupo_hora').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_hora').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.motor.length < 1) {
      desc = desc + ', MOTOR '
      document.getElementById('grupo_motor').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_motor').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.factura_vehiculo.length < 1) {
      desc = desc + ', NÚMERO DE FACTURA '
      document.getElementById('grupo_factura').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_factura').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.comprob_domic_prop.length < 1) {
      desc = desc + ', COMPROBANTE DE DOMICILIO '
      document.getElementById('grupo_comprobante').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_comprobante').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.persona_entrega.length < 1) {
      desc = desc + ', PERSONA QUE ENTREGA EL VEHICULO '
      document.getElementById('grupo_persona').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_persona').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.nombre_entrega.length < 1) {
      desc = desc + ', NOMBRE DEL PROPIETARIO / REPRESENTANTE '
      document.getElementById('grupo_nombre').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_nombre').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.paterno_entrega.length < 1) {
      desc = desc + ', APELLIDO DEL PROPIETARIO / REPRESENTANTE '
      document.getElementById('grupo_apellido').classList.add('formulario_grupo-incorrecto')
      hayErrores = true
    } else {
      document.getElementById('grupo_apellido').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.serie.includes("  ") || entregado.serie.startsWith(" ") || entregado.serie.endsWith(" ")) {
      desc = desc + ', el campo SERIE no debe contener doble espacio ni empezar/terminar con espacio '
      document.getElementById('grupo_serie').classList.add('formulario_grupo-incorrecto')
      flag = false
      hayErrores = true
    } else if (flag = false) {
      document.getElementById('grupo_serie').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.id_entidad_entrega.includes("  ") || entregado.id_entidad_entrega.startsWith(" ") || entregado.id_entidad_entrega.endsWith(" ")) {
      desc = desc + ', el campo ENTIDAD no debe contener doble espacio ni empezar/terminar con espacio '
      document.getElementById('grupo_entidad').classList.add('formulario_grupo-incorrecto')
      flag = false
      hayErrores = true
    } else if (flag = false) {
      document.getElementById('grupo_entidad').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.id_municipio_entrega.includes("  ") || entregado.id_municipio_entrega.startsWith(" ") || entregado.id_municipio_entrega.endsWith(" ")) {
      desc = desc + ', el campo MUNICIPIO no debe contener doble espacio ni empezar/terminar con espacio '
      document.getElementById('grupo_municipio').classList.add('formulario_grupo-incorrecto')
      flag = false
      hayErrores = true
    } else if (flag = false) {
      document.getElementById('grupo_municipio').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.colonia_entrega.includes("  ") || entregado.colonia_entrega.startsWith(" ") || entregado.colonia_entrega.endsWith(" ")) {
      desc = desc + ', el campo COLONIA no debe contener doble espacio ni empezar/terminar con espacio '
      document.getElementById('grupo_colonia').classList.add('formulario_grupo-incorrecto')
      flag = false
      hayErrores = true
    } else if (flag = false) {
      document.getElementById('grupo_colonia').classList.remove('formulario_grupo-incorrecto')
    }
    if (entregado.calle_entrega.includes("  ") || entregado.calle_entrega.startsWith(" ") || entregado.calle_entrega.endsWith(" ")) {
      desc = desc + ', el campo CALLE no debe contener doble espacio ni empezar/terminar con espacio '
      document.getElementById('grupo_calle').classList.add('formulario_grupo-incorrecto')
      flag = false
      hayErrores = true
    } else if (flag = false) {
      document.getElementById('grupo_calle').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.motor.includes("  ") || entregado.motor.startsWith(" ") || entregado.motor.endsWith(" ")) {
      desc = desc + ', el campo MOTOR no debe contener doble espacio ni empezar/terminar con espacio '
      document.getElementById('grupo_motor').classList.add('formulario_grupo-incorrecto')
      flag = false
      hayErrores = true
    } else if (flag = false) {
      document.getElementById('grupo_motor').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.cp_entrega.includes("  ") || entregado.cp_entrega.startsWith(" ") || entregado.cp_entrega.endsWith(" ")) {
      desc = desc + ', el campo CÓDIGO POSTAL no debe contener doble espacio ni empezar/terminar con espacio '
      document.getElementById('grupo_cp').classList.add('formulario_grupo-incorrecto')
      flag = false
      hayErrores = true
    } else if (flag = false) {
      document.getElementById('grupo_cp').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.factura_vehiculo.includes("  ") || entregado.factura_vehiculo.startsWith(" ") || entregado.factura_vehiculo.endsWith(" ")) {
      desc = desc + ', el campo NÚMERO DE FACTURA no debe contener doble espacio ni empezar/terminar con espacio '
      document.getElementById('grupo_factura').classList.add('formulario_grupo-incorrecto')
      flag = false
      hayErrores = true
    } else if (flag = false) {
      document.getElementById('grupo_factura').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.comprob_domic_prop.includes("  ") || entregado.comprob_domic_prop.startsWith(" ") || entregado.comprob_domic_prop.endsWith(" ")) {
      desc = desc + ', el campo COMPROBANTE DE DOMICILIO no debe contener doble espacio ni empezar/terminar con espacio '
      document.getElementById('grupo_comprobante').classList.add('formulario_grupo-incorrecto')
      flag = false
      hayErrores = true
    } else if (flag = false) {
      document.getElementById('grupo_comprobante').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.nombre_entrega.includes("  ") || entregado.nombre_entrega.startsWith(" ") || entregado.nombre_entrega.endsWith(" ")) {
      desc = desc + ', el campo NOMBRE DEL PROPIETARIO / REPRESENTANTE no debe contener doble espacio ni empezar/terminar con espacio '
      document.getElementById('grupo_nombre').classList.add('formulario_grupo-incorrecto')
      flag = false
      hayErrores = true
    } else if (flag = false) {
      document.getElementById('grupo_nombre').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.paterno_entrega.includes("  ") || entregado.paterno_entrega.startsWith(" ") || entregado.paterno_entrega.endsWith(" ")) {
      desc = desc + ', el campo APELLIDO DEL PROPIETARIO / REPRESENTANTE no debe contener doble espacio ni empezar/terminar con espacio '
      document.getElementById('grupo_apellido').classList.add('formulario_grupo-incorrecto')
      flag = false
      hayErrores = true
    } else if (flag = false) {
      document.getElementById('grupo_apellido').classList.remove('formulario_grupo-incorrecto')
    }

    if (entregado.persona_entrega.includes("  ") || entregado.persona_entrega.startsWith(" ") || entregado.persona_entrega.endsWith(" ")) {
      desc = desc + ', el campo PERSONA QUE ENTREGA EL VEHICULO no debe contener doble espacio ni empezar/terminar con espacio '
      document.getElementById('grupo_persona').classList.add('formulario_grupo-incorrecto')
      flag = false
      hayErrores = true
    } else if (flag = false) {
      document.getElementById('grupo_persona').classList.remove('formulario_grupo-incorrecto')
    }

    if (hayErrores) {
      setDescValidacion(desc)
      setDesc2Validacion(desc2)
      toast.error(<div>
        <p style={{ fontSize: "1rem" }}>Los campos son obligatorios</p>
        <p style={{ fontSize: "1rem" }}>{desc3}</p>
        <p style={{ fontSize: "1rem" }}>{desc2}</p>

      </div>)
      return false
    } else {
      toast.promise(loading, {
        error: "Se ha producido un error",
        success: "Se ha registrado exitosamente!",
        loading: "Cargando información..."
      })
      document.getElementById('grupo_entidad').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_municipio').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_calle').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_colonia').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_cp').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_serie').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_motor').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_inspeccion').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_factura').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_fecha').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_hora').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_nombre').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_apellido').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_comprobante').classList.remove('formulario_grupo-incorrecto')
      document.getElementById('grupo_persona').classList.remove('formulario_grupo-incorrecto')
      const formulario = document.getElementById('formulario')
      formulario.reset()
      return true
    }

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
      <Navbar />
      <div className='area-form'>
        <div className='contenedor'>
          <form class='row g-3' id='formulario'>
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
            <center><h1>REGISTRO DE VEHICULOS ENTREGADOS</h1></center>
            {results5.map(ultimoId => {
              return (
                <input id='id_alterna' type="hidden" name="id_alterna" key={ultimoId.id} value={ultimoId.id + 1} onChange={handleChange} ></input>

              )
            })}
            <span><h5>1.-Datos de ubicación de entrega del vehiculo</h5></span>
            <div class="formulario_grupo col-3" id='grupo_entidad'>
              <label className="form-label" class="formulario_label" for='id_entidad_entrega' >ENTIDAD:</label>
              <br />
              <div class="formulario_grupo-input">
                <select className="form-control" id="id_entidad_entrega" name="id_entidad_entrega" onChange={handleEntidadChange} onClick={handleChange} required>
                  <option selected disabled value="">SELECCIONE ENTIDAD</option>
                  {results2.map(entidades => {
                    return (
                      <option name={entidades.ID_ENTIDAD} key={entidades.ID_ENTIDAD} value={entidades.ID_ENTIDAD}>{entidades.ENTIDAD}</option>
                    )
                  })}
                </select>
              </div>
              <div class="invalid-feedback">Porfavor selecciona una entidad.</div>
            </div>
            <div class="formulario_grupo col-3" id='grupo_municipio'>
              <label className="form-label" class="formulario_label" for='id_municipio_entrega' >MUNICIPIO:</label>
              <br />
              <div class="formulario_grupo-input">
                <select className='form-control' id='id_municipio_entrega' name='id_municipio_entrega' onChange={handleChange} required>
                  <option selected disabled value="">SELECCIONE MUNICIPIO</option>
                  {municipios.map((municipio) => (
                    <option key={municipio.ID_MUNICIPIO} value={municipio.ID_MUNICIPIO}>
                      {municipio.MUNICIPIO}
                    </option>
                  ))}
                </select>
              </div>
              <div class="invalid-feedback">Porfavor selecciona un municipio.</div>
            </div>
            <div class="formulario_grupo col-md-2" id='grupo_calle'>
              <label className="form-label" for='calle_entrega' class="formulario_label" > CALLE:</label>
              <div class="formulario_grupo-input">
                <input type="text" className="form-control" id="calle_entrega" name="calle_entrega" onKeyDown={Solo_Texto} onChange={handleChange} required />
              </div>
              <div class="invalid-feedback">Porfavor rellene el campo.</div>
            </div>
            <div class="formulario_grupo col-md-2" id='grupo_colonia'>
              <label className="form-label" class="formulario_label" for='colonia_entrega' > COLONIA:</label>
              <div class="formulario_grupo-input">
                <input type="text" className="form-control" id="colonia_entrega" name="colonia_entrega" onKeyDown={Solo_Texto} onChange={handleChange} required />
              </div>
              <div class="invalid-feedback">Porfavor rellene el campo.</div>
            </div>
            <div class="formulario_grupo col-md-2" id='grupo_cp'>
              <label className="form-label" class="formulario_label" for='cp_entrega' > CÓDIGO POSTAL:</label>
              <div class="formulario_grupo-input">
                <input type="text" className="form-control" id="cp_entrega" name="cp_entrega" onKeyDown={filterInteger} onChange={handleChange} required />
              </div>
              <div class="invalid-feedback">Porfavor rellene el campo.</div>
            </div>
            <span><h5>2.-Datos del vehiculo</h5></span>
            <div class="formulario_grupo col-md-3" id='grupo_serie'>
              <label className="form-label" class="formulario_label" for='serie' > SERIE:</label>
              <div class="formulario_grupo-input">
                <input type="text" className="form-control" id="serie" name="serie" onChange={handleChange} required />
              </div>
              <div class="invalid-feedback">Porfavor rellene el campo.</div>
            </div>
            <div class="formulario_grupo col-md-2" id='grupo_motor'>
              <label className="form-label" class="formulario_label" for='calle_entrega' > MOTOR:</label>
              <div class="formulario_grupo-input">
                <input type="text" className="form-control" id="motor" name="motor" onChange={handleChange} required />
              </div>
              <div class="invalid-feedback">Porfavor rellene el campo.</div>
            </div>
            <div class="formulario_grupo col-4" id='grupo_inspeccion'>
              <label className="form-label" class="formulario_label" for='inspeccion' >INSPECCIÓN:</label>
              <br />
              <div class="formulario_grupo-input">
                <select className='form-control' id='inspeccion' name='inspeccion' onChange={handleChange} required>
                  <option selected disabled value="">SELECCIONE UNA OPCIÓN</option>
                  <option value='1'>INSPECCIÓN REALIZADA AL VEHICULO ENTREGADO</option>
                  <option value='0'>NO REALIZADA</option>
                </select>
              </div>
              <div class="invalid-feedback">Porfavor selecciona una opción.</div>
            </div>
            <div class="formulario_grupo col-md-3" id='grupo_factura'>
              <label className="form-label" class="formulario_label" for='factura_vehiculo' > NÚMERO DE FACTURA:</label>
              <div class="formulario_grupo-input">
                <input type="text" className="form-control" id="factura_vehiculo" name="factura_vehiculo" onKeyDown={filterInteger} onChange={handleChange} required />
              </div>
              <div class="invalid-feedback">Porfavor rellene el campo.</div>
            </div>
            <span><h5>3.-Datos de fecha de entrega del vehiculo</h5></span>
            <div class="formulario_grupo col-md-6" id='grupo_fecha'>
              <label className="form-label" class="formulario_label"> FECHA:</label>
              { }
              <div class="formulario_grupo-input">
                {/* VALIDACIÓN La fecha de entrega no puede ser menor a la fecha de robo.*/}
                {results7.map(fechaRobado => {
                  dateRobo = new Date(fechaRobado.FECHA_ROBO)
                  console.log(dateRobo)
                  let monthRobo = dateRobo.getMonth() + 1
                  if (monthRobo > 0 && monthRobo < 10) {
                    monthRobo = "0" + monthRobo
                  }
                  let dayRobo = dateRobo.getDate()
                  if (dayRobo > 0 && dayRobo < 10) {
                    console.log("day ", dayRobo)
                    dayRobo = "0" + dayRobo
                  }
                  newDateRobo = dateRobo.getFullYear() + "-" + monthRobo + "-" + dayRobo
                  console.log("FECHA ROBO ", newDateRobo)
                  return (
                    <>
                      {/* VALIDACIÓN La fecha de factura no puede ser menor a la fecha de recuperación.*/}
                      {results8.map(fechaRecuperado => {
                        dateRecuperado = new Date(fechaRecuperado.FECHA_REC)
                        let monthRecuperacion = dateRecuperado.getMonth() + 1
                        if (monthRecuperacion > 0 && monthRecuperacion < 10) {
                          monthRecuperacion = "0" + monthRecuperacion
                        }
                        let dayRecuperacion = dateRecuperado.getDate()
                        if (dayRecuperacion > 0 && dayRecuperacion < 10) {
                          dayRecuperacion = "0" + dayRecuperacion
                        }
                        newDateRecuperado = dateRecuperado.getFullYear() + "-" + monthRecuperacion + "-" + dayRecuperacion
                        console.log("FECHA RECUPERADO ", newDateRecuperado)

                        if (newDateRobo < newDateRecuperado) {
                          return <input type="date" max={today} min={newDateRobo} className="form-control" id="fecha_entrega" name="fecha_entrega" onChange={handleChange} required />
                        } else if (newDateRobo > newDateRecuperado) {
                          return <input type="date" max={today} min={newDateRecuperado} className="form-control" id="fecha_entrega" name="fecha_entrega" onChange={handleChange} required />
                        } else if (newDateRecuperado === newDateRobo) {
                          return <input type="date" max={today} min={newDateRobo} className="form-control" id="fecha_entrega" name="fecha_entrega" onChange={handleChange} required />
                        }
                      })}
                    </>
                  )
                })}
              </div>
              <div class="invalid-feedback">Porfavor rellene el campo.</div>
            </div>
            <div class="formulario_grupo col-md-6" id='grupo_hora'>
              <label className="form-label" class="formulario_label"> HORA:</label>
              <div class="formulario_grupo-input">
                <input type="time" className="form-control" id="hora_entrega" name="hora_entrega" onChange={handleChange} required />
              </div>
              <div class="invalid-feedback">Porfavor rellene el campo.</div>
            </div>
            <span><h5>4.-Datos del propietario del vehiculo</h5></span>
            <div class="formulario_grupo col-md-6" id='grupo_nombre'>
              <label className="form-label" class="formulario_label" for='nombre_entrega' >NOMBRE DEL PROPIETARIO / REPRESENTANTE:</label>
              <div class="formulario_grupo-input">
                <input type="text" className="form-control" id="nombre_entrega" name="nombre_entrega" onKeyDown={Solo_Texto} onChange={handleChange} required />
              </div>
              <div class="invalid-feedback">Porfavor rellene el campo.</div>
            </div>
            <div class="formulario_grupo col-md-6" id='grupo_apellido'>
              <label className="form-label" class="formulario_label" for='nombre_entrega' >APELLIDO DEL PROPIETARIO / REPRESENTANTE:</label>
              <div class="formulario_grupo-input">
                <input type="text" className="form-control" id="paterno_entrega" name="paterno_entrega" onKeyDown={Solo_Texto} onChange={handleChange} required />
              </div>
              <div class="invalid-feedback">Porfavor rellene el campo.</div>
            </div>
            <div class="formulario_grupo col-md-6" id='grupo_comprobante'>
              <label className="form-label" class="formulario_label" for='comprob_domic_prop' > COMPROBANTE DE DOMICILIO:</label>
              <div class="formulario_grupo-input">
                <input type="text" className="form-control" id="comprob_domic_prop" name="comprob_domic_prop" onChange={handleChange} required />
              </div>
              <div class="invalid-feedback">Porfavor rellene el campo.</div>
            </div>
            <div class="formulario_grupo col-6" id='grupo_persona'>
              <label className="form-label" class="formulario_label" for='persona_entrega' >PERSONA QUE RECIBE EL VEHICULO:</label>
              <br />
              <div class="formulario_grupo-input">
                <select className='form-control' id='persona_entrega' name='persona_entrega' onChange={handleChange} required>
                  <option selected disabled value="">SELECCIONE UNA OPCIÓN</option>
                  <option value='1'>PROPIETARIO</option>
                  <option value='2'>REPRESENTANTE</option>
                </select>
              </div>
              <div class="invalid-feedback">Porfavor selecciona una opción.</div>
            </div>
            <div class="col-md-12">
              <Button variant="primary" type="submit" onClick={handleClick}>Enviar</Button>
              <Link to="/ListaArchivos" className="btn btn-info"> Inicio</Link>
              <Button disabled variant='primary' onClick={() => {
                setEditar(id)
              }}> Editar </Button>
              {editar == id && (
                <div className='edit_form'>
                  <h3 className='title'>Modificar</h3>
                  <form>
                    {results6.map(entregadoBD => {
                      let date2 = new Date(entregadoBD.FECHA_ENTREGA)
                      let newDate2 = date2.getFullYear() + "/" + date2.getMonth() + "/" + date2.getDay()
                      return (
                        <>
                          <label>CALLE:</label>
                          <input type='text' name='calle_entrega' className="form-control" defaultValue={entregadoBD.CALLE_ENTREGA} onChange={handleChangeModificacionEntregado}></input>
                          <label>COLONIA:</label>
                          <input type='text' name='calle_entrega' className="form-control" defaultValue={entregadoBD.COLONIA_ENTREGA} onChange={handleChangeModificacionEntregado}></input>
                          <label>CÓDIGO POSTAL:</label>
                          <input type='text' name='calle_entrega' className="form-control" defaultValue={entregadoBD.CP_ENTREGA} onChange={handleChangeModificacionEntregado}></input>
                          <label>SERIE:</label>
                          <input type='text' name='calle_entrega' className="form-control" defaultValue={entregadoBD.SERIE} onChange={handleChangeModificacionEntregado}></input>
                          <label>MOTOR:</label>
                          <input type='text' name='calle_entrega' className="form-control" defaultValue={entregadoBD.MOTOR} onChange={handleChangeModificacionEntregado}></input>
                          <label>NÚMERO DE FACTURA:</label>
                          <input type='text' name='calle_entrega' className="form-control" defaultValue={entregadoBD.FACTURA_VEHICULO} onChange={handleChangeModificacionEntregado}></input>
                          <label>NOMBRE DEL PROPIETARIO / REPRESENTANTE:</label>
                          <input type='text' name='calle_entrega' className="form-control" defaultValue={entregadoBD.NOMBRE_ENTREGA} onChange={handleChangeModificacionEntregado}></input>
                          <label>APELLIDO DEL PROPIETARIO / REPRESENTANTE:</label>
                          <input type='text' name='calle_entrega' className="form-control" defaultValue={entregadoBD.PATERNO_ENTREGA} onChange={handleChangeModificacionEntregado}></input>
                          <label>COMPROBANTE DE DOMICILIO:</label>
                          <input type='text' name='calle_entrega' className="form-control" defaultValue={entregadoBD.COMPROB_DOMIC_PROP} onChange={handleChangeModificacionEntregado}></input>
                          <label>ENTIDAD:</label>
                          <select className="form-control" id="id_entidad_entrega" name="id_entidad_entrega" onChange={handleEntidadChange} onClick={handleChange} required>
                            <option selected disabled value="">{entregadoBD.ID_ENTIDAD_ENTREGA}</option>
                            {results2.map(entidades => {
                              return (
                                <option name={entidades.ID_ENTIDAD} key={entidades.ID_ENTIDAD} value={entidades.ID_ENTIDAD}>{entidades.ENTIDAD}</option>
                              )
                            })}
                          </select>
                          <label>MUNICIPIO:</label>
                          <select className='form-control' id='id_municipio_entrega' name='id_municipio_entrega' onChange={handleChange} required>
                            <option selected disabled value="">{entregadoBD.ID_MUNICIPIO_ENTREGA}</option>
                            {municipios.map((municipio) => (
                              <option key={municipio.ID_MUNICIPIO} value={municipio.ID_MUNICIPIO}>
                                {municipio.MUNICIPIO}
                              </option>
                            ))}
                          </select>
                          <label>INSPECCIÓN:</label>
                          <select className='form-control' id='inspeccion' name='inspeccion' onChange={handleChange} required>
                            <option selected disabled value="">{entregadoBD.INSPECCION}</option>
                            <option value='1'>INSPECCIÓN REALIZADA AL VEHICULO ENTREGADO</option>
                            <option value='0'>NO REALIZADA</option>
                          </select>
                          <label>FECHA:</label>
                          {newDate2}
                          <input type="date" max={today} min={minDate} className="form-control" id="fecha_entrega" name="fecha_entrega" onChange={handleChange} required />
                          <label>HORA:</label>
                          <input type="time" className="form-control" defaultValue={entregadoBD.HORA_ENTREGA} id="hora_entrega" name="hora_entrega" onChange={handleChange} required />
                          <label>PERSONA QUE RECIBE EL VEHICULO</label>
                          <select className='form-control' id='persona_entrega' name='persona_entrega' onChange={handleChange} required>
                            <option selected disabled value="">{entregadoBD.PERSONA_ENTREGA}</option>
                            <option value='1'>PROPIETARIO</option>
                            <option value='2'>REPRESENTANTE</option>
                          </select>
                        </>
                      )
                    })}
                    <Button variant="primary" type="submit" onClick={e => handleClickModificarEntregado(e, id)} className='editar'>Actualizar</Button>
                  </form>
                </div>
              )}

            </div>

          </form>


          <Toaster
            position='top-center'
            dir='auto'
            richColors
          />
        </div>


        <Modal aria-labelledby="contained-modal-title-vcenter" size="lg" dialogClassName="modal-90w" centered show={showModalValidacion} onHide={handleCloseModalValidacion}>
          <Modal.Header closeButton>
            <Modal.Title>Ha ocurrido un error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{descValidacion}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalValidacion}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal aria-labelledby="contained-modal-title-vcenter" centered show={showModalSuccess} onHide={handleCloseModalSuccess}>
          <Modal.Header closeButton>
            <Modal.Title>Success!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Se ha registrado satisfactoriamente!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalSuccess}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}
