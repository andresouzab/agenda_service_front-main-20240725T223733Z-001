
// Componente para incluir usuarios no Banco de Dados.
//Declaração da função do componente usuario
import { useForm } from "react-hook-form";
// Importar o axios para o código
import { api } from "../config_axios" // aqui vai dar ruim
// Importar useState inclusivo do react usa metódo promisses com async e await
import { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Register serve para definir os nomes dos campos do form (validação)
// handleSubmit, para indicar o método a ser acionado no evento onSubmit do form
const agendamentos = () => {
    const { register, handleSubmit } = useForm();
    const [aviso, setAviso] = useState("");
    const [selectDate, setSelectDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("00:00");
    const [pessoa_juridica, setPessoaJuridica] = useState([]);
    const [selectedServicoNome, setSelectedServicoNome] = useState("");
    const [servicos, setServicos] = useState([]);

    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const response = await api.get("/servicos");
                setServicos(response.data);
            } catch (error) {
                console.error("Erro ao buscar serviço!", error);
            }
        };

        fetchServicos();
    }, []);

    const buscarPJPorNomeServico = async (servicoNome) => {
        if (!servicoNome) return;

        try {
            const response = await api.get(`/pessoa_juridica/search?servicoNome=${servicoNome}`);
            console.log(servicoNome);
            setPessoaJuridica(response.data);
            console.log("pj lista" + response.data);

        } catch (error) {
            console.error("Erro ao buscar prestadores por nome do serviço", error);
        }
    };

    const handleServicoChange = (event) => {
        console.log("Event target value:", event.target.value);
        console.log("Servicos array:", servicos); // Log do array servicos

        const servicoEncontrado = servicos.find(servico => servico.id === parseInt(event.target.value, 10));
        console.log("Servico encontrado:", servicoEncontrado); // Log do serviço encontrado

        const servicoNome = servicoEncontrado?.nome;
        console.log("Servico Nome:", servicoNome);

        setSelectedServicoNome(event.target.value);

        buscarPJPorNomeServico(servicoNome);
    };

    const salvar = async (campos) => {
        try {
            // Adiciona os campos agendamento_hora e agendamento_servico_id ao objeto campos
            const camposCompletos = {
                ...campos,
                agendamento_hora: selectedTime,
                servicos: { id: watch("servico_id") }
            };
            console.log("Campos completos:", camposCompletos);

            const response = await api.post("agendamento", camposCompletos);
            setAviso("Agendamento realizado com sucesso!");
            reset();
        } catch (error) {
            setAviso("Erro ai realizar agendamento!");
        }
    };

    useEffect(() => {
        console.log("Servicos:", servicos);
    }, [servicos]);



    return ( //aqui é o que vai ser exibido em tela
        <div className="container">
            <h4 className="container">Agendamento de Serviço</h4>

            <form onSubmit={handleSubmit(salvar)}>

            
                <select
                    className="form-select"
                    aria-label="Default select example"
                    {...register("id")}
                    defaultValue=""
                    onChange={handleServicoChange}
                >  <option value="" disabled>Selecione um serviço</option>
                    {servicos.map(servico => (
                        <option key={servico.id} value={servico.id}>{servico.nome}</option>
                    ))}
                </select>

                <div className="form-group mt-2">
                    <label htmlFor="pessoa_juridica">Prestador</label>
                    <select className="form-control" id="pessoa_juridica" required {...register("id")} defaultValue="" disabled={!selectedServicoNome}>
                        <option value="" disabled>Selecione um prestador</option>
                        {pessoa_juridica.map(PessoaJuridica=>(
                             <option key={PessoaJuridica.id} value={PessoaJuridica.id}>{PessoaJuridica.nome}</option>
                            ))}
                    </select>

                    <div className="form-group">
                        <label htmlFor="dt_inicio">Data de Agendamento</label>
                        <DatePicker
                        selected={selectDate}
                        onChange={(date) => setSelectDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        />
                        <div className="form-group mt-2">
                            <label htmlFor="dt_fim">Hora</label>
                            <input
                                type="time"
                                className="form-control"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                            />
                        </div>
                    
                        <button type="submit" className="btn btn-primary mt-3" value="Agendar" > Agendar</button>
                        <input type="reset" className="btn btn-danger mt-3" value="Limpar" />
                    </div>
                </div>
            </form>
            <div className="alert">{aviso}</div>

        </div>

    )
}
export default agendamentos;
