import React, { useState } from 'react';
import axios from 'axios';
import { Recuperado } from './Recuperado';
import ListaArchivos from './ListaArchivos';
import { Link, useParams, useNavigate } from 'react-router-dom'
import "../archivosCss/formulario.css"

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' });
  console.log(formData)
  const handleChange = (e) => {
    //const { name, value } = e.target;
    //setFormData({ ...formData, [name]: value });
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/login', formData);
      console.log('BIENVENIDO AL SISTEMA:', response.data);
      navigate('/')
      // Aquí puedes redirigir al usuario o realizar otras acciones después del inicio de sesión exitoso
    } catch (error) {
      alert("Usuairio o contraseña incorrectos")
      console.error('Error al iniciar sesión:', error.response.data);
      // Aquí puedes manejar errores de inicio de sesión, como mostrar mensajes de error al usuario
    }
  };

  return (
    <div>
      <div className='area-form'>
        <div className='contenedor'>
          <h2 class="login-title">INICIAR SESIÓN</h2>
          <form>
            <div>

              <div className='col-12'>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  className="form-control"
                  placeholder="Usuario"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <br />
              <div className='col-12'>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  className="form-control"
                  placeholder="Contraseña"
                  onChange={handleChange}
                />
              </div>
            </div>
            <button class="btn btn-primary" onClick={handleSubmit}>Iniciar sesión</button> <br />
          </form>
        </div>
      </div>
    </div>



  );
}

export default Login;
