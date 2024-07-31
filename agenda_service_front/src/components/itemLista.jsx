import "../css/itemLista.css";
//const ItemLista = (props) => { 
//nocódigo abaixo fiz a desestruturação de props
const itemLista = ({id_tarefas,titulo,descricao,status,data_criacao,data_limite,excluirClick,alterarClick}) => {
    return (
        <tr>
            <td>{id_tarefas}</td>
            <td>{titulo}</td>
            <td>{descricao}</td>
            <td>{status}</td>
            <td>{data_criacao}</td>
            <td>{data_limite}</td>
            <td class="text-end">
            </td>
           
            <td class="text-center">
                <i className="exclui text-danger fw-bold" title="Excluir" onClick={excluirClick}>&#10008;</i>
                <i className="altera text-sucess fw-bold ms-2" title="Alterar" onClick={alterarClick}>&#36;</i>
            </td>
        </tr>
    );
};

export default itemLista;