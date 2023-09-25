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


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/ListaArchivos" element={<ListaArchivos />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Navbar" element={<Baja />}></Route>
          <Route path="/Modificar" element={<Modificar />}></Route>
          <Route path="/detalles/:id" element={<MasD />}></Route>
          <Route path="/formulario" element={<Formulario />}></Route>
          <Route path="/recuperado/:id?" element={<Recuperado />}></Route>
          <Route path="/entregado/:id?" element={<Entregado />}></Route>
          <Route path="/Registrar" element={<Registrar/>}></Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
