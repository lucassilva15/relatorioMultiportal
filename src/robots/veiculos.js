import api from '../services/api';
import state from '../robots/state';

async function robot() {

    const content = state.load();
    const loadVeicles = await carregarVeiculos(content);
    const popularMotorista = popularMotoristas(loadVeicles);

    content.veiculos = popularMotorista;
    state.save(content);

    async function carregarVeiculos(content) {
        const { token } = content;

        const response = await api.post('veiculos', null, {
            headers: {
                "Content-Type": "application/json",
                "token": token,
            }
        });
        const { object } = response.data;
        const newVeiculos = [];

        for (let i = 0; i < object.length; i++) {
            newVeiculos[i] = {
                id: object[i].id,
                placa: object[i].placa,
            }
        }
        return newVeiculos;
    }
    function popularMotoristas(content) {

        const motoristas = [{
            placa: 'IYZ2095',
            motorista: 'Dionatan Fagundes'
        }, {
            placa: 'ITP8189',
            motorista: 'Lucas Soares'
        }, {
            placa: 'IYM1E52',
            motorista: 'Jardel'
        }, {
            placa: 'IUW3805',
            motorista: 'Atila Nunes',
        }, {
            placa: 'IYQ0903',
            motorista: 'Tiago Michelon',
        }, {
            placa: 'IVE4409',
            motorista: 'Lucas de Borba',
        }, {
            placa: 'IVE4407',
            motorista: 'Adriano',
        }, {
            placa: 'IWA1721',
            motorista: 'Douglas Pundrich',
        }, {
            placa: 'IWA2513',
            motorista: 'Juliano'
        }, {
            placa: 'IWE6580',
            motorista: 'Logistica - SM'
        }, {
            placa: 'IWH5879',
            motorista: 'Mauro'
        }, {
            placa: 'IWY0778',
            motorista: 'Oficina',
        }, {
            placa: 'IWX5883',
            motorista: 'Gilson'
        }, {
            placa: 'IXW7893',
            motorista: 'Lucas Soares'
        }, {
            placa: 'IYZ2074',
            motorista: 'Jarli'
        }, {
            placa: 'IZN8B08',
            motorista: 'Logistica - POA'
        }, {
            placa: 'IZL7A32',
            motorista: 'Marcio'
        }, {
            placa: 'IZL9E79',
            motorista: 'Davi Mengue'
        }, {
            placa: 'IZL9E60',
            motorista: 'Edson'
        }, {
            placa: 'IYQ0935',
            motorista: 'Cristiano'
        }, {
            placa: 'IZI7J24',
            motorista: 'Gol'
        }];

        for(let i = 0; i < content.length; i++){
            for(let j = 0; j < motoristas.length; j++){
                if(content[i].placa === motoristas[j].placa){
                    content[i].motorista = motoristas[j].motorista;
                }
            }
        }
        return content;
    }
}

export default robot;