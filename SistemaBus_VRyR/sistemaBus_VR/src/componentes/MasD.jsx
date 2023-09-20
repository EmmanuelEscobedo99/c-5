import Navbar from "./Navbar";

import Form from 'react-bootstrap/Form';

import "../archivosCss/formulario.css"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"




const MasD = () => {
  const { id } = useParams();
  const [datos, setDatos] = useState([]);
  datos

  useEffect(() => {
    axios.get("http://localhost:8081/buscarId/" + id)
      .then(res => {
        console.log("Datos encontrados")
        console.log(res.data)
        setDatos(res.data[0])
      })
      .catch(err => console.log(err))

  }, [id]);




  return (

    <>
      <Navbar></Navbar>
      <div className="area_form">
        <div className="contenedor">

          <h3>Vehiculo Robado Datos Registrados</h3>
          <form className="row g-6">

            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-2 col-form-label">AVERIGUACION:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.AVERIGUACION} />
            </div>

            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">FECHA DE AVERIGUACION:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.FECHA_AVERIGUA} />
            </div>

            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">AGENCIA:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.AGENCIA_MP} />
            </div>

            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">FECHA DEL ROBO:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.FECHA_ROBO} />
            </div>



            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">CALLE DEL ROBO:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.CALLE_ROBO} />
            </div>




            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">NÚMERO EXTERIOR:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.NUM_EXT_ROBO} />
            </div>



            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">COLONIA DEL ROBO:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.COLONIA_ROBO} />
            </div>



            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">MUNICIPIO DEL ROBO:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.ID_MUNICIPIO_ROBO} />
            </div>




            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">ENTIDAD DEL ROBO:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.ID_ENTIDAD_ROBO} />
            </div>



            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">NOMBRE DEL DENUNCIANTE:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.NOMBRE_DEN} />
            </div>



            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">APELLIDO DEL DENUNCIANTE:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.PATERNO_DEN} />
            </div>




            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">PLACA:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.PLACA} />
            </div>



            <div className="col-sm-2">
             <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">MARCA DEL VEHICULO:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.ID_MARCA} />
            </div>



            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">SUBMARCA DEL VEHICULO:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.ID_SUBMARCA} />
            </div>




            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">MODELO DEL VEHICULO:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.MODELO} />
            </div>



            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">COLOR DEL VEHICULO:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.ID_COLOR} />
            </div>



            <div className="col-sm-2">
              <strong><label htmlFor="staticEmail" className="col-sm-12 col-form-label">SERIE DEL VEHICULO:</label></strong>
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={datos.SERIE} />

            </div>


            { /* 
            <div className="mb-3 mt-3">
                     <label className="form-label" > Averiguacion:</label>
                     <input type="text"  className="form-control" id="averiguacion" name="averiguacion" onChange={handleChange}/>
                  </div>
                  
                  <div className="mb-3 mt-3">
                     <label className="form-label" > fecha averiguacion:</label>
                     <input type="text" className="form-control" id="fecha_averigua" name="fecha_averigua" onChange={handleChange}/>
                  </div>

                  <div className="mb-3 mt-3">
                     <label className="form-label" >agencia</label>
                     <input type="text" className="form-control" id="agencia_mp" name="agencia_mp" onChange={handleChange}/>
                  </div>
                   
                   
                  <div className="mb-3 mt-3" >
                     <select name="id_pais"  className="form-control form-select" onChange={handleChange}>
                            <option>Seleciona un pais</option>
                        {
                           val_bd.map((opts,i)=> 
                           <option value={opts.id} key={i}>{opts.paises}</option> )
                          
                        }
                        
                        </select>                    
                          </div>

                     */   }
            {/* 
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>NÚMERO DE AVERIGUACION PREVIA ASIGNADA</Form.Label>
          <Form.Control type="text" name="averiguacion" placeholder="aver" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>FECHA EN QUE SE DIO DE ALTA LA DENUNCIA</Form.Label>
          <Form.Control type="text" name="fecha_averigua" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>AGENCIA DEL MINISTERIO PÚBLICO DONDE SE HIZO LA DENUNCIA</Form.Label>
          <Form.Control type="text" name="agencia_mp" placeholder="" onChange={handleChange}/>
        </Form.Group>
         
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>NOMBRE COMPLETO DEL AGENTE DEL MINISTERIO PÚBLICO QUE LEVANTO LA DENUNCIA</Form.Label>
          <Form.Control type="text" name="agente_mp" placeholder=""onChange={handleChange} />
        </Form.Group>     
      </Row>*/}

            {  /*          
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridState">
          <Form.Label>MODALIDAD DEL ROBO</Form.Label>
          <Form.Select defaultValue="Choose..." type="text" name="" placeholder="" onChange={handleChange}>
            <option>0.-SIN INFORMACION</option>
            <option>1.-CON VIOLENCIA</option>
            <option>2.-SIN VIOLENCIA</option>
          </Form.Select >
        </Form.Group >

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>FECHA DEL ROBO</Form.Label>
          <Form.Control type="text" name="fecha_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>        

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>HORA DEL ROBO</Form.Label>
          <Form.Control type="text" name="hora_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>

      
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>CALLE DONDE OCURRIO EL ROBO</Form.Label>
          <Form.Control type="text" name="calle_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>NUMERO EXTERIOR DEL DOMICILIO DONDE OCURRIÓ EL ROBO</Form.Label>
          <Form.Control type="text" name="num_ext_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>
       
                
     <Row className="mb-3">
     <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>COLONIA DONDE OCURRIO EL ROBO</Form.Label>
          <Form.Control type="text" name="colonia_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>   

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label> IDENTIFICADOR DEL MUNICIPIO DONDE OCURRIÓ EL ROBO</Form.Label>
          <Form.Control type="text" name="id_municipio_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>        

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>IDENTIFICADOR DE LA ENTIDAD DÓNDE OCURRIÓ EL ROBO</Form.Label>
          <Form.Control type="text" name="id_entidad_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>


        
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>TIPO DEL LUGAR DONDE OCURRIÓ EL ROBO</Form.Label>
          <Form.Control type="text" name="id_tipo_lugar" placeholder="centro comercial, casa, etc. " onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>NOMBRE DE LA PERSONA QUE REALIZA LA DENUNCIA</Form.Label>
          <Form.Control type="text" name="nombre_den" placeholder=""onChange={handleChange} />
        </Form.Group>
      </Row>


      
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>APELLIDO PATERNO DE LA PERSONA QUE REALIZA LA DENUNCIA</Form.Label>
          <Form.Control type="text" name="paterno_den" placeholder="" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>CALLE DEL DOMICILIO DEL DENUNCIANTE</Form.Label>
          <Form.Control type="text" name="calle_den" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>

             

      <Row className="mb-3">
     <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>NÚMERO EXTERIOR DEL DOMICILIO DEL DENUNCIANTE</Form.Label>
          <Form.Control type="text" name="numext_dom_den" placeholder=""onChange={handleChange}/>
        </Form.Group>   

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>COLONIA DEL DOMICILIO DEL DENUNCIANTE </Form.Label>
          <Form.Control type="text" name="colonia_den" placeholder="" onChange={handleChange}/>
        </Form.Group>        

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>IDENTIFICADOR DEL DOMICILIO DEL DENUNCIANTE</Form.Label>
          <Form.Control type="text" name="id_municipio_den" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>



       
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>IDENTIFICADOR DE LA ENTIDAD DÓNDE OCURIIÓ EL ROBO</Form.Label>
          <Form.Control type="text" name="id_entidad_den" placeholder="" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>CÓDIGO POSTAL DEL LUGAR DEL ROBO</Form.Label>
          <Form.Control type="text" name="cp_den" placeholder="" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>PLACA O PERMISO DEL VEHÍCULO</Form.Label>
          <Form.Control type="text" name="placa" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>


 
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>IDENTIFICADOR DE LA MARCA DEL VEHÍCULO</Form.Label>
          <Form.Control type="text" name="id_marca" placeholder="" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>IDENTIFICADOR DE LA SUBMARCA DEL VEHÍCULO</Form.Label>
          <Form.Control type="text" name="id_submarca" placeholder="" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>AÑO DEL MODELO DEL VEHÍCULO EN CUATRO DÍGITOS</Form.Label>
          <Form.Control type="text" name="modelo" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>



            
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>IDENTIFICADOR DEL COLOR DEL VEHÍCULO ROBADO</Form.Label>
          <Form.Control type="text" name="id_color" placeholder=""onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>NO. DE SERIE O NÚMERO DE IDENTIFICACIÓN DEL VEHÍCULO VIN</Form.Label>
          <Form.Control type="text" name="serie" placeholder=""onChange={handleChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>CLAVE DEL TIPO DE USO DEL VEHÍCULO</Form.Label>
          <Form.Control type="text" name="id_tipo_uso" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>


      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>IDENTIFICADOR DE LA PROCEDENCIA DEL VEHÍCULO (ARMADORA)</Form.Label>
        <Form.Control type="text" name="id_procedencia" placeholder="" onChange={handleChange}/>
      </Form.Group>
      */ }

            { /* <Button variant="primary" type="submit" onClick={handleClick}></Button>  */}
            <Link to="/" className="btn  btn-info "> Inicio</Link>
            <Link className="btn  btn-info" to={`/recuperado/${id}`}>Recuperado</Link>
            <Link to={`/entregado/${id}`} className="btn  btn-info"> Entregado</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default MasD;
