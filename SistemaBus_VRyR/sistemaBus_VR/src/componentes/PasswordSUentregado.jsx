import { React, useState } from 'react'
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
import { TablaRecuperado } from './TablaRecuperado'
import { useNavigate } from 'react-router-dom'

export const PasswordSUentregado = ({ onLogin }) => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({ username: '', password: '' })

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(formData)
    }
    console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log('ENTRE AL TRY')
            const response = await axios.post(`http://localhost:8081/passwordSuperUsuario`, formData)
            console.log('BIENVENIDO AL SISTEMA:', response.data)
            onLogin()
            navigate('/TablaEntregado')
        } catch (error) {
            alert("Usuairio o contraseña incorrectos", error)
            console.error('Error al iniciar sesión:', error)
            // Aquí puedes manejar errores de inicio de sesión, como mostrar mensajes de error al usuario
        }
    }
    return (
        <div className='bodyLogin'>
            <div className='area-form'>
                <div className='containerLogin'>
                    <form>
                        <div className='form-group'>
                            <div className="brand-title">SUPER USUARIO </div>
                            <br></br>
                            <label for="username">INGRESE NOMBRE DE USUARIO</label>
                            <input type="text" class="form-control" id="username" name="username" onChange={handleChange} placeholder="Usuario" />
                        </div>
                        <div class="form-group">
                            <label for="password">INGRESE CONTRASEÑA DE USUARIO</label>
                            <input type="password" class="form-control" id="password" name="password" onChange={handleChange} placeholder="Contraseña" />
                        </div>
                        <Link style={{ width: '250px' }} to="/TablaEntregado" type="submit" class="btn btn-primary" onClick={handleSubmit}>Enviar</Link>
                        <Link style={{ width: '250px' }} to="/ListaArchivos" type="submit" class="btn btn-primary">Regresar</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
