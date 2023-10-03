import { BrowserRouter, Routes, Route } from "react-router-dom"
import Baja from "./componentes/Baja"
import ListaArchivos from "./componentes/ListaArchivos"
import Modificar from "./componentes/Modificar"
import Login from "./componentes/Login"
import MasD from "./componentes/MasD"
import Formulario from "./componentes/MasD"
import { Recuperado } from "./componentes/Recuperado"
import { Entregado } from "./componentes/Entregado"
import Registrar from "./componentes/Registrar"
import { RegistroUsuarios } from "./componentes/RegistroUsuarios"
import { useState } from "react"
import { RecFaltantes } from "./componentes/RecFaltantes"
import { TablaRecuperado } from "./componentes/TablaRecuperado"

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [username, setUsername] = useState('')

  const handleLogin = (user) => {
    setUsername(user)
    setAuthenticated(true)
  }

  const handleLogout = () => {
    setUsername('')
    setAuthenticated(false)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListaArchivos />}></Route>
          <Route path="/ListaArchivos" element={<ListaArchivos />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Navbar" element={<Baja />}></Route>
          <Route path="/Modificar" element={<Modificar />}></Route>
          <Route path="/detalles/:id" element={<MasD />}></Route>
          <Route path="/formulario" element={<Formulario />}></Route>
          <Route path="/recuperado/:id?" element={<Recuperado />}></Route>
          <Route path="/entregado/:id?" element={<Entregado />}></Route>
          <Route path="/Registrar" element={<Registrar/>}></Route>
          <Route path="/RegistroUsuarios" element={<RegistroUsuarios/>}></Route>
          <Route path="/RecuperadosFaltaVerificar/:id/:color/:entidad/:municipio" element={<RecFaltantes/>}></Route>
          <Route path="/TablaRecuperado" element={<TablaRecuperado/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
