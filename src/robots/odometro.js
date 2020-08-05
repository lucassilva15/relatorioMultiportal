import api from '../services/api';
import state from '../robots/state';

async function robot() {
    const { token, dateTerm, veiculos } = state.load();
    await loadOdometro();
    state.save({ dateTerm, token, veiculos });

    async function loadOdometro() {
        const split = dateTerm.split("/");
        const date = new Date(split[2], split[1], split[0]);
        const month = date.getMonth();
        const year = date.getFullYear();

        for (let j = 0; j < veiculos.length; j++) {
            const response = await api.post('acumulados/odometromensal', {
                veiculoid: veiculos[j].id,
                mesAno: `${month}/${year}`,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "token": token,
                }
            });

            const { odometroDiarios } = response.data.object;

            for (let i = 0; i < odometroDiarios.length; i++) {
                if (dateTerm === odometroDiarios[i].diaSemana) {
                    veiculos[j].odometro = odometroDiarios[i].kmDia;
                }
            }
        }
    }

}

export default robot;