import './App.css'
import Cadastrar_usuario from './components/cadastrar_usuario'
import Cadastrar_prestador from './components/cadastrar_prestador'
import FormularioLogin from './components/login'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Agendamento from './components/agendamento';
import MenuSuperior from './components/menuSuperior'
import useAuth from './components/useAuth'

const App = () => {
  const { autenticado } = useAuth();

  return (
    <Router>
      {autenticado && <MenuSuperior />}
      <Routes>
        <Route path="/login" element={<FormularioLogin />} />
        <Route path="/" element={autenticado ? <Navigate to="/agendamento" /> : <FormularioLogin />} />
        <Route path="/cadastrar/usuario" element={<Cadastrar_usuario />} />
        <Route path="/cadastrar/prestador" element={<Cadastrar_prestador />} />
        <Route path="/agendamento" element={<Agendamento />} />
      </Routes>
    </Router>

  );
};


export default App;
