import 'dotenv/config';
import input from './robots/input';
import state from './robots/state';
import login from './robots/login';
import veiculos from './robots/veiculos';
import odomtro from './robots/odometro';

async function start() {
    try {

        await input();
        await login();
        await veiculos();
        await odomtro();

        const content = state.load();
        console.dir(content, { depth: null });
    }
    catch (err) {
        console.log("Não foi possível concluir com sucesso, verifique o console!");
    }
}

start()