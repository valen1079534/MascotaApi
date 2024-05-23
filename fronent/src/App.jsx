import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'tailwindcss/tailwind.css';
import LoginForm from "./components/LoginForm.jsx"
import Home from "./components/Home.jsx"
/* import AdiccionarMas from "./components/AdiccionarMascota.jsx"
import ModificarMas from "./components/ModificarMascota.jsx" */
import ConsultarMas from "./components/ConsultarMascota.jsx"
import {MascotasProvider} from "./context/PetsContext.jsx"
import FormMascotas from "./components/FormMascota.jsx";
import ProtectedRoute from "./ProtectedRouter.jsx";

function App() {

  return (

<MascotasProvider>
        <BrowserRouter>    
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route element={<ProtectedRoute/>} >
              <Route path="Home" element={<Home/>} />
              <Route path="/consultar/:id" element={<ConsultarMas/>} />
              <Route path="/AdiccionarMascota" element={< FormMascotas/>} />
              <Route path="/actualizar/:id" element={<FormMascotas/>} />
              </Route>
{/*               <Route path="AdiccionarMascota" element={<AdiccionarMas/>} /> 
               <Route path="/ModificarMascota/:" element={<ModificarMas/>}  /> */}
            </Routes>
        </BrowserRouter>
</MascotasProvider>        
      
    
  )
}

export default App;