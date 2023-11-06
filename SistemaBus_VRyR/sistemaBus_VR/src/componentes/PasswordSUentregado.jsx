import React, { useState } from 'react';
import Navbar from './Navbar';
import "../archivosCss/formulario.css";
import axios from 'axios';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PasswordSUentregado = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8081/passwordSuperUsuario`, formData);
      onLogin();
       //Almacenar token en localstorage
       localStorage.setItem('tokenEntregados', 'true')
      navigate('/TablaEntregado');
    } catch (error) {
      // Mostrar un mensaje de error al usuario utilizando react-toastify
      toast.error("Usuario o contraseña incorrectos");
    }
  }

  return (
    <div className='bodyLogin' style={{height:"776px"}}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
      <div className='area-form'>
        <div className='containerLogin' style={{height:"450px"}}>
          <form>
            <div className='form-group'>
            <div style={{fontSize:"26px"}} className="brand-title">ADMINISTRACIÓN</div>
              <br></br>
              <label for="username" style={{paddingBottom:"10px"}}>INGRESE USUARIO</label>
              <input type="text" className="form-control" id="username" name="username" onChange={handleChange} placeholder="Usuario" />
            </div>
            <div className="form-group">
            <label for="password" style={{paddingBottom:"10px", paddingTop:"10px"}}>INGRESE CONTRASEÑA</label>
              <input type="password" className="form-control" id="password" name="password" onChange={handleChange} placeholder="Contraseña" />
            </div>
            <br></br>
            <Button style={{ width: '280px', marginBottom:"10px" }} type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Enviar
            </Button>
            <br></br>
            <Link style={{ width: '280px' }} to="/ListaArchivos" type="submit" className="btn btn-primary">
              Regresar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
