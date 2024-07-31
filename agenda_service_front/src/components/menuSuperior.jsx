import { Link } from "react-router-dom";
import useAuth from './useAuth'; // Ajuste o caminho conforme necessário

const MenuSuperior = () => {
  const { logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-sm" style={{ backgroundColor: '#67cfcf' }}>
      <div className="container">
        <button onClick={logout} className="navbar-brand">Logout</button>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/cadastrar/prestador" className="nav-link">Cadastrar Prestador</Link>
          </li>
          <li className="nav-item">
            <Link to="/agendamento" className="nav-link">Agendamentos</Link>
          </li>
          <li className="nav-item">
            <Link to="/cadastrar/usuario" className="nav-link">Cadastrar Usuário</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuSuperior;