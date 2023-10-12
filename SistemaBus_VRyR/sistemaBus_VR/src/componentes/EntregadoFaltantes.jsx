import { React, useState, useEffect } from 'react'
import Navbar from './Navbar'
import "../archivosCss/formulario.css"
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import ListaArchivos from './ListaArchivos'
import { Toaster, toast } from 'sonner'
import { BiCheck } from 'react-icons/bi'
import { Editar } from './Editar'
import Login from "./Login"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { Cargando } from './Cargando'

export const EntregadoFaltantes = () => {
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))
    const [userData, setUserData] = useState([])
    const [cargando, setCargando] = useState(true)
    let result = []

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
                        })
                        setUserData(res.data)
                    } catch (err) {

                    }
                }
            }
            traerUsuario()
        }

    }, [isLoggedIn]);

    const handleLogin = () => {
        setIsLoggedIn(true)
    }

    const { id } = useParams();
    const { inspeccion } = useParams();
    const { entidad } = useParams();
    const { municipio } = useParams();

    let nombre_bitacora, id_alterna, colorNombre, entidadNombre, municipioNombre
    let apellidos_bitacora, correoIns_bitacora, username_bitacora, municipio_bitacora, idUser_bitacora

    const [entregadoBD, setEntregadoBD] = useState([])
    let results6 = []

    const [nombreInspeccion, setNombreInspeccion] = useState([])
    let resultsInspeccion = []

    const [enti, setEnti] = useState([])
    let resultsEnti = []

    const [muni, setMuni] = useState([])
    let resultsMuni = []

    const [isLoading, setIsLoading] = useState(true);

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

    const EntregadoDB = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8081/entregado/` + id)
            setEntregadoBD(data)
            //const inputAlterna = document.getElementById("alternaRec")
            //inputAlterna.click()
            //const inputEntidad = document.getElementById("entidadRec")
            //inputEntidad.click()
        }
        catch (err) {

        }
    }

    const [datos, setDatos] = useState([]);
    let resultsDatos = []

    const [llenado, setLlenado] = useState([])
    let results = []

    const [entidades, setEntidades] = useState([])
    let results2 = []

    const [municipios, setMunicipios] = useState([])
    let results3 = []

    const [entidadSeleccionada, setEntidadSeleccionada] = useState('')

    const [pantallaCarga, setPantallaCarga] = useState(false)

    const LlenarSelect = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/llenar/" + id);
            //if(data = 1) data = "si"
            //if(data = 2) data = "no"
            setLlenado(data)
            setNombreInspeccion(data)
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
            
        }
    }

    const cargarMunicipios = async (entidadId) => {
        try {
            const response = await axios.get(`http://localhost:8081/municipios/${entidadId}`);
            setMunicipios(response.data)
        } catch (error) {
           
        }
    }

    const Entidades = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/entidad/" + entidad);
            setEnti(data)
        } catch (err) {

        }
    }

    const Municipios = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/municipio/" + municipio);
            setMuni(data)
        } catch (err) {

        }
    }

    //console.log(recuperado)
    const formatoDia = () => {

        let fecha
        let today = new Date()
        let mes = today.getMonth() + 1
        fecha = today.getFullYear() + "/" + mes + "/" + today.getDate()
        entregado['fecha'] = fecha
    }

    const formatoHora = () => {
        let horaCompleta
        let today = new Date()
        let hora = today.getHours()
        let minutos = today.getMinutes()
        horaCompleta = hora + ':' + minutos
        entregado['hora'] = horaCompleta
    }


    /*useEffect(() => {
        axios.get("http://localhost:8081/entregadoRevision/" + id + "/" + inspeccion + "/" + entidad + "/" + municipio)
            .then(res => {
                console.log("Datos encontrados RECFALTANTES")
                console.log(res.data)
                const datos = res.data
                setDatos(res.data[0])
                formatoDia()
                formatoHora()
                if (datos && datos.FECHA) {
                    const fechaBaseDatos = datos.FECHA;
                    let fechaFormateada = '';
          
                    // Formatear la fecha
                    const fechaSplit = fechaBaseDatos.split('T')[0].split('-');
                    fechaFormateada = `${fechaSplit[0]}-${fechaSplit[1]}-${fechaSplit[2]}`;
          
                    // Establecer el estado con la fecha formateada
                    setFecha(fechaFormateada);
                    console.log(fecha, "FECHA FORMATEADA ENTREGA: ")
                  }
                setEntregado(res.data)
                console.log(entregado)
            })
            .catch(err => console.log(err))

    }, [id]);*/

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/entregadoRevision/${id}/${inspeccion}/${entidad}/${municipio}`);
                // Verifica si se obtuvieron datos antes de actualizar el estado
                if (response.data && response.data.length > 0) {
                    const firstDataItem = response.data[0];
                    setDatos(firstDataItem);

                    // Llama a las funciones de formato (asumiendo que están definidas en otro lugar)
                    formatoDia();
                    formatoHora();

                    if (firstDataItem && firstDataItem.FECHA) {
                        const fechaBaseDatos = firstDataItem.FECHA;
                        let fechaFormateada = '';

                        // Formatear la fecha
                        const fechaSplit = fechaBaseDatos.split('T')[0].split('-');
                        fechaFormateada = `${fechaSplit[0]}-${fechaSplit[1]}-${fechaSplit[2]}`;

                        // Establecer el estado con la fecha formateada
                        setFecha(fechaFormateada);
                    }

                    // Establece el estado entregado con los datos completos (si es necesario)
                    setEntregado(response.data);
                } else {
                   
                }
            } catch (error) {
                
            }
        };

        fetchData();
    }, [id, inspeccion, entidad, municipio]);


    useEffect(() => {
        LlenarSelect()
        entidadesSelect()
        // Obtén una referencia al input
        const inputs = document.querySelectorAll('.form-control-plaintext')
        // Dispara el evento 'click' en el input después de un pequeño retraso (por ejemplo, 1 segundo)

        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i]
            setTimeout(() => {
                input.click()
            }, 1000)

            setTimeout(() => {
                LlenarSelect()
                Entidades()
                Municipios()
                setPantallaCarga(true)
            }, 2000)
        }

        EntregadoDB()

    }, [])

    useEffect(() => {
        setTimeout(() => {
            setCargando(false)
        }, 2000)
    }, [])


    results = llenado
    results2 = entidades
    results3 = municipios
    resultsDatos = datos

    if (datos.INSPECCION = 1) {
        datos.INSPECCION = "INSPECCION REALIZADA AL VEHICULO ENTREGADO"
    } else if (datos.INSPECCION = 0) {
        datos.INSPECCION = "NO REALIZADA"
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            //let camposValidados = validarCampos()
            navigate("/Cargando")
            //if (!camposValidados) return
            await axios.post("http://localhost:8081/crearEntregadoVerificado", entregado);

        } catch (err) {
    
        }
    }

    let fechaFormat, newFechaFormat, getFecha
    getFecha = datos.FECHA
    fechaFormat = new Date(getFecha)
    let monthFecha = fechaFormat.getMonth() + 1
    if (monthFecha > 0 && monthFecha < 10) {
        monthFecha = "0" + monthFecha
    }
    let dayFecha = fechaFormat.getDate()
    if (dayFecha > 0 && dayFecha < 10) {
        console.log("day ", dayFecha)
        dayFecha = "0" + dayFecha
    }
    newFechaFormat = fechaFormat.getFullYear() + "-" + monthFecha + "-" + dayFecha

    const [fecha, setFecha] = useState("")

    const handleChange = (e) => {
        formatoDia()
        formatoHora()
        const { name, value } = e.target
        setEntregado({ ...entregado, nombre_bitacora, apellidos_bitacora, correoIns_bitacora, username_bitacora, municipio_bitacora, idUser_bitacora, [name]: value })

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

    const handleInputChange = (e) => {
        handleEntidadChange(e)
        handleChange(e)
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

    resultsInspeccion = nombreInspeccion
    resultsInspeccion.map(nombreInspeccion => {
        nombreInspeccion = nombreInspeccion.INSPECCION
    })

    resultsEnti = enti
    resultsEnti.map(enti => {
        entidadNombre = enti.ENTIDAD
    })

    resultsMuni = muni
    resultsMuni.map(muni => {
        municipioNombre = muni.MUNICIPIO
    })


    results6 = entregadoBD
    
    return (
        <>
            {isLoggedIn ? (
                <>
                    <Navbar></Navbar>
                    <div className="area_form">
                        {result.map((userData) => {
                            return (
                                <>
                                    <input id='nombre_bitacora' type="hidden" name="nombre_bitacora" value={nombre_bitacora} onClick={handleChange} onChange={handleChange} ></input>
                                    <input id='apellidos_bitacora' type="hidden" name="apellidos_bitacora" value={apellidos_bitacora} onClick={handleChange} onChange={handleChange} ></input>
                                    <input id='correoIns_bitacora' type="hidden" name="correoIns_bitacora" value={correoIns_bitacora} onClick={handleChange} onChange={handleChange} ></input>
                                    <input id='username_bitacora' type="hidden" name="username_bitacora" value={username_bitacora} onClick={handleChange} onChange={handleChange} ></input>
                                    <input id='municipio_bitacora' type="hidden" name="municipio_bitacora" value={municipio_bitacora} onClick={handleChange} onChange={handleChange} ></input>
                                    <input id='idUser_bitacora' type="hidden" name="idUser_bitacora" value={idUser_bitacora} onClick={handleChange} onChange={handleChange} ></input>
                                </>
                            )
                        })}
                        <h3>Faltantes de verificar</h3>
                        <h4 style={{ color: 'green' }}>NOTA: Recuerda que puedes editar los campos al hacer click sobre la información.</h4>
                        <div className="contenedor">

                            <form className="row g-6">

                                <input type="hidden" className="form-control-plaintext" id="alternaEntrega" name='alternaEntrega' onClick={handleChange} onChange={(e) => setEntregado({ ...entregado, alternaRec: e.target.value })} defaultValue={datos.ID_ALTERNA} />

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">ENTIDAD:</label></strong>
                                    <input type="hidden" className="form-control-plaintext" id="id_entidad_entrega" name='id_entidad_entrega' onClick={handleChange} onChange={handleChange} defaultValue={datos.ENTIDAD} />
                                    <select className="form-control-plaintext" id="id_entidad_entrega" name='id_entidad_entrega' onChange={handleInputChange} required>
                                        <option value="">{entidadNombre}</option>
                                        {results2.map(entidades => {
                                            return (
                                                <option onClick={handleChange} name={entidades.ENTIDAD} key={entidades.ID_ENTIDAD} value={entidades.ID_ENTIDAD}>{entidades.ENTIDAD}</option>

                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">MUNICIPIO:</label></strong>
                                    <input type="hidden" className="form-control-plaintext" id="id_municipio_entrega" name='id_municipio_entrega' onClick={handleChange} onChange={handleChange} defaultValue={datos.MUNICIPIO} />
                                    <select className="form-control-plaintext" id="id_municipio_entrega" name='id_municipio_entrega' onChange={handleChange} required>
                                        <option value="">{municipioNombre}</option>
                                        {municipios.map((municipio) => (
                                            <option onClick={handleChange} key={municipio.ID_MUNICIPIO} value={municipio.ID_MUNICIPIO}>
                                                {municipio.MUNICIPIO}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">CALLE:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="calle_entrega" name='calle_entrega' onClick={handleChange} onChange={handleChange} defaultValue={datos.CALLE} />
                                </div>
                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">COLONIA:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="colonia_entrega" name='colonia_entrega' onClick={handleChange} onChange={handleChange} defaultValue={datos.COLONIA} />
                                </div>
                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">CÓDIGO POSTAL:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="cp_entrega" name='cp_entrega' onClick={handleChange} onChange={handleChange} defaultValue={datos.CP_ENTREGA} />
                                </div>
                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">SERIE:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="serie" name='serie' onClick={handleChange} onChange={handleChange} defaultValue={datos.SERIE} />
                                </div>
                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">MOTOR:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="motor" name='motor' onClick={handleChange} onChange={handleChange} defaultValue={datos.MOTOR} />
                                </div>
                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">INSPECCIÓN:</label></strong>
                                    <input type="hidden" className="form-control-plaintext" id="inpeccion" name='inspeccion' onClick={handleChange} onChange={handleChange} defaultValue={datos.INSPECCION} />
                                    <select className='form-control-plaintext' id='inspeccion' name='inspeccion' onChange={handleChange} onClick={handleChange} required>
                                        <option selected disabled value="1">{datos.INSPECCION}</option>
                                        <option value='1'>INSPECCIÓN REALIZADA AL VEHICULO ENTREGADO</option>
                                        <option value='0'>NO REALIZADA</option>
                                    </select>
                                </div>
                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">NÚMERO DE FACTURA:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="factura_vehiculo" name='factura_vehiculo' onClick={handleChange} onChange={handleChange} defaultValue={datos.NUM_FACTURA} />
                                </div>
                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">FECHA:</label></strong>
                                    <input type="date" className="form-control-plaintext" id="fecha_entrega" name='fecha_entrega' onClick={handleChange} onChange={handleChange} value={fecha} />
                                </div>
                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">HORA:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="hora_entrega" name='hora_entrega' onClick={handleChange} onChange={handleChange} defaultValue={datos.HORA} />
                                </div>
                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">NOMBRE DEL PROPIETARIO:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="nombre_entrega" name='nombre_entrega' onClick={handleChange} onChange={handleChange} defaultValue={datos.NOM_PROPIETARIO} />
                                </div>
                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">APELLIDO DEL PROPIETARIO:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="apellido_entrega" name='apellido_entrega' onClick={handleChange} onChange={handleChange} defaultValue={datos.AP_PROPIETARIO} />
                                </div>
                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">COMPROBANTE DE DOMICILIO:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="comprob_domic_prop" name='comprob_domic_prop' onClick={handleChange} onChange={handleChange} defaultValue={datos.COMPR_DOMIC} />
                                </div>
                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">RECIBE:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="recibe" name='persona_recibe' onClick={handleChange} onChange={handleChange} defaultValue={datos.RECIBE} />
                                </div>

                            </form>
                            { /* <Button variant="primary" type="submit" onClick={handleClick}></Button>  */}
                            <Link to="/TablaEntregado" className="btn  btn-info " onClick={() => setIsLoggedIn(false)}> INICIO</Link>
                            {/*<Link className="btn  btn-info" to={`/recuperado/${id}`}>EDITAR</Link>*/}
                            <Link to="/TablaEntregado" className='btn btn-info' variant="primary" type="submit" onClick={handleClick}>VERIFICAR</Link>
                        </div>
                    </div>
                </>
            ) : (
                <Login onLogin={handleLogin} />
            )
            }

        </>
    )
}

/*{
    cargando ? (
        <>
            <h3>CARGANDO...</h3>
            <img src='https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif'></img>
        </>
    ) : (

                    )
}*/