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

export const Recuperado = () => {
    const { id } = useParams()
    const [editar, setEditar] = useState(0)

    const handleClickModificarRecuperado = async (e, id) => {
        e.preventDefault();
        formatoDia()
        formatoHora()
        setEditar(0)
        try {
            await axios.post(`http://localhost:8081/modificarRecuperado/${id}`, modificarRecuperado)
            console.log(setModificarRecuperado + "SetModificarRecuperado")

            alert("El nuevo registro ha sido guardado correctamente ")
            navigate("/")

        } catch (err) {
            console.log(err)
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

    const [recuperadoBD, setRecuperadoBD] = useState([])
    let results6 = []

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
            const { data } = await axios.get("http://localhost:8081/llenar");
            setLlenado(data)
        }
        catch (err) {
            console.log(err)
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

    const fuenteSelect = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/fuente")
            setFuente(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const ultimoIdSelect = async () => {
        //let id_alterna = req.params.id_alterna
        try {
            const { data } = await axios.get("http://localhost:8081/ultimoId")
            setUltimoId(data)
        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        LlenarSelect()
        entidadesSelect()
        fuenteSelect()
        ultimoIdSelect()
        fechaDeRobado()
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

    const formatoDia = () => {

        let fecha
        let today = new Date()
        // var n = today.toISOString();
        //console.log ("fecha",n)
        let mes = today.getMonth() + 1
        fecha = today.getFullYear() + "/" + mes + "/" + today.getDate()
        recuperado['fecha'] = fecha
        console.log("la fecha de la funcion es :", fecha)
    }

    const formatoHora = () => {
        let horaCompleta
        let today = new Date()
        let hora = today.getHours()
        let minutos = today.getMinutes()
        //let segundos = today.getSeconds()
        horaCompleta = hora + ':' + minutos
        recuperado['hora'] = horaCompleta
        console.log('La hora de registro es: ', horaCompleta)
    }

    const handleChange = (e) => {
        /*const value = e.target.value
        if(patterns.test(value)){
            
        } else {
            alert("DEBE CONTENER SOLO LETRAS")
        }*/
        formatoDia()
        formatoHora()
        //id_alterna = document.getElementById('id_alterna').value
        setRecuperado((prev) => ({ ...prev, id_alterna, [e.target.name]: e.target.value }))
        id_entidad = document.getElementById('id_entidad_recupera')
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

    console.log(recuperado)
    console.log(modificarRecuperado)

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(recuperado)

        try {
            console.log("Entre al try")
            let camposValidados = validarCampos()

            if (!camposValidados) return

            await axios.post("http://localhost:8081/crearRecuperado", recuperado);
            console.log(setRecuperado + "SetRecuperado")

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

        if (recuperado.serie.includes('o') || recuperado.serie.includes('i') || recuperado.serie.includes('ñ') || recuperado.serie.includes('q') || recuperado.serie.includes('O') || recuperado.serie.includes('I') || recuperado.serie.includes('Ñ') || recuperado.serie.includes('Q')) {
            desc3 = 'La serie no debe contener (o,i,ñ,q)'
            //document.querySelector("label[for='serie']").textContent = "SERIE: (INVALIDO)"
            document.getElementById('grupo_serie').classList.add('formulario_grupo-incorrecto')
            hayErrores = true
        } else {
            document.getElementById('grupo_serie').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='serie']").textContent = "SERIE:"
        }

        if (recuperado.serie.length < 1) {
            desc = desc + ', SERIE '
            //document.querySelector("label[for='serie']").textContent = "SERIE: (INVALIDO)"
            document.getElementById('grupo_serie').classList.add('formulario_grupo-incorrecto')
            hayErrores = true
        } else {
            document.getElementById('grupo_serie').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='serie']").textContent = "SERIE:"
        }

        if (recuperado.id_entidad_recupera.length < 1) {
            desc = desc + ', ENTIDAD '
            document.getElementById('grupo_entidad').classList.add('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            document.getElementById('grupo_entidad').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.id_municipio_rec.length < 1) {
            document.getElementById('grupo_municipio').classList.add('formulario_grupo-incorrecto')
            desc = desc + ', MUNICIPIO '
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            document.getElementById('grupo_municipio').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.placa.length < 1) {
            document.getElementById('grupo_placa').classList.add('formulario_grupo-incorrecto')
            desc = desc + ', PLACA '
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            document.getElementById('grupo_placa').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.calle_rec.length < 1) {
            desc = desc + ', CALLE '
            document.getElementById('grupo_calle').classList.add('formulario_grupo-incorrecto')

            hayErrores = true
        } else {
            document.getElementById('grupo_calle').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.numext_rec.length < 1) {
            desc = desc + ', NÚMERO EXTERIOR '
            document.getElementById('grupo_numext').classList.add('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            document.getElementById('grupo_numext').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.colonia_rec.length < 1) {
            desc = desc + ', COLONIA '
            document.getElementById('grupo_colonia').classList.add('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            document.getElementById('grupo_colonia').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.cp_rec.length < 1) {
            desc = desc + ', CÓDIGO POSTAL '
            document.getElementById('grupo_cp').classList.add('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            document.getElementById('grupo_cp').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.id_color.length < 1) {
            desc = desc + ', COLOR DEL AUTOMÓVIL '
            document.getElementById('grupo_color').classList.add('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            document.getElementById('grupo_color').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.fecha_rec.length < 1) {
            desc = desc + ', FECHA '
            document.getElementById('grupo_fecha').classList.add('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            document.getElementById('grupo_fecha').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.hora_rec.length < 1) {
            desc = desc + ', HORA '
            document.getElementById('grupo_hora').classList.add('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            document.getElementById('grupo_hora').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.serie.includes("  ") || recuperado.serie.startsWith(" ") || recuperado.serie.endsWith(" ")) {
            desc2 = desc2 + ', El campo SERIE no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_serie').classList.add('formulario_grupo-incorrecto')
            flag = false
            //document.querySelector("label[for='serie']").textContent = "SERIE: (INVALIDO)"

            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_serie').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='serie']").textContent = "SERIE:"
        }

        if (recuperado.id_entidad_recupera.includes("  ") || recuperado.id_entidad_recupera.startsWith(" ") || recuperado.id_entidad_recupera.endsWith(" ")) {
            desc2 = desc2 + ', El campo ENTIDAD no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_entidad').classList.add('formulario_grupo-incorrecto')
            flag = false
            //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_entidad').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.id_municipio_rec.includes("  ") || recuperado.id_municipio_rec.startsWith(" ") || recuperado.id_municipio_rec.endsWith(" ")) {
            desc2 = desc2 + ', El campo MUINICIPIO no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_municipio').classList.add('formulario_grupo-incorrecto')
            flag = false
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_municipio').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.colonia_rec.includes("  ") || recuperado.colonia_rec.startsWith(" ") || recuperado.colonia_rec.endsWith(" ")) {
            desc2 = desc2 + ', El campo COLONIA no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_colonia').classList.add('formulario_grupo-incorrecto')
            flag = false
            //document.querySelector("label[for='colonia_rec']").textContent = "COLONIA: (INVALIDO)"

            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_colonia').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='colonia_rec']").textContent = "COLONIA:"
        }
        if (recuperado.placa.includes("  ") || recuperado.placa.startsWith(" ") || recuperado.placa.endsWith(" ")) {
            desc2 = desc2 + ', El campo PLACA no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_placa').classList.add('formulario_grupo-incorrecto')
            flag = false
            //document.querySelector("label[for='placa']").textContent = "PLACA: (INVALIDO)"

            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_placa').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='placa']").textContent = "PLACA:"
        }

        if (recuperado.calle_rec.includes("  ") || recuperado.calle_rec.startsWith(" ") || recuperado.calle_rec.endsWith(" ")) {
            desc2 = desc2 + ', El campo CALLE no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_calle').classList.add('formulario_grupo-incorrecto')
            flag = false
            //document.querySelector("label[for='calle_rec']").textContent = "CALLE: (INVALIDO)"

            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_calle').classList.remove('formulario_grupo-incorrecto')

            //document.querySelector("label[for='calle_rec']").textContent = "CALLE:"
        }

        if (recuperado.numext_rec.includes("  ") || recuperado.numext_rec.startsWith(" ") || recuperado.numext_rec.endsWith(" ")) {
            desc2 = desc2 + ', El campo NUMERO EXTERIOR no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_numext').classList.add('formulario_grupo-incorrecto')
            flag = false
            //document.querySelector("label[for='numext_rec']").textContent = "NUMERO EXTERIOR: (INVALIDO)"

            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_numext').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='numext_rec']").textContent = "NUMERO EXTERIOR:"
        }

        if (recuperado.cp_rec.includes("  ") || recuperado.cp_rec.startsWith(" ") || recuperado.cp_rec.endsWith(" ")) {
            desc2 = desc2 + ', El campo CODIGO POSTAL no debe contener doble espacio ni empezar/terminar con espacio '
            document.getElementById('grupo_cp').classList.add('formulario_grupo-incorrecto')
            flag = false
            //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL: (INVALIDO)"

            hayErrores = true
        } else if (flag = false) {
            document.getElementById('grupo_cp').classList.remove('formulario_grupo-incorrecto')
            //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL:"
        }

        if (hayErrores) {
            setDescValidacion(desc)
            setDesc2Validacion(desc2)
            toast.error(<div>
                <p style={{ fontSize: "1rem" }}>Los campos son obligatorios</p>
                <p style={{ fontSize: "1rem" }}>{desc3}</p>
                <p style={{ fontSize: "1rem" }}>{desc2}</p>

            </div>)
            //handleShowModalValidacion()
            return false
        } else {
            toast.promise(loading, {
                error: "Se ha producido un error",
                success: "Se ha registrado exitosamente!",
                loading: "Cargando información..."
            })
            //toast.success("Se ha registrado exitosamente!")
            //handleShowModalSuccess()
            //document.getElementById('grupo_calle').classList.remove('formulario_grupo-incorrecto')
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

    return (
        <>
            <Navbar />
            <div className='area-form'>
                <div className='contenedor'>
                    <form class="row g-3 needs-validation" noValidate id='formulario'>
                        <center><h1> REGISTRO DE VEHICULOS RECUPERADOS</h1></center>
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
                                            <option name={entidades.ID_ENTIDAD} key={entidades.ID_ENTIDAD} value={entidades.ID_ENTIDAD}>{entidades.ENTIDAD}</option>
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
                                <input type="text" className="form-control" id="calle_rec" name="calle_rec" onKeyDown={Solo_Texto} onChange={handleChange} required />
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
                                <input type="text" className="form-control" id="colonia_rec" name="colonia_rec" onKeyDown={Solo_Texto} onChange={handleChange} required />
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
                                <input type="text" className="form-control" id="serie" name="serie" onChange={handleChange} required />
                            </div>
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <div class="formulario_grupo col-md-3" id='grupo_placa'>
                            <label className="form-label" class="formulario_label" for='placa' > PLACA:</label>
                            <div class="formulario_grupo-input">
                                <input type="text" className="form-control" id="placa" name="placa" ng-trim="false" onChange={handleChange} required />
                            </div>
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <div class="formulario_grupo col-md-6" id='grupo_color'>
                            <label className="form-label" class="formulario_label" >COLOR DEL AUTOMÓVIL: </label>
                            <br />
                            <div class="formulario_grupo-input">
                                <select className="form-control" id="id_color" name="id_color" onChange={handleChange} required>
                                    <option selected disabled value="">SELECCIONE UN COLOR</option>
                                    {results.map(llenado => {
                                        return (
                                            <option name={llenado.ID_COLOR} key={llenado.ID_COLOR} value={llenado.ID_COLOR}>{llenado.DESCRIPCION}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div class="invalid-feedback">Porfavor seleccione un color.</div>
                        </div>
                        <span><h5>4.-Datos de fecha de recuperación del vehiculo</h5></span>
                        <div class="formulario_grupo col-md-6" id='grupo_fecha'>
                            <label className="form-label" class="formulario_label" > FECHA:</label>
                            { }
                            <div class="formulario_grupo-input">
                                {/* VALIDACIÓN La fecha de recuperación no podrá ser menor a la fecha de robo del vehículo. */}
                                {results7.map(fechaRobado => {
                                    dateRobo = new Date(fechaRobado.FECHA_ROBO)
                                    console.log(dateRobo)
                                    let monthRobo = dateRobo.getMonth() + 1
                                    if (monthRobo > 0 && monthRobo < 10 ){
                                        monthRobo = "0" + monthRobo
                                    }
                                    let dayRobo = dateRobo.getDate()
                                    if(dayRobo > 0 && dayRobo < 10){
                                        console.log("day ", dayRobo)
                                        dayRobo = "0" + dayRobo
                                    }
                                    newDateRobo = dateRobo.getFullYear() + "-" + monthRobo + "-" + dayRobo
                                    console.log("FECHA ROBO ", newDateRobo)
                                    return(
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
                            <Link to="/" className="btn btn-info"> Inicio</Link>
                            <Button disabled variant="primary" onClick={() => {
                                setEditar(id)
                            }}>Editar</Button>

                            {editar == id && (
                                <div className='edit_form'>
                                    <h3 className='title'>Modificar</h3>
                                    <form>
                                        {results6.map(recuperadoBD => {



                                            let date2 = new Date(recuperadoBD.FECHA_REC)
                                            let newDate2 = date2.getFullYear() + "/" + date2.getMonth() + "/" + date2.getDay()

                                            console.log(newDate2)
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

                    //toastOptions={{style: {  }}}
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
