import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importar las páginas
import Home from './componentes/contratante/inicio/Home';
import Info from './componentes/contratante/inicio/Info';
import Nav from './componentes/contratante/inicio/Nav';
import Register from './componentes/contratante/inicio/register';
import Aspirantes from './componentes/contratante/inicio/Aspirantes';

// Importar componentes de aspirantes
import Login from './componentes/aspirantes/login/Login';
import Dashboard from './componentes/aspirantes/dashboard/Dashboard';
import ContactarReclutador from './componentes/aspirantes/registro/ContactarReclutador';
import ProtectedRoute from './componentes/aspirantes/auth/ProtectedRoute';

// Importar componente NotFound
import NotFound from './componentes/shared/NotFound';

const App = () => {
  return (
    <Router basename="/Proyecto_sena/JEFT_J_R/frontend1/dist">
      <Routes>
        {/*
          Esta ruta renderiza el componente Home cuando la URL es '/'
          o cuando la URL es '/Home'. Es una buena práctica usar un índice.
        */}
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Nav" element={<Nav />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/aspirantes" element={<Aspirantes />} />

        
        {/* Rutas de aspirantes */}
        <Route path="/aspirantes/login" element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        } />

         <Route path="/aspirantes/dashboard" element={
          <ProtectedRoute requireAuth={true}>
            <Dashboard />
          </ProtectedRoute>
        } />

         {/* Nueva ruta para contactar reclutador */}
        <Route path="/aspirantes/contactar-reclutador" element={<ContactarReclutador />} />
      
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;