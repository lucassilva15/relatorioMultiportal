import api from '../services/api';
import state from '../robots/state';

async function robot() {
    const content = state.load();

    const response = await api.post('seguranca/logon', {
        username: process.env.USER,
        password: process.env.API_SENHA,
        appid: process.env.APPID,
        token: process.env.TOKEN,
        expiration: process.env.EXPIRATION
    });

    const { status, object } = response.data;
    if (status === 'ERRO') {
        console.log("Unable to log in successfully ");
        return err;
    }

    content.token = object.token;
    state.save(content);
}

export default robot;