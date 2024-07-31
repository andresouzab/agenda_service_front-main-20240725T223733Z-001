
// Componente para incluir usuarios no Banco de Dados.
//Declaração da função do componente usuario
import {useForm} from "react-hook-form";
// Importar o axios para o código
import {api} from "../config_axios" // aqui vai dar ruim
// Importar useState inclusivo do react usa metódo promisses com async e await
import { useState } from "react";
//Register serve para definir os nomes dos campos do form (validação)
// handleSubmit, para indicar o método a ser acionado no evento onSubmit do form
const servicos = () => {
const {register, handleSubmit} = useForm();
const [aviso, setAviso ] = useState("");
const salvar = async (campos) => {
    try {
            const resposta = await api.post("servico", campos);
            setAviso("Serviço cadastrado com sucesso!");
            alert("Serviço cadastrado com sucesso!");
        } catch (error) {
            setAviso("Erro ao cadastrar o Serviço!");
        }
    }



    return( //aqui é o que vai ser exibido em tela
        <div className="container">
            <h4 className="container">Inclusão de Serviço</h4>
            <h3 className="container">Preencha os campos abaixo com as informações do serviço prestado</h3>
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                        <input type="text" className="form-control" id="nome" required autoFocus {...register("nome")}/>
                </div>
                <div className="form-group mt-2">
                     <label htmlFor="preco">Preço</label>
                         <input type="float" className="form-control" id="preco" required {...register("preco")}/>
                </div>
                <div className="form-group mt-2">
                     <label htmlFor="descricao">Descrição</label>
                         <input type="descricao" className="form-control" id="descricao" required {...register("descricao")}/>
                </div>
                <div className="form-group mt-2">
                     <label htmlFor="informacoes_extras">Informações Extras</label>
                         <input type="text" className="form-control" id="informacoes_extras" required {...register("informacoes_extras")}/>
                </div>
                <div className="form-group mt-2">
                     <label htmlFor="status">Status</label>
                         <input type="text" className="form-control" id="status" required {...register("status")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="categoria">Categoria</label>
                         <input type="text" className="form-control" id="categoria" required {...register("categoria")}/>
                         <select id="opt_categoria">
                            <option value="1">Limpeza</option>
                            <option value="2">Construção</option>
                            <option value="3">Beleza</option>
                            <option value="4">Saúde</option>
                            <option value="5">Eletrica</option>
                            <option value="6">Hidraulica</option>
                            <option value="7">Julho</option>
                            <option value="8">Agosto</option>
                            <option value="9">Setembro</option>
                            <option value="10">Outubro</option>
                            <option value="11">Novembro</option>
                            <option value="12">Dezembro</option>
                         </select>
                {/*<p><button onclick="selecionarTexto('opt_categoria', value)">TESTE</button> - Vai selecionar sempre Abril</p>*/}
     
                </div>
              
                <input type="submit" className="btn btn-primary mt-3" onclick="selecionarTexto('opt_categoria', value)" value="Enviar" />
                <input type="reset" className="btn btn-danger mt-3" value="Limpar"/>
        </form>
        <div className="alert"></div>
                
        </div>
    )
}

export default servicos;
