import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importar las páginas
import Home from './componentes/contratante/inicio/Home';
import Info from './componentes/contratante/inicio/Info';
import Nav from './componentes/contratante/inicio/Nav';
import Register from './componentes/contratante/inicio/register';
import Aspirantes from './componentes/contratante/inicio/Aspirantes';

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

        {/* Esta ruta comodín redirige a la ruta raíz si la URL no coincide con ninguna ruta definida.
          Esto es útil si no quieres un componente NotFound.
        */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;