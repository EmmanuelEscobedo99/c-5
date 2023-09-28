import Navbar from "./Navbar"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "../archivosCss/estilo.css"
import { useParams } from "react-router-dom"
import Login from "./Login"

const ListaArchivos = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))
  const [userData, setUserData] = useState([]);
  let result = []
  console.log(isLoggedIn)

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

  console.log(userData)
  const { id } = useParams()
  //users
  const [registros, setRegistros] = useState([]);
  //search
  const [busqueda, setBusqueda] = useState("")
  // metodo de filtrado
  const btn_busqueda = (e) => {
    setBusqueda(e.target.value)
    console.log(e.target.value)

  }
  // metodo de filtrado
  let results = []
  if (!busqueda) {
    results = registros
  } else {
    results = registros.filter((datos) =>
      datos.AVERIGUACION.toLowerCase().includes(busqueda.toLocaleLowerCase())
      // ||  datos.AGENCIA_MP.includes(busqueda.toLocaleLowerCase())
    )
  }
  useEffect(() => {
    const buscarRegistros = async () => {
      try {
        const res = await axios.get("http://localhost:8081/registro");
        setRegistros(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    buscarRegistros();

  }, []);

  result = userData

  return (
    <>
        {isLoggedIn ? (
          <>
            <Navbar></Navbar>
            <div className="titulo">
              <h3>Registros</h3>
              {result.map((userData) => {
                return (
                  <>
                    
                  </>
                )
              })}
            </div>
            <div className="btn-busqueda">
              <input value={busqueda} onChange={btn_busqueda} type="text" placeholder="Busqueda" className="form-control"></input>
            </div>
            <div >
              <section>
                <div className="container">
                  <div className="cards">
                    {results.map((registros, i) => {
                      return (
                        <div key={i} className="card">
                          <h4>DENUNCIANTE </h4>
                          <p>{registros.NOMBRE_DEN}{" "}{registros.PATERNO_DEN}</p>
                          <h4>AVERIGUACION</h4>  <p> {registros.AVERIGUACION}</p>
                          <h4>FECHA DE ROBO</h4> <p>{registros.FECHA_ROBO}</p>
                          <h4>PLACA DEL VEHICULO ROBADO</h4> <p>{registros.PLACA}</p>
                          <h4>MODELO </h4><p>{registros.MODELO}</p>
                          <div>
                            <Link id="btn" className="btn" to={`/detalles/${registros.ID_ALTERNA}`}>Detalles</Link> </div>
                        </div>)
                    })}
                  </div>
                </div>
              </section>
            </div>
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
    </>
  )
  
}



export default ListaArchivos