import React, { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../archivosCss/formulario.css"
import "../archivosCss/Login.css"

const Login = ({onLogin}) => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '', privilegio: '' })
  let results = []
  let privilegio
  if (formData.username === "emmanuel") {
    privilegio = 2
  } else {
    privilegio = 1
  }
  //console.log(formData)


  const handleChange = (e) => {
    privilegio = document.getElementById('privilegio').value
    setFormData((prev) => ({ ...prev, privilegio, [e.target.name]: e.target.value }))
    //console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      //console.log('ENTRE AL TRY')
      const response = await axios.post(`http://localhost:8081/login`, formData)
      const { token } = response.data
       // Almacenar el token en el almacenamiento local
       localStorage.setItem('token', token)

       // Llamar a la función de inicio de sesión proporcionada por el padre
       onLogin()
      
      //console.log('BIENVENIDO AL SISTEMA:', response.data)
      navigate('/ListaArchivos')
      // Aquí puedes redirigir al usuario o realizar otras acciones después del inicio de sesión exitoso
    } catch (error) {
      alert("Usuairio o contraseña incorrectos")
      //console.error('Error al iniciar sesión:', error.response.data)
      // Aquí puedes manejar errores de inicio de sesión, como mostrar mensajes de error al usuario
    }
  }

  return (
    <div className='bodyLogin'>
      <div className='area-form'>
        <input id='privilegio' type="hidden" name="privilegio" value={privilegio} onChange={handleChange} ></input>
        {(formData.username == "emmanuel" && (<input id='privilegio' type="hidden" name="privilegio" value="2" onChange={handleChange} ></input>))}

        <div className="containerLogin">
          {/*<img src='../src/assets/c5.png' height="100px"></img>*/}
          <div className="brand-title">BUS DE INTEGRACIÓN </div>
          <div className="brand-title2">Inicio de sesión</div>
          <div className="inputsLogin">
            <br></br>
            <label className='label'>USUARIO</label>
            <input className='inputs' placeholder="Escriba su usuario"
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={formData.username} />
            <br></br>
            <label className='label'>CONTRASEÑA</label>
            <input className='inputs' placeholder="Escriba su contraseña"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange} />
            <br></br>
            <button className='buttons' onClick={handleSubmit}>LOGIN</button>
            
          </div>
        </div>
      </div >
    </div >
  )
}

export default Login
