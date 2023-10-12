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
      navigate('/TablaEntregado');
    } catch (error) {
      // Mostrar un mensaje de error al usuario utilizando react-toastify
      toast.error("Usuario o contraseña incorrectos");
    }
  }

  return (
    <div className='bodyLogin'>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
      <div className='area-form'>
        <div className='containerLogin'>
          <form>
            <div className='form-group'>
              <div className="brand-title">SUPER USUARIO</div>
              <br></br>
              <label for="username">INGRESE NOMBRE DE USUARIO</label>
              <input type="text" className="form-control" id="username" name="username" onChange={handleChange} placeholder="Usuario" />
            </div>
            <div className="form-group">
              <label for="password">INGRESE CONTRASEÑA DE USUARIO</label>
              <input type="password" className="form-control" id="password" name="password" onChange={handleChange} placeholder="Contraseña" />
            </div>
            <Button style={{ width: '250px' }} type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Enviar
            </Button>
            <Link style={{ width: '250px' }} to="/ListaArchivos" type="submit" className="btn btn-primary">
              Regresar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
