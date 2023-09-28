import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import "../archivosCss/formulario.css"
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import { Toaster, toast } from 'sonner'

export const RegistroUsuarios = () => {

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

    const [datos, setDatos] = useState({
        nombre: '',
        apellidos: '',
        municipio: '',
        username: '',
        correoIns: '',
        contraseña: ''
    })

    const [todosDatos, setTodosDatos] = useState([])
    let results = []

    useEffect(() => {
        const buscarRegistros = async () => {
            try {
                const res = await axios.get("http://localhost:8081/todosDatos");
                setTodosDatos(res.data)
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        buscarRegistros();

    }, []);

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(datos)
        const formulario = document.getElementById('formulario')
        formulario.reset()

        try {
            console.log("Entre al try")
            await axios.post("http://localhost:8081/crearDatos", datos);
            console.log(setDatos + "SetDatos")

            alert("El nuevo registro ha sido guardado correctamente ")
            navigate("/")

        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setDatos((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(datos)
    }

    result = userData

    return (
        <>
            <Navbar />

            <div className='area-form'>
                <div className='contenedor'>
                    <form className='row g-3 needs-validation' noValidate id='formulario'>
                        {result.map((userData) => {
                            return (
                                <>
                                    <h2>Bienvenido: {userData.username}</h2>
                                </>
                            )
                        })}
                        <center><h1> REGISTRO DE USUARIOS</h1></center>
                        <br />
                        {results.map((todosDatos) => {
                            <div class="formulario_grupo col-4" id='grupo_id'>
                                <input type='hidden' className='form-control' id='id' name='id' value={todosDatos.ID} onChange={handleChange} />
                            </div>
                        })}
                        <div class="formulario_grupo col-4" id='grupo_nombre'>
                            <label className="form-label" class="formulario_label" for='nombre' >NOMBRE:</label>
                            <div class="formulario_grupo-input">
                                <input type="text" className="form-control" id="nombre" name="nombre" onChange={handleChange} required />
                            </div>
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <div class="formulario_grupo col-4" id='grupo_apellidos'>
                            <label className="form-label" class="formulario_label" for='apellidos' >APELLIDOS:</label>
                            <div class="formulario_grupo-input">
                                <input type="text" className="form-control" id="apellidos" name="apellidos" onChange={handleChange} required />
                            </div>
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <div class="formulario_grupo col-4" id='grupo_municipio'>
                            <label className="form-label" class="formulario_label" for='municipio' >MUNICIPIO:</label>
                            <div class="formulario_grupo-input">
                                <input type="text" className="form-control" id="municipio" name="municipio" onChange={handleChange} required />
                            </div>
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <div class="formulario_grupo col-4" id='grupo_correoIns'>
                            <label className="form-label" class="formulario_label" for='correoIns' >CORREO INSTITUCIONAL:</label>
                            <div class="formulario_grupo-input">
                                <input type="text" className="form-control" id="correoIns" name="correoIns" onChange={handleChange} required />
                            </div>
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <div class="formulario_grupo col-4" id='grupo_username'>
                            <label className="form-label" class="formulario_label" for='username' >NOMBRE DE USUARIO:</label>
                            <div class="formulario_grupo-input">
                                <input type="text" className="form-control" id="username" name="username" onChange={handleChange} required />
                            </div>
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <div class="formulario_grupo col-4" id='grupo_contraseña'>
                            <label className="form-label" class="formulario_label" for='contraseña' >CONTRASEÑA:</label>
                            <div class="formulario_grupo-input">
                                <input type="password" className="form-control" id="contraseña" name="contraseña" onChange={handleChange} required />
                            </div>
                            <div class="invalid-feedback">Porfavor rellene el campo.</div>
                        </div>
                        <Button variant="primary" type="submit" onClick={handleClick}>Registrar</Button>
                    </form>
                </div>
            </div>
        </>
    )
}
