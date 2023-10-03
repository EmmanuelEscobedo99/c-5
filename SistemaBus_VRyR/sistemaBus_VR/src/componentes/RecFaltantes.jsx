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

export const RecFaltantes = () => {

    const navigate = useNavigate()

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

    const handleLogin = () => {
        setIsLoggedIn(true)
    }

    const { id } = useParams();
    const { color } = useParams();
    const { entidad } = useParams();
    const { municipio } = useParams();

    let nombre_bitacora, id_alterna, colorNombre, entidadNombre, municipioNombre
    let apellidos_bitacora, correoIns_bitacora, username_bitacora, municipio_bitacora, idUser_bitacora

    const [recuperadoBD, setRecuperadoBD] = useState([])
    let results6 = []

    const [nombreColor, setNombreColor] = useState([])
    let resultsNombres = []

    const [enti, setEnti] = useState([])
    let resultsEnti = []

    const [muni, setMuni] = useState([])
    let resultsMuni = []

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

    const RecuperadoBD = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8081/recuperado/` + id)
            setRecuperadoBD(data)
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

    const cargarMunicipios = async (entidadId) => {
        try {
            const response = await axios.get(`http://localhost:8081/municipios/${entidadId}`);
            setMunicipios(response.data)
        } catch (error) {
            console.error('Error al cargar los municipios:', error);
        }
    }

    const NombreColor = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/nombres/" + color);
            setNombreColor(data)
        } catch (err) {

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
        recuperado['fecha'] = fecha
        console.log("la fecha de la funcion es :", fecha)
    }

    const formatoHora = () => {
        let horaCompleta
        let today = new Date()
        let hora = today.getHours()
        let minutos = today.getMinutes()
        horaCompleta = hora + ':' + minutos
        recuperado['hora'] = horaCompleta
        console.log('La hora de registro es: ', horaCompleta)
    }


    useEffect(() => {
        axios.get("http://localhost:8081/recuRevision/" + id + "/" + color + "/" + entidad + "/" + municipio)
            .then(res => {
                console.log("Datos encontrados RECFALTANTES")
                console.log(res.data)
                const datos = res.data
                setDatos(res.data[0])
                formatoDia()
                formatoHora()
                setRecuperado(res.data)
                console.log(recuperado)
            })
            .catch(err => console.log(err))

    }, [id]);

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
                NombreColor()
                Entidades()
                Municipios()
                console.log("20MIL SEGUNDOS")
            }, 2000)
        }

        RecuperadoBD()

    }, [])

    results = llenado
    results2 = entidades
    results3 = municipios
    resultsDatos = datos

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            console.log("Entre al try")
            console.log(recuperado)
            //let camposValidados = validarCampos()

            //if (!camposValidados) return
            await axios.post("http://localhost:8081/crearRecVerificado", recuperado);

            alert("El nuevo registro ha sido guardado correctamente ")
            navigate("/")

        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        formatoDia()
        formatoHora()
        const { name, value } = e.target
        setRecuperado({ ...recuperado, nombre_bitacora, apellidos_bitacora, correoIns_bitacora, username_bitacora, municipio_bitacora, idUser_bitacora, [name]: value })

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

    result = userData
    result.map(userData => {
        nombre_bitacora = userData.nombre
        apellidos_bitacora = userData.apellidos
        correoIns_bitacora = userData.correoIns
        username_bitacora = userData.username
        municipio_bitacora = userData.municipio
        idUser_bitacora = userData.id

    })

    resultsNombres = nombreColor
    resultsNombres.map(nombreColor => {
        colorNombre = nombreColor.DESCRIPCION
    })

    resultsEnti = enti
    resultsEnti.map(enti => {
        entidadNombre = enti.ENTIDAD
    })

    resultsMuni = muni
    resultsMuni.map(muni => {
        municipioNombre = muni.MUNICIPIO
    })


    results6 = recuperadoBD
    console.log(recuperado)


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
                        <div className="contenedor">

                            <form className="row g-6">

                                <input type="hidden" className="form-control-plaintext" id="alternaRec" name='alternaRec' onClick={handleChange} onChange={(e) => setRecuperado({ ...recuperado, alternaRec: e.target.value })} defaultValue={datos.ID_ALTERNA} />

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">ENTIDAD:</label></strong>
                                    <input type="hidden" className="form-control-plaintext" id="entidadRec" name='entidadRec' onClick={handleChange} onChange={(e) => setRecuperado({ ...recuperado, entidadRec: e.target.value })} defaultValue={datos.ENTIDAD} />
                                    <select className="form-control-plaintext" id="entidadRec" name='entidadRec' onChange={handleEntidadChange} onClick={handleChange} required>
                                        <option selected disabled value="">{entidadNombre}</option>
                                        {results2.map(entidades => {
                                            return (
                                                <option onClick={handleChange} name={entidades.ENTIDAD} key={entidades.ID_ENTIDAD} value={entidades.ID_ENTIDAD}>{entidades.ENTIDAD}</option>

                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">MUNICIPIO:</label></strong>
                                    <input type="hidden" className="form-control-plaintext" id="municipioRec" name='municipioRec' onClick={handleChange} onChange={handleChange} defaultValue={datos.MUNICIPIO} />
                                    <select className="form-control-plaintext" id="municipioRec" name='municipioRec' onChange={handleChange} required>
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
                                    <input type="text" className="form-control-plaintext" id="calleRec" name='calleRec' onClick={handleChange} onChange={handleChange} defaultValue={datos.CALLE} />
                                </div>

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">NÚMERO EXTERIOR:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="num_extRec" name='num_extRec' onClick={handleChange} onChange={handleChange} defaultValue={datos.NUM_EXT} />
                                </div>

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">COLONIA:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="colonia_rec" name='coloniaRec' onClick={handleChange} onChange={handleChange} defaultValue={datos.COLONIA} />
                                </div>

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">CÓDIGO POSTAL:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="cp_rec" name='cpRec' onClick={handleChange} onChange={handleChange} defaultValue={datos.CP_REC} />
                                </div>

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">SERIE:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="serieRec" name='serieRec' onClick={handleChange} onChange={handleChange} defaultValue={datos.SERIE} />
                                </div>

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">PLACA:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="placaRec" name='placaRec' onClick={handleChange} onChange={handleChange} defaultValue={datos.PLACA} />
                                </div>

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">COLOR DEL AUTOMÓVIL:</label></strong>
                                    <input type="hidden" className="form-control-plaintext" id="colorRec" name='colorRec' onClick={handleChange} onChange={handleChange} defaultValue={datos.COLOR} />
                                    <select className="form-control-plaintext" id="colorRec" name="colorRec" onChange={handleChange} required>
                                        <option selected disabled value="">{colorNombre}</option>
                                        {results.map(llenado => {
                                            return (
                                                <option onClick={handleChange} name={llenado.ID_COLOR} key={llenado.ID_COLOR} value={llenado.ID_COLOR}>{llenado.DESCRIPCION}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">FECHA:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="fechaRec" name='fechaRec' onClick={handleChange} onChange={handleChange} defaultValue={datos.FECHA} />
                                </div>

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">HORA:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="horaRec" name='horaRec' onClick={handleChange} onChange={handleChange} defaultValue={datos.HORA} />
                                </div>
                            </form>
                            { /* <Button variant="primary" type="submit" onClick={handleClick}></Button>  */}
                            <Link to="/ListaArchivos" className="btn  btn-info " onClick={() => setIsLoggedIn(false)}> INICIO</Link>
                            {/*<Link className="btn  btn-info" to={`/recuperado/${id}`}>EDITAR</Link>*/}
                            <Link to="/TablaRecuperado" className='btn btn-info' variant="primary" type="submit" onClick={handleClick}>VERIFICAR</Link>
                        </div>

                        {/*<table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">SERIE</th>
                                    <th scope="col">PLACA</th>
                                    <th scope="col">FECHA</th>
                                    <th scope='col'>HORA</th>
                                    <th scope='col'>VERIFICAR</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>23:34</td>
                                    <td><button>VERIFICAR</button></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <td>11:23</td>
                                    <td><button>VERIFICAR</button></td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry the Bird</td>
                                    <td>@twitter</td>
                                    <td>dfgdfg</td>
                                    <td>23:32</td>
                                    <td><button>VERIFICAR</button></td>
                                </tr>
                            </tbody>
                    </table>*/}
                    </div>
                </>
            ) : (
                <Login onLogin={handleLogin} />
            )
            }

        </>
    );
};