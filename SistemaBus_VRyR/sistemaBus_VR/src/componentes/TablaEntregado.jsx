import {React, useState, useEffect} from 'react'
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
import { PasswordSUentregado } from './PasswordSUentregado'

export const TablaEntregado = () => {

    const [isPasswordIn, setIsPasswordIn] = useState(false)
    const [isTokenEntregados, setIsTokenEntregados] = useState(localStorage.getItem('tokenEntregados'))

    const [datos, setDatos] = useState([])
    let results = []

    const handleLogin = () => {
        setIsTokenEntregados(true)
    }

    const RecuperadoBD = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8081/recuEntregaTodo`)
            setDatos(data)
        }
        catch (err) {

        }
    }

    useEffect(() => {
        RecuperadoBD()
    }, [])

    results = datos
    let fechaFormat, newFechaFormat, getFecha

    results.map(datos => {
        getFecha = datos.FECHA
        
    })

    //getFecha = datos.FECHA
    fechaFormat = new Date(getFecha)
    let monthFecha = fechaFormat.getMonth() + 1
    if (monthFecha > 0 && monthFecha < 10) {
        monthFecha = "0" + monthFecha
    }
    let dayFecha = fechaFormat.getDate()
    if (dayFecha > 0 && dayFecha < 10) {
        
        dayFecha = "0" + dayFecha
    }
    newFechaFormat = fechaFormat.getFullYear() + "-" + monthFecha + "-" + dayFecha
    

    return (
        <>
            <Navbar />
            {
                isTokenEntregados ? (
                    <>
                        <div className='area-form'>
                            <div className='contenedor'>
                                <div>
                                    <h1>Vehículos entregados sin verificar</h1>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th style={{ width: "10%" }}>ID</th>
                                                <th style={{ width: "20%" }}>SERIE</th>
                                                <th style={{ width: "20%" }}>FECHA</th>
                                                <th style={{ width: "20%" }}>HORA</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datos.map((fila) => (
                                                <tr key={fila.ID_ALTERNA}>
                                                    <td>{fila.ID_ALTERNA}</td>
                                                    <td>{fila.SERIE}</td>
                                                    <td>{newFechaFormat}</td>
                                                    <td>{fila.HORA}</td>
                                                    <td><Link className="btn" to={`/EntregadosFaltaVerificar/${fila.ID_ALTERNA}/${fila.INSPECCION}/${fila.ENTIDAD}/${fila.MUNICIPIO}`}>REVISAR</Link></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <PasswordSUentregado onLogin={handleLogin} />
                    </>
                )
            }
        </>
    )
}
