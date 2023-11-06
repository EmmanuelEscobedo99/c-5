import Navbar from "./../Navbar"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { PasswordSUrobado } from "../PasswordSUrobado"



const Lista_rsr = () => {

  const [isPasswordIn, setIsPasswordIn] = useState(false)
  const [isTokenRobados, setIsTokenRobados] = useState(localStorage.getItem('tokenRobados'))

  //users
  const [registros, setRegistros] = useState([]);
  //search
  const [busqueda, setBusqueda] = useState("")



  // metodo de filtrado
  const btn_busqueda = (e) => {
    setBusqueda(e.target.value)
    console.log(e.target.value)

  }
  
  const handleLogin = () => {
    setIsTokenRobados(true)
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
        const res = await axios.get("http://localhost:8081/registro_temp");
        setRegistros(res.data)
        console.log(res.data)

      } catch (err) {
        console.log(err)
      }

    };
    buscarRegistros();

  }, []);

  return (
    <>
      <Navbar></Navbar>
      {isTokenRobados ? (
        <>
          <div className="titulo">
            <h3>Registros en espera de revision</h3>
          </div>
          <div className="btn-busqueda">
            <input value={busqueda} onChange={btn_busqueda} type="text" placeholder="Busqueda" className="form-control"></input>
          </div>

          <div >
            <section>
              <div className="container">

                <div className="d-flex w-10 bg-white justify-content-center align-items-center">
                  <div className="w-100 bg-white rounded ">
                    <table className="table caption-top">
                      <thead className="table-dark">
                        <tr>
                          <th>Denunciante</th>
                          <th>Averiguacion</th>
                          <th>Fecha de robo</th>
                          <th>Placa</th>
                          <th>Modelo</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((registros, i) => {
                          return <tr key={i}>
                            <td>{registros.NOMBRE_DEN}{" "}{registros.PATERNO_DEN}</td>
                            <td>{registros.AVERIGUACION}</td>
                            <td>{registros.FECHA_ROBO}</td>
                            <td>{registros.PLACA}</td>
                            <td>{registros.MODELO}</td>
                            <td> <Link to={`/vrsr/${registros.ID_TEMPORAL}`} className="btn btn-success mx-2" id="ver">...ver mas</Link></td>

                          </tr>
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      ) : (
        <>
          <PasswordSUrobado onLogin={handleLogin} />
        </>
      )
      }



    </>
  )
}

export default Lista_rsr