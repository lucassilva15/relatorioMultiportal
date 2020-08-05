import 'dotenv/config';
import input from './robots/input';
import state from './robots/state';
import login from './robots/login';
import veiculos from './robots/veiculos';
import odometro from './robots/odometro';
import paradas from './robots/paradas';

async function start() {
    try {
        console.log("Iniciado o Orquestrador...");
        await input();
        console.log("Input do usuário finalizado com sucesso, iniciando o login do Multiportal");
        await login();
        console.log("Login finalizado com sucesso, obtendo array de veiculos");
        await veiculos();
        console.log("Array de veiculos obtido, preenchendo odometro");
        await odometro();
        console.log("Odometro obtido com sucesso, iniciando o registro de viagens por veiculo...");
        await paradas();
        console.log("Relatório finalizado com sucesso. ");

        const content = state.load();
        console.dir(content, { depth: null });
    }
    catch (err) {
        console.error(err);
        console.log("Não foi possível concluir com sucesso, verifique o console!");
    }
}

start()