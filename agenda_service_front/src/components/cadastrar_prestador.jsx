
// Componente para incluir usuarios no Banco de Dados.
//Declaração da função do componente usuario
import {useForm} from "react-hook-form";
// Importar o axios para o código
import {api} from "../config_axios" // aqui vai dar ruim
// Importar useState inclusivo do react usa metódo promisses com async e await
import { useState } from "react";
//Register serve para definir os nomes dos campos do form (validação)
// handleSubmit, para indicar o método a ser acionado no evento onSubmit do form
const prestadores = () => {
const {register, handleSubmit} = useForm();
const [aviso, setAviso ] = useState("");
const salvar = async data => {
    try {
        const responseEndereco = await api.post("enderecos", {
            rua: data.rua,
            numero: data.numero,
            complemento: data.complemento,
            cep: data.cep,
            bairro: data.bairro,
            cidade: {
                id: data.id  
            }
        
        });
        const enderecoId = responseEndereco.data.id;
        
        const responsePessoaJuridica = await api.post("pessoa_juridica", {
            nome: data.nome,
            cnpj: data.cnpj,
            email: data.email,
            razao_social: data.razao_social,
            senha: data.senha,
            endereco: {
                id: enderecoId
            }
        });
        console.log(responsePessoaJuridica);
        const PessoaJuridicaId = responsePessoaJuridica.data.id; // Supondo que a resposta do servidor inclui o ID do cliente
        // Cadastrar o telefone do cliente
        await api.post("telefones", {
            pessoa: {
                id: PessoaJuridicaId
            },
            numero: data.numero,
        });

        setAviso("Prestados e telefone cadastrados com sucesso!");
        reset();
    } catch (error) {
        setAviso("Erro ao cadastrar prestador e telefone!");
    }
};





    return( //aqui é o que vai ser exibido em tela
        <div className="container">
            <h4 className="container">Inclusão de Prestador</h4>
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                        <input type="text" className="form-control" id="nome" required autoFocus {...register("nome")}/>
                </div>
                <div className="form-group mt-2">
                     <label htmlFor="cnpj">CNPJ</label>
                         <input type="text" className="form-control" id="cnpj" required {...register("cnpj")}/>
                </div>
                <div className="form-group mt-2">
                     <label htmlFor="email">E-mail</label>
                         <input type="email" className="form-control" id="email" required {...register("email")}/>
                </div>
                <div className="form-group mt-2">
                     <label htmlFor="telefone">Número de Telefone</label>
                         <input type="number" className="form-control" id="telefone" required {...register("numero")}/>
                </div>
                <div className="form-group mt-2">
                     <label htmlFor="razao_social">Razão Social</label>
                         <input type="text" className="form-control" id="razao_social" required {...register("razao_social")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="senha">Senha</label>
                         <input type="text" className="form-control" id="senha" maxLength={255} required {...register("senha")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="rua">Rua</label>
                         <input type="text" className="form-control" id="rua" required {...register("rua")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="cep">CEP</label>
                         <input type="number" className="form-control" id="cep" required {...register("cep")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="numero">Número</label>
                         <input type="number" className="form-control" id="numero" required {...register("numero")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="complemento">Complemento</label>
                         <input type="text" className="form-control" id="complemento" required {...register("complemento")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="cidade">Cidade</label>
                         <input type="number" className="form-control" id="cidade" required {...register("id")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="estado">Estado</label>
                         <input type="number" className="form-control" id="estado" required {...register("estado")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="bairro">Bairro</label>
                         <input type="text" className="form-control" id="bairro" required {...register("bairro")}/>
                </div>
                <input type="submit" className="btn btn-primary mt-3" value="Enviar" />
                <input type="reset" className="btn btn-danger mt-3" value="Limpar"/>
        </form>
        <div className="alert"></div>
                
        </div>
    )
}

export default prestadores;
