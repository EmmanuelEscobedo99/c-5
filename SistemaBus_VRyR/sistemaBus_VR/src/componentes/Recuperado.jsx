import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "../archivosCss/formulario.css"
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import ListaArchivos from './ListaArchivos'
import { Toaster, toast } from 'sonner'
import { BiCheck } from 'react-icons/bi'
import { Editar } from './Editar'
import Login from "./Login"
import { useNavigate } from 'react-router-dom';


export const Recuperado = () => {

    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))
    const [userData, setUserData] = useState([]);
    let [color, setColor] = useState([]);
    let result = []
    //console.log(isLoggedIn, "MASD")

    useEffect(() => {
        if (isLoggedIn) {
            //console.log("SE EJECUTO EL useEFFECT")
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

                    } catch (err) {
                        //console.log(err)
                    }
                }
            }
            traerUsuario()
        }

    }, [isLoggedIn]);

    let nombre_bitacora, entidadName, serie, placa, colores
    let apellidos_bitacora, correoIns_bitacora, username_bitacora, municipio_bitacora, idUser_bitacora

    //console.log(userData)

    const handleLogin = () => {
        setIsLoggedIn(true)
    }

    const { id } = useParams()
    const [editar, setEditar] = useState(0)

    const handleClickModificarRecuperado = async (e, id) => {
        e.preventDefault();
        formatoDia()
        formatoHora()
        setEditar(0)
        try {
            await axios.post(`http://localhost:8081/modificarRecuperado/${id}`, modificarRecuperado)
            //console.log(setModificarRecuperado + "SetModificarRecuperado")

            alert("El nuevo registro ha sido guardado correctamente ")
            navigate("/")

        } catch (err) {
            //console.log(err)
        }
    }
    let id_alterna = id
    let id_entidad = 0

    let dateFormat

    let dateRobo, newDateRobo


    const [recuperado, setRecuperado] = useState({
        placa: '',
        serie: '',
        calle_rec: '',
        numext_rec: '',
        colonia_rec: '',
        cp_rec: '',
        fecha_rec: '',
        hora_rec: '',
        id_color: '',
        id_fuente: '',
        id_entidad_recupera: '',
        id_municipio_rec: '',
        fecha: ''
    })

    const [modificarRecuperado, setModificarRecuperado] = useState({
        placa: '',
        serie: '',
        calle_rec: '',
        numext_rec: '',
        colonia_rec: '',
        cp_rec: '',
        fecha_rec: '',
        hora_rec: '',
        id_color: '',
        id_fuente: '',
        id_entidad_recupera: '',
        id_municipio_rec: '',
        fecha: ''
    })

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

    const [recuperadoBD, setRecuperadoBD] = useState([])
    let results6 = []
    let nombre_entidad

    const [showModalValidacion, setShowModalValidacion] = useState(false)
    const [showModalSuccess, setShowModalSuccess] = useState(false)



    const [ultimoId, setUltimoId] = useState([])
    let results5 = []

    const [llenado, setLlenado] = useState([])
    let results = []

    const [entidades, setEntidades] = useState([])
    let results2 = []

    const [municipios, setMunicipios] = useState([])
    let results3 = []

    const [fuente, setFuente] = useState([])
    let results4 = []

    const [fechaRobado, setFechaRobado] = useState([])
    let results7 = []

    const [entidadSeleccionada, setEntidadSeleccionada] = useState('')

    const [descValidacion, setDescValidacion] = useState('')

    const [desc2Validacion, setDesc2Validacion] = useState('')

    const [datos, setDatos] = useState([]);
    let resultsDatos = []

    const [datosColor, setDatosColor] = useState([]);
    let resultsColors = []

    const [idDatosColor, setIdDatosColor] = useState([])
    let resultsIdColor = []

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

    const RecuperadoBD = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8081/recuperado/${id}`)
            setRecuperadoBD(data)
        }
        catch (err) {

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

    const LlenarSelect = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/llenarColor");
            setLlenado(data)
        }
        catch (err) {
            //console.log(err)
        }
    }

    function traer_datos() {
        axios.get("http://localhost:8081/bId2/" + id)
            .then(res => {
                //console.log(res)
                setTemporal(res.data[0])
            })
            .catch(err => console.log(err))
    }

    function modalidad_color() {
        axios.get("http://localhost:8081/color/" + temporal.ID_COLOR)
            .then(res => {
                //console.log(res)
                setDatosColor(res.data[0].DESCRIPCION)
                setIdDatosColor(res.data[0].ID_COLOR)
            })
            .catch(err => console.log(err))
    }

    const entidadesSelect = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/entidades");
            setEntidades(data)
        }
        catch (err) {
            //console.log(err)
        }
    }

    const municipiosSelect = async (id_entidad) => {
        id_entidad = entidades.ID_ENTIDAD
        //console.log(entidades.ID_ENTIDAD + "ENTIDADES")
        try {
            const { data } = await axios.get("http://localhost:8081/municipios", { id_entidad: id_entidad })
            setMunicipios(data)
        }
        catch (err) {
            //console.log(err)
        }
    }

    const cargarMunicipios = async (entidadId) => {
        try {
            const response = await axios.get(`http://localhost:8081/municipios/${entidadId}`);
            setMunicipios(response.data)
        } catch (error) {
            //console.error('Error al cargar los municipios:', error);
        }
    }

    const fuenteSelect = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/fuente")
            setFuente(data)
        }
        catch (err) {
            //console.log(err)
        }
    }

    const ultimoIdSelect = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/ultimoId")
            setUltimoId(data)
        }
        catch (err) {
            //console.log(err)
        }
    }

    const serieAutomovil = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8081/serieAutomovil/${id}`)
            setDatos(data)
        } catch (err) {

        }
    }

    const colorAutomovil = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8081/colorAutomovil/${id}`)
        } catch (err) {

        }
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            traer_datos()
            modalidad_color()

        }, 100);
        return () => clearTimeout(timer);
    })


    useEffect(() => {
        LlenarSelect()
        entidadesSelect()
        fuenteSelect()
        ultimoIdSelect()
        fechaDeRobado()
        serieAutomovil()
        colorAutomovil()


    }, [])

    useEffect(() => {
        // Obtén una referencia al input
        const inputs = document.querySelectorAll('.form-control')
        // Dispara el evento 'click' en el input después de un pequeño retraso (por ejemplo, 1 segundo)

        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i]
            setTimeout(() => {
                console.log("click")
                input.click()
            }, 1000)
        }
    }, [])

    useEffect(() => {
        RecuperadoBD()
    }, setEditar)



    results = llenado
    results2 = entidades
    results3 = municipios
    results4 = fuente
    results5 = ultimoId
    results6 = recuperadoBD
    results7 = fechaRobado
    resultsDatos = datos
    resultsColors = datosColor
    resultsIdColor = idDatosColor

    //console.log("color: ",datosColor)

    const formatoDia = () => {

        let fecha
        let today = new Date()
        let mes = today.getMonth() + 1
        fecha = today.getFullYear() + "/" + mes + "/" + today.getDate()
        recuperado['fecha'] = fecha
        //console.log("la fecha de la funcion es :", fecha)
    }

    const formatoHora = () => {
        let horaCompleta
        let today = new Date()
        let hora = today.getHours()
        let minutos = today.getMinutes()
        horaCompleta = hora + ':' + minutos
        recuperado['hora'] = horaCompleta
        //console.log('La hora de registro es: ', horaCompleta)
    }

    const handleClicker = (e) => {
        handleChange()
    }

    const handleChange = (e) => {
        formatoDia()
        formatoHora()
        setRecuperado((prev) => ({ ...prev, id_alterna, nombre_bitacora, apellidos_bitacora, correoIns_bitacora, username_bitacora, municipio_bitacora, idUser_bitacora, [e.target.name]: e.target.value }))

        id_entidad = document.getElementById('id_entidad_recupera')
        console.log("datos", recuperado);
    }

    const handleChangeModificacionRecuperado = (e) => {
        formatoDia()
        formatoHora()
        setModificarRecuperado((prev) => ({ ...prev, id_alterna, [e.target.name]: e.target.value }))
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

    //console.log(recuperado)
    //console.log(modificarRecuperado)

    const handleClick = async (e) => {
        e.preventDefault();
        //console.log(recuperado)


        try {
            //console.log("Entre al try")
            let camposValidados = validarCampos()

            if (!camposValidados) return

            alert("El nuevo registro ha sido guardado correctamente ")
            navigate(`/detalles/${id}`)
            await axios.post("http://localhost:8081/crearRecuperadoTemporal", recuperado);
            //console.log(setRecuperado + "SetRecuperado")
        } catch (err) {
            //console.log(err)
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

        if (recuperado.serie.includes('o') || recuperado.serie.includes('i') || recuperado.serie.includes('ñ') || recuperado.serie.includes('q') || recuperado.serie.includes('O') || recuperado.serie.includes('I') || recuperado.serie.includes('Ñ') || recuperado.serie.includes('Q')) {
            desc3 = 'La serie no debe contener (o,i,ñ,q)'

            document.getElementById('grupo_serie').classList.add('formulario_grupo-incorrecto')
            hayErrores = true
        } else {
            document.getElementById('grupo_serie').classList.remove('formulario_grupo-incorrecto')

        }

        /*if (recuperado.serie.length < 1) {
            desc = desc + ', SERIE '

            document.getElementById('grupo_serie').classList.add('formulario_grupo-incorrecto')
            hayErrores = true
        } else {
            document.getElementById('grupo_serie').classList.remove('formulario_grupo-incorrecto')

        }*/

        if (recuperado.id_entidad_recupera.length < 1) {
            desc = desc + ', ENTIDAD '
            document.getElementById('grupo_entidad').classList.add('formulario_grupo-incorrecto')


            hayErrores = true
        } else {
            document.getElementById('grupo_entidad').classList.remove('formulario_grupo-incorrecto')

        }

        if (recuperado.id_municipio_rec.length < 1) {
            document.getElementById('grupo_municipio').classList.add('formulario_grupo-incorrecto')
            desc = desc + ', MUNICIPIO '


            hayErrores = true
        } else {
            document.getElementById('grupo_municipio').classList.remove('formulario_grupo-incorrecto')

        }

        /*if (recuperado.placa.length < 1) {
            document.getElementById('grupo_placa').classList.add('formulario_grupo-incorrecto')
            desc = desc + ', PLACA '


            hayErrores = true
        } else {
            document.getElementById('grupo_placa').classList.remove('formulario_grupo-incorrecto')

        }*/

        if (recuperado.calle_rec.length < 1) {
            desc = desc + ', CALLE '
            document.getElementById('grupo_calle').classList.add('formulario_grupo-incorrecto')

            hayErrores = true
        } else {
            document.getElementById('grupo_calle').classList.remove('formulario_grupo-incorrecto')

        }

        if (recuperado.numext_rec.length < 1) {
            desc = desc + ', NÚMERO EXTERIOR '
            document.getElementById('grupo_numext').classList.add('formulario_grupo-incorrecto')


            hayErrores = true
        } else {
            document.getElementById('grupo_numext').classList.remove('formulario_grupo-incorrecto')

        }

        if (recuperado.colonia_rec.length < 1) {
            desc = desc + ', COLONIA '
            document.getElementById('grupo_colonia').classList.add('formulario_grupo-incorrecto')


            hayErrores = true
        } else {
            document.getElementById('grupo_colonia').classList.remove('formulario_grupo-incorrecto')

        }

        if (recuperado.cp_rec.length < 1) {
            desc = desc + ', CÓDIGO POSTAL '
            document.getElementById('grupo_cp').classList.add('formulario_grupo-incorrecto')


            hayErrores = true
        } else {
            document.getElementById('grupo_cp').classList.remove('formulario_grupo-incorrecto')

        }

        /*if (recuperado.id_color.length < 1) {
            desc = desc + ', COLOR DEL AUTOMÓVIL '
            document.getElementById('grupo_color').classList.add('formulario_grupo-incorrecto')


            hayErrores = true
        } else {
            document.getElementById('grupo_color').classList.remove('formulario_grupo-incorrecto')

        }*/

        if (recuperado.fecha_rec.length < 1) {
            desc = desc + ', FECHA '
            document.getElementById('grupo_fecha').classList.add('formulario_grupo-incorrecto')


            hayErrores = true
        } else {
            document.getElementById('grupo_fecha').classList.remove('formulario_grupo-incorrecto')

        }

        if (recuperado.hora_rec.length < 1) {
            desc = desc + ', HORA '
            document.getElementById('grupo_hora').classList.add('formulario_grupo-incorrecto')


            hayErrores = true
        } else {
            document.getElementById('grupo_hora').classList.remove('formulario_grupo-incorrecto')

        }

        if (recuperado.serie.includes("  ") || recuperado.serie.startsWith(" ") || recuperado.serie.endsWith(" ")) {
            desc2 = desc2 + ', El campo SERIE no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_serie').classList.add('formulario_grupo-incorrecto')
            flag = false


            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_serie').classList.remove('formulario_grupo-incorrecto')

        }

        if (recuperado.id_entidad_recupera.includes("  ") || recuperado.id_entidad_recupera.startsWith(" ") || recuperado.id_entidad_recupera.endsWith(" ")) {
            desc2 = desc2 + ', El campo ENTIDAD no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_entidad').classList.add('formulario_grupo-incorrecto')
            flag = false


            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_entidad').classList.remove('formulario_grupo-incorrecto')

        }

        if (recuperado.id_municipio_rec.includes("  ") || recuperado.id_municipio_rec.startsWith(" ") || recuperado.id_municipio_rec.endsWith(" ")) {
            desc2 = desc2 + ', El campo MUINICIPIO no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_municipio').classList.add('formulario_grupo-incorrecto')
            flag = false


            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_municipio').classList.remove('formulario_grupo-incorrecto')

        }

        if (recuperado.colonia_rec.includes("  ") || recuperado.colonia_rec.startsWith(" ") || recuperado.colonia_rec.endsWith(" ")) {
            desc2 = desc2 + ', El campo COLONIA no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_colonia').classList.add('formulario_grupo-incorrecto')
            flag = false


            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_colonia').classList.remove('formulario_grupo-incorrecto')

        }
        if (recuperado.placa.includes("  ") || recuperado.placa.startsWith(" ") || recuperado.placa.endsWith(" ")) {
            desc2 = desc2 + ', El campo PLACA no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_placa').classList.add('formulario_grupo-incorrecto')
            flag = false


            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_placa').classList.remove('formulario_grupo-incorrecto')

        }

        if (recuperado.calle_rec.includes("  ") || recuperado.calle_rec.startsWith(" ") || recuperado.calle_rec.endsWith(" ")) {
            desc2 = desc2 + ', El campo CALLE no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_calle').classList.add('formulario_grupo-incorrecto')
            flag = false


            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_calle').classList.remove('formulario_grupo-incorrecto')
        }

        if (recuperado.numext_rec.includes("  ") || recuperado.numext_rec.startsWith(" ") || recuperado.numext_rec.endsWith(" ")) {
            desc2 = desc2 + ', El campo NUMERO EXTERIOR no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_numext').classList.add('formulario_grupo-incorrecto')
            flag = false

            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_numext').classList.remove('formulario_grupo-incorrecto')

        }

        if (recuperado.cp_rec.includes("  ") || recuperado.cp_rec.startsWith(" ") || recuperado.cp_rec.endsWith(" ")) {
            desc2 = desc2 + ', El campo CODIGO POSTAL no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_cp').classList.add('formulario_grupo-incorrecto')
            flag = false


            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_cp').classList.remove('formulario_grupo-incorrecto')

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
            document.getElementById('grupo_calle').classList.remove('formulario_grupo-incorrecto')
            document.getElementById('grupo_entidad').classList.remove('formulario_grupo-incorrecto')
            document.getElementById('grupo_municipio').classList.remove('formulario_grupo-incorrecto')
            document.getElementById('grupo_numext').classList.remove('formulario_grupo-incorrecto')
            document.getElementById('grupo_colonia').classList.remove('formulario_grupo-incorrecto')
            document.getElementById('grupo_color').classList.remove('formulario_grupo-incorrecto')
            document.getElementById('grupo_cp').classList.remove('formulario_grupo-incorrecto')
            document.getElementById('grupo_placa').classList.remove('formulario_grupo-incorrecto')
            document.getElementById('grupo_fecha').classList.remove('formulario_grupo-incorrecto')
            document.getElementById('grupo_hora').classList.remove('formulario_grupo-incorrecto')
            document.getElementById('grupo_serie').classList.remove('formulario_grupo-incorrecto')
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

    resultsDatos.map(datos => {
        serie = datos.SERIE
        placa = datos.PLACA
    })

    /*resultsColors.map(datosColor => {
        colores = datos.DESCRIPCION
    })*/



    return (
        <>
            {isLoggedIn ? (
                <>
                    <Navbar />
                    <div className='area-form'>
                        <div className='contenedor'>
                            <form class="row g-3 needs-validation" noValidate id='formulario'>
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
                                <center><h3> Datos del Vehículo Recuperado</h3></center>
                                <br />
                                {results5.map(ultimoId => {
                                    return (
                                        <input id='id_alterna' type="hidden" name="id_alterna" key={ultimoId.id} value={ultimoId.id + 1} onChange={handleChange} ></input>

                                    )
                                })}
                                <span><h5>1.-Datos de ubicación del vehiculo</h5></span>
                                <div class="formulario_grupo col-6" id='grupo_entidad'>
                                    <label className="form-label" class="formulario_label" for='id_entidad_recupera' >ENTIDAD:</label>
                                    <br />
                                    <div class="formulario_grupo-input">
                                        <select className="form-control" id="id_entidad_recupera" name="id_entidad_recupera" onChange={handleEntidadChange} onClick={handleChange} required>
                                            <option selected disabled value="">ENTIDAD QUE RECUPERÓ EL VEHICULO</option>
                                            {results2.map(entidades => {
                                                return (
                                                    <option name={entidades.ENTIDAD} key={entidades.ID_ENTIDAD} defaultValue={entidades.ENTIDAD} value={entidades.ID_ENTIDAD}>{entidades.ENTIDAD}</option>

                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div class="invalid-feedback">Porfavor seleccione una entidad.</div>
                                </div>
                                <div class="formulario_grupo col-6" id='grupo_municipio'>
                                    <label className="form-label" class="formulario_label" for='id_municipio_rec' >MUNICIPIO:</label>
                                    <br />
                                    <div class="formulario_grupo-input">
                                        <select className='form-control' id='id_municipio_rec' name='id_municipio_rec' onChange={handleChange} required>
                                            <option value="">MUNICIPIO QUE RECUPERÓ EL VEHICULO</option>
                                            {municipios.map((municipio) => (
                                                <option key={municipio.ID_MUNICIPIO} value={municipio.ID_MUNICIPIO}>
                                                    {municipio.MUNICIPIO}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="invalid-feedback">Porfavor seleccione un municipio.</div>
                                </div>
                                <div class="formulario_grupo col-md-3" id='grupo_calle'>
                                    <label className="form-label" class="formulario_label" for='calle_rec'> CALLE:</label>
                                    <div class="formulario_grupo-input">
                                        <input type="text" className="form-control" id="calle_rec" name="calle_rec"  onChange={handleChange} required />
                                    </div>
                                    <div class="invalid-feedback">Porfavor rellene el campo.</div>
                                </div>
                                <div class="formulario_grupo col-md-3" id='grupo_numext'>
                                    <label className="form-label" class="formulario_label" for='numext_rec' > NÚMERO EXTERIOR:</label>
                                    <div class="formulario_grupo-input">
                                        <input type="text" className="form-control" id="numext_rec" name="numext_rec" onKeyDown={filterInteger} onChange={handleChange} required />
                                    </div>

                                    <div class="invalid-feedback">Porfavor rellene el campo.</div>
                                </div>
                                <div class="formulario_grupo col-md-3" id='grupo_colonia'>
                                    <label className="form-label" class="formulario_label" for='colonia_rec' > COLONIA:</label>
                                    <div class="formulario_grupo-input">
                                        <input type="text" className="form-control" id="colonia_rec" name="colonia_rec"  onChange={handleChange} required />
                                    </div>
                                    <div class="invalid-feedback">Porfavor rellene el campo.</div>
                                </div>

                                <div class="formulario_grupo col-3" id='grupo_cp'>
                                    <label className="form-label" class="formulario_label" for='cp_rec' > CÓDIGO POSTAL:</label>
                                    <div class="formulario_grupo-input">
                                        <input type="text" className="form-control" id="cp_rec" name="cp_rec" onKeyDown={filterInteger} onChange={handleChange} required />
                                    </div>
                                    <div class="invalid-feedback">Porfavor rellene el campo.</div>
                                </div>
                                <span><h5>2.-Datos del vehiculo</h5></span>
                                <div class="formulario_grupo col-3" id='grupo_serie'>
                                    <label className="form-label" class="formulario_label" for='serie' >SERIE:</label>
                                    <div class="formulario_grupo-input">
                                        <input type="text" className="form-control" id="serie" name="serie" onChange={handleChange} onClick={handleChange} value={serie} required />
                                    </div>
                                    <div class="invalid-feedback">Porfavor rellene el campo.</div>
                                </div>
                                <div class="formulario_grupo col-md-3" id='grupo_placa'>
                                    <label className="form-label" class="formulario_label" for='placa' > PLACA:</label>
                                    <div class="formulario_grupo-input">
                                        <input type="text" className="form-control" id="placa" name="placa" ng-trim="false" onChange={handleChange} onClick={handleChange} value={placa} required />
                                    </div>
                                    <div class="invalid-feedback">Porfavor rellene el campo.</div>
                                </div>
                               
                                <div class="formulario_grupo col-md-6" id='grupo_color'>
                                    <label className="form-label" class="formulario_label" >COLOR DEL AUTOMÓVIL: </label>
                                    <br />
                                    <div class="formulario_grupo-input">
                                        <input className="form-control" id='id_color' name='id_color' type='hidden' onClick={handleChange} onChange={handleChange} value={idDatosColor} />
                                        {/*<select className="form-control" id="id_color" name="id_color" onChange={handleChange} onClick={handleChange} required>
                                            <option selected disabled >
                                                {datosColor}
                                            </option>
                                            {results.map(llenado => {
                                                return (

                                                    <option onClick={handleChange} name={llenado.ID_COLOR} key={llenado.ID_COLOR} value={llenado.ID_COLOR}>{llenado.DESCRIPCION}</option>
                                                )
                                            })}
                                        </select>*/}


                                        <input className="form-control" value={datosColor} />

                                    </div>
                                    <div class="invalid-feedback">Porfavor seleccione un color.</div>
                                </div>
                                <span><h5>3.-Datos de fecha de recuperación del vehiculo</h5></span>
                                <div class="formulario_grupo col-md-6" id='grupo_fecha'>
                                    <label className="form-label" class="formulario_label" > FECHA:</label>
                                    { }
                                    <div class="formulario_grupo-input">
                                        {/* VALIDACIÓN La fecha de recuperación no podrá ser menor a la fecha de robo del vehículo. */}
                                        {results7.map(fechaRobado => {
                                            dateRobo = new Date(fechaRobado.FECHA_ROBO)
                                            //console.log(dateRobo)
                                            let monthRobo = dateRobo.getMonth() + 1
                                            if (monthRobo > 0 && monthRobo < 10) {
                                                monthRobo = "0" + monthRobo
                                            }
                                            let dayRobo = dateRobo.getDate()
                                            if (dayRobo > 0 && dayRobo < 10) {
                                                //console.log("day ", dayRobo)
                                                dayRobo = "0" + dayRobo
                                            }
                                            newDateRobo = dateRobo.getFullYear() + "-" + monthRobo + "-" + dayRobo
                                            //console.log("FECHA ROBO ", newDateRobo)
                                            return (
                                                <>
                                                    <input type="date" max={today} min={newDateRobo} className="form-control" id="fecha_rec" name="fecha_rec" onChange={handleChange} required />
                                                </>
                                            )
                                        })}

                                    </div>
                                    <div class="invalid-feedback">Porfavor rellene el campo.</div>
                                </div>
                                <div class="formulario_grupo col-md-6" id='grupo_hora'>
                                    <label className="form-label" class="formulario_label" > HORA:</label>
                                    <div class="formulario_grupo-input">
                                        <input type="time" className="form-control" id="hora_rec" name="hora_rec" onChange={handleChange} required />
                                    </div>
                                    <div class="invalid-feedback">Porfavor rellene el campo.</div>
                                </div>
                                <div class="col-md-12">
                                    <Button variant="primary" type="submit" onClick={handleClick}>Enviar</Button>

                                    {/*<Button variant="primary" onClick={() => {
                                        setEditar(id)
                                    }}>Editar</Button>*/}

                                    {editar == id && (
                                        <div className='edit_form'>
                                            <h3 className='title'>Modificar</h3>
                                            <form>
                                                {results6.map(recuperadoBD => {



                                                    let date2 = new Date(recuperadoBD.FECHA_REC)
                                                    let newDate2 = date2.getFullYear() + "/" + date2.getMonth() + "/" + date2.getDay()

                                                    //console.log(newDate2)
                                                    return (
                                                        <>
                                                            <label>CALLE:</label>
                                                            <input type='text' name='calle_rec' className="form-control" defaultValue={recuperadoBD.CALLE_REC} onChange={handleChangeModificacionRecuperado}></input>
                                                            <label>NÚMERO EXTERIOR:</label>
                                                            <input type='text' name='numext_rec' className="form-control" defaultValue={recuperadoBD.NUMEXT_REC} onChange={handleChangeModificacionRecuperado}></input>
                                                            <label>COLONIA:</label>
                                                            <input type='text' name='colonia_rec' className="form-control" defaultValue={recuperadoBD.COLONIA_REC} onChange={handleChangeModificacionRecuperado}></input>
                                                            <label>CÓDIGO POSTAL:</label>
                                                            <input type='text' name='cp_rec' className="form-control" defaultValue={recuperadoBD.CP_REC} onChange={handleChangeModificacionRecuperado}></input>
                                                            <label>SERIE:</label>
                                                            <input type='text' name='serie' className="form-control" defaultValue={recuperadoBD.SERIE} onChange={handleChangeModificacionRecuperado}></input>
                                                            <label>PLACA:</label>
                                                            <input type='text' name='placa' className="form-control" defaultValue={recuperadoBD.PLACA} onChange={handleChangeModificacionRecuperado}></input>
                                                            <label>ENTIDAD:</label>
                                                            <select className="form-control" id="id_entidad_recupera" name="id_entidad_recupera" onChange={handleEntidadChange} onClick={handleChangeModificacionRecuperado} required>
                                                                <option selected disabled value="">{recuperadoBD.ID_ENTIDAD_RECUPERA}</option>
                                                                {results2.map(entidades => {
                                                                    return (
                                                                        <option name={entidades.ID_ENTIDAD} key={entidades.ID_ENTIDAD} value={entidades.ID_ENTIDAD}>{entidades.ENTIDAD}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            <label>MUNICIPIO:</label>
                                                            <select className='form-control' id='id_municipio_rec' name='id_municipio_rec' onChange={handleChangeModificacionRecuperado} required>
                                                                <option value="">{recuperadoBD.ID_ENTIDAD_RECUPERA}</option>
                                                                {municipios.map((municipio) => (
                                                                    <option key={municipio.ID_MUNICIPIO} value={municipio.ID_MUNICIPIO}>
                                                                        {municipio.MUNICIPIO}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <label>COLOR DEL VEHICULO:</label>
                                                            <select className="form-control" id="id_color" name="id_color" onChange={handleChangeModificacionRecuperado} required>
                                                                <option selected disabled value="">{recuperadoBD.ID_COLOR}</option>
                                                                {results.map(llenado => {
                                                                    return (
                                                                        <option name={llenado.ID_COLOR} key={llenado.ID_COLOR} value={llenado.ID_COLOR}>{llenado.DESCRIPCION}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            <label className="form-label" class="formulario_label" > FECHA:</label>
                                                            {newDate2}
                                                            <input type="date" max={today} min="2023-09-12" className="form-control" id="fecha_rec" name="fecha_rec" onChange={handleChangeModificacionRecuperado} required />

                                                            <label>HORA:</label>
                                                            <input type="time" defaultValue={recuperadoBD.HORA_REC} className="form-control" id="hora_rec" name="hora_rec" onChange={handleChangeModificacionRecuperado} required />
                                                        </>
                                                    )
                                                })}
                                                <button variant="primary" type="submit" onClick={e => handleClickModificarRecuperado(e, id)} className='editar'>Actualizar</button>
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
            ) : (
                <Login onLogin={handleLogin} />
            )
            }

        </>
    )
}
