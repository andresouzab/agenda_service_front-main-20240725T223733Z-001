import { useState } from "react";
import { useAuth } from './AuthProvider'; // Ajuste o caminho conforme necessário
import 'bootstrap/dist/css/bootstrap.min.css';
import { api } from "../config_axios";
import {useNavigate} from 'react-router-dom';

const FormularioLogin = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (email.trim() === "" || senha.trim() === "") {
            alert("Preencha todos os campos!");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8080/auth/login', { 
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, senha})
            });

            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                login(); // chama método login do authprovider
                navigate('/agendamento'); // redireciona página para agendamento
            } else {
                alert("E-mail ou senha inválidos!");
            }
        } catch (error) {
            alert("Erro ao tentar logar. Tente novamente mais tarde.");
        }
    };
    
    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src="Terceirizacao-de-Servicos-para-Empresas.jpg" className="img-fluid" alt="Phone image"/>
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">   
                        <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-4">
                                <input type="email" id="email" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label className="form-label" htmlFor="email">E-mail</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input type="password" id="senha" className="form-control form-control-lg" value={senha} onChange={(e) => setSenha(e.target.value)} />
                                <label className="form-label" htmlFor="senha">Senha</label>
                            </div>
                           
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
                            
                            <p></p>
                            <h6 >Clique <a href="http://localhost:5173/cadastrar/prestador">aqui</a> para se cadastrar como Prestador</h6>
                            <p></p>
                            <h6 >Clique <a href="http://localhost:5173/cadastrar/usuario">aqui</a> para se cadastrar como Cliente</h6>
                               
                            {/* Botões de mídia social */}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormularioLogin;