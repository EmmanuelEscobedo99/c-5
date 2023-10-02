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

export const RecFaltantes = () => {

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

    let nombre_bitacora, id_alterna
    let apellidos_bitacora, correoIns_bitacora, username_bitacora, municipio_bitacora, idUser_bitacora

    const [recuperadoBD, setRecuperadoBD] = useState([])
    let results6 = []

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
    datos

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
        axios.get("http://localhost:8081/recuRevision/" + id)
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

        // Obtén una referencia al input
        const inputs = document.querySelectorAll('.form-control-plaintext')
        // Dispara el evento 'click' en el input después de un pequeño retraso (por ejemplo, 1 segundo)

        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i]
            setTimeout(() => {
                input.click()
            }, 1000)
        }

        RecuperadoBD()
    }, [])

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

    result = userData
    result.map(userData => {
        nombre_bitacora = userData.nombre
        apellidos_bitacora = userData.apellidos
        correoIns_bitacora = userData.correoIns
        username_bitacora = userData.username
        municipio_bitacora = userData.municipio
        idUser_bitacora = userData.id

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

                                <div className='col-sm-2'>
                                    <strong><label>ID ALTERNA</label></strong>
                                    <input type="text" className="form-control-plaintext" id="alternaRec" name='alternaRec' onClick={handleChange} onChange={(e) => setRecuperado({ ...recuperado, alternaRec: e.target.value })} defaultValue={datos.ID_ALTERNA} />
                                </div>

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">ENTIDAD:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="entidadRec" name='entidadRec' onClick={handleChange} onChange={(e) => setRecuperado({ ...recuperado, entidadRec: e.target.value })} defaultValue={datos.ENTIDAD} />
                                </div>

                                <div className="col-sm-2">
                                    <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">MUNICIPIO:</label></strong>
                                    <input type="text" className="form-control-plaintext" id="municipioRec" name='municipioRec' onClick={handleChange} onChange={handleChange} defaultValue={datos.MUNICIPIO} />
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
                                    <input type="text" className="form-control-plaintext" id="colorRec" name='colorRec' onClick={handleChange} onChange={handleChange} defaultValue={datos.COLOR} />
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