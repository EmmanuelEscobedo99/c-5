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

export const Recuperado = () => {

    let id_alterna = 0
    let id_entidad = 0

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
    }, [])

    results = llenado
    results2 = entidades
    results3 = municipios
    results4 = fuente
    results5 = ultimoId

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
        id_alterna = document.getElementById('id_alterna').value
        setRecuperado((prev) => ({ ...prev, id_alterna, [e.target.name]: e.target.value }))
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

        if (recuperado.serie.includes('o') || recuperado.serie.includes('i') || recuperado.serie.includes('ñ') || recuperado.serie.includes('q') || recuperado.serie.includes('O') || recuperado.serie.includes('I') || recuperado.serie.includes('Ñ') || recuperado.serie.includes('Q')) {
            desc2 = desc2 + ', La serie no debe contener (o,i,ñ,q) '
            //document.querySelector("label[for='serie']").textContent = "SERIE: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='serie']").textContent = "SERIE:"
        }

        if (recuperado.serie.length < 1) {
            desc = desc + ', SERIE '
            //document.querySelector("label[for='serie']").textContent = "SERIE: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='serie']").textContent = "SERIE:"
        }

        if (recuperado.id_entidad_recupera.length < 1) {
            desc = desc + ', ENTIDAD '
            //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.id_municipio_rec.length < 1) {
            desc = desc + ', MUNICIPIO '
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.placa.length < 1) {
            desc = desc + ', PLACA '
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.calle_rec.length < 1) {
            desc = desc + ', CALLE '
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.numext_rec.length < 1) {
            desc = desc + ', NÚMERO EXTERIOR '
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.colonia_rec.length < 1) {
            desc = desc + ', COLONIA '
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.cp_rec.length < 1) {
            desc = desc + ', CÓDIGO POSTAL '
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.id_color.length < 1) {
            desc = desc + ', COLOR DEL AUTOMÓVIL '
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.fecha_rec.length < 1) {
            desc = desc + ', FECHA '
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.hora_rec.length < 1) {
            desc = desc + ', HORA '
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.serie.includes("  ") || recuperado.serie.startsWith(" ") || recuperado.serie.endsWith(" ")) {
            desc2 = desc2 + ', el campo SERIE no debe contener doble espacio ni empezar/terminar con espacio '
            //document.querySelector("label[for='serie']").textContent = "SERIE: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='serie']").textContent = "SERIE:"
        }

        if (recuperado.id_entidad_recupera.includes("  ") || recuperado.id_entidad_recupera.startsWith(" ") || recuperado.id_entidad_recupera.endsWith(" ")) {
            desc2 = desc2 + ', el campo ENTIDAD no debe contener doble espacio ni empezar/terminar con espacio '
            //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.id_municipio_rec.includes("  ") || recuperado.id_municipio_rec.startsWith(" ") || recuperado.id_municipio_rec.endsWith(" ")) {
            desc2 = desc2 + ', el campo MUNICIPIO no debe contener doble espacio ni empezar/terminar con espacio, '
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.colonia_rec.includes("  ") || recuperado.colonia_rec.startsWith(" ") || recuperado.colonia_rec.endsWith(" ")) {
            desc2 = desc2 + ', el campo COLONIA no debe contener doble espacio ni empezar/terminar con espacio '
            //document.querySelector("label[for='colonia_rec']").textContent = "COLONIA: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='colonia_rec']").textContent = "COLONIA:"
        }
        if (recuperado.placa.includes("  ") || recuperado.placa.startsWith(" ") || recuperado.placa.endsWith(" ")) {
            desc2 = desc2 + ', el campo PLACA no debe contener doble espacio ni empezar/terminar con espacio '
            //document.querySelector("label[for='placa']").textContent = "PLACA: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='placa']").textContent = "PLACA:"
        }

        if (recuperado.calle_rec.includes("  ") || recuperado.calle_rec.startsWith(" ") || recuperado.calle_rec.endsWith(" ")) {
            desc2 = desc2 + ', el campo CALLE no debe contener doble espacio ni empezar/terminar con espacio '
            //document.querySelector("label[for='calle_rec']").textContent = "CALLE: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='calle_rec']").textContent = "CALLE:"
        }

        if (recuperado.numext_rec.includes("  ") || recuperado.numext_rec.startsWith(" ") || recuperado.numext_rec.endsWith(" ")) {
            desc2 = desc2 + ', el campo NUMERO EXTERIOR no debe contener doble espacio ni empezar/terminar con espacio '
            //document.querySelector("label[for='numext_rec']").textContent = "NUMERO EXTERIOR: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='numext_rec']").textContent = "NUMERO EXTERIOR:"
        }

        if (recuperado.cp_rec.includes("  ") || recuperado.cp_rec.startsWith(" ") || recuperado.cp_rec.endsWith(" ")) {
            desc2 = desc2 + ', el campo CÓDIGO POSTAL no debe contener doble espacio ni empezar/terminar con espacio '
            //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL:"
        }

        if (hayErrores) {
            setDescValidacion(desc)
            setDesc2Validacion(desc2)
            toast.error(<div>
                <h3 style={{ fontSize: "1rem" }}>Los campos:</h3>
                <ul>
                    <li style={{ fontSize: "1rem" }}>{desc}</li>
                </ul>
                <h3 style={{ fontSize: "1rem" }}>Son obligatorios</h3>
                <ul>
                    <li style={{ fontSize: "1rem" }}>{desc2}</li>
                </ul>
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
            return true
        }

    }

    return (
        <>
            <Navbar />
            <div className='area-form'>
                <div className='contenedor'>
                    <form class="row g-3 was-validated">
                        <center><h1> REGISTRO DE VEHICULOS RECUPERADOS</h1></center>
                        <br />
                        {results5.map(ultimoId => {
                            return (
                                <input id='id_alterna' type="hidden" name="id_alterna" key={ultimoId.id} value={ultimoId.id + 1} onChange={handleChange} ></input>

                            )
                        })}

                        <div class="col-4">
                            <label className="form-label" for='id_entidad_recupera' >ENTIDAD:</label>
                            <br />
                            <select className="form-control" id="id_entidad_recupera" name="id_entidad_recupera" onChange={handleEntidadChange} onClick={handleChange} required>
                                <option selected disabled value="">ENTIDAD QUE RECUPERÓ EL VEHICULO</option>
                                {results2.map(entidades => {
                                    return (
                                        <option name={entidades.ID_ENTIDAD} key={entidades.ID_ENTIDAD} value={entidades.ID_ENTIDAD}>{entidades.ENTIDAD}</option>
                                    )
                                })}
                            </select>
                            <div class="invalid-feedback">Porfavor seleccione una entidad.</div>
                        </div>
                        <div class="col-4">
                            <label className="form-label" for='id_municipio_rec' >MUNICIPIO:</label>
                            <br />
                            <select className='form-control' id='id_municipio_rec' name='id_municipio_rec' onChange={handleChange} required>
                                <option value="">MUNICIPIO QUE RECUPERÓ EL VEHICULO</option>
                                {municipios.map((municipio) => (
                                    <option key={municipio.ID_MUNICIPIO} value={municipio.ID_MUNICIPIO}>
                                        {municipio.MUNICIPIO}
                                    </option>
                                ))}
                            </select>
                            <div class="invalid-feedback">Porfavor seleccione un municipio.</div>
                        </div>
                        <div class="col-md-2">
                            <label className="form-label" for='placa' > PLACA:</label>
                            <input type="text" className="form-control" id="placa" name="placa" ng-trim="false" onChange={handleChange} required />
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <div class="col-3">
                            <label className="form-label" class="col-sm-10" for='serie' >SERIE:</label>
                            <input type="text" className="form-control" id="serie" name="serie" onChange={handleChange} required />
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>

                        <div class="col-md-3">
                            <label className="form-label" for='calle_rec'> CALLE:</label>
                            <input type="text" className="form-control" id="calle_rec" name="calle_rec" onKeyDown={Solo_Texto} onChange={handleChange} required />
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <div class="col-md-2">
                            <label className="form-label" for='numext_rec' > NÚMERO EXTERIOR:</label>
                            <input type="text" className="form-control" id="numext_rec" name="numext_rec" onKeyDown={filterInteger} onChange={handleChange} required />
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <div class="col-md-3">
                            <label className="form-label" for='colonia_rec' > COLONIA:</label>
                            <input type="text" className="form-control" id="colonia_rec" name="colonia_rec" onKeyDown={Solo_Texto} onChange={handleChange} required />
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>

                        <div class="col-2">
                            <label className="form-label" for='cp_rec' > CÓDIGO POSTAL:</label>
                            <input type="text" className="form-control" id="cp_rec" name="cp_rec" onKeyDown={filterInteger} onChange={handleChange} required />
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <div class="col-md-4">
                            <label className="form-label" >COLOR DEL AUTOMÓVIL: </label>
                            <br />
                            <select className="form-control" id="id_color" name="id_color" onChange={handleChange} required>
                                <option selected disabled value="">SELECCIONE UN COLOR</option>
                                {results.map(llenado => {
                                    return (
                                        <option name={llenado.ID_COLOR} key={llenado.ID_COLOR} value={llenado.ID_COLOR}>{llenado.DESCRIPCION}</option>
                                    )
                                })}
                            </select>
                            <div class="invalid-feedback">Porfavor seleccione un color.</div>
                        </div>
                        <div class="col-md-3">
                            <label className="form-label" > FECHA:</label>
                            { }
                            <input type="date" max={today} min={minDate} className="form-control" id="fecha_rec" name="fecha_rec" onChange={handleChange} required />
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <div class="col-md-3">
                            <label className="form-label" > HORA:</label>
                            <input type="time" className="form-control" id="hora_rec" name="hora_rec" onChange={handleChange} required />
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <div class="col-md-4">
                            <Button variant="primary" type="submit" onClick={handleClick}>Enviar</Button>
                            <Link to="/" className="btn btn-info"> Inicio</Link>
                        </div>
                    </form>
                    <Toaster
                        position='top-center'
                        theme='dark'
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
