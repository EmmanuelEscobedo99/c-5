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
import { PasswordSuperUser } from './PasswordSuperUser'

export const TablaRecuperado = () => {

    const [isPasswordIn, setIsPasswordIn] = useState(false)
    console.log(isPasswordIn)

    const [datos, setDatos] = useState([])

    const RecuperadoBD = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8081/recuRevisionTodo`)
            setDatos(data)
        }
        catch (err) {

        }
    }

    useEffect(() => {
        RecuperadoBD()
    }, [])

    const handleLogin = () => {
        setIsPasswordIn(true)
    }

    return (
        <>
            {isPasswordIn ? (
                <>
                    <Navbar />
                    <div className='area-form'>
                        <div className='contenedor'>
                            <div>
                                <h1>Vehículos recuperados sin verificar</h1>
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "10%" }}>ID</th>
                                            <th style={{ width: "20%" }}>SERIE</th>
                                            <th style={{ width: "20%" }}>PLACA</th>
                                            <th style={{ width: "20%" }}>FECHA</th>
                                            <th style={{ width: "10%" }}>HORA</th>
                                            <th style={{ width: "20%" }}>VERIFICACIÓN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datos.map((fila) => (
                                            <tr key={fila.ID_ALTERNA}>
                                                <td>{fila.ID_ALTERNA}</td>
                                                <td>{fila.SERIE}</td>
                                                <td>{fila.PLACA}</td>
                                                <td>{fila.FECHA}</td>
                                                <td>{fila.HORA}</td>
                                                <td><Link className="btn" to={`/RecuperadosFaltaVerificar/${fila.ID_ALTERNA}/${fila.COLOR}/${fila.ENTIDAD}/${fila.MUNICIPIO}`}>REVISAR</Link></td>
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
                    <PasswordSuperUser onLogin={handleLogin} />
                </>
            )
            }
        </>
    )
}
