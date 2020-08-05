import api from '../services/api';
import state from '../robots/state';

async function robot() {

    const content = state.load();
    const { token, dateTerm, veiculos } = content;
    await loadViagens();
    state.save(veiculos);

    async function loadViagens() {
        for (let i = 0; i < veiculos.length; i++) {
            let h = 0;
            const estacionamento = [];

            const response = await api.post('acumulados/viagemestacionamento', {
                "veiculoid": veiculos[i].id,
                "dataInicial": `${dateTerm} 00:00:00`,
                "dataFinal": `${dateTerm} 23:59:59`
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                }
            });

            const { object } = response.data;

            const { estacionamentos } = object[0];

            for (let j = 0; j < estacionamentos.length; j++) {
                    const { horaInicio, horaFinal, tempo, enderecoInicial, enderecoFinal } = estacionamentos[j];
                    const dataFormatada = new Date(horaInicio).toLocaleString();
                    const dataFimFormatada = new Date(horaFinal).toLocaleString();

                    estacionamento[h] = { dataFormatada, dataFimFormatada, tempo, enderecoInicial, enderecoFinal };
                    h++;
            }
            veiculos[i].paradas = estacionamento.length;
            veiculos[i].estacionamento = estacionamento;
        }
    }
}

export default robot;