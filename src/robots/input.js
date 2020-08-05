import prompts from 'prompts';
import state from './state';

async function robot() {

    const content = await askAndReturnDate();

    function askAndReturnDate() {
        const question = [{
            type: 'text',
            name: 'dateTerm',
            message: 'Type a Date from Search in the format DD/MM/AAAA: ',
            validate: value => typeof value === 'string' ? value.trim !== '' : false,
        }];

        return new Promise(async (resolve, reject) => {
            const promptOptions = {
                onCancel: () => reject(new Error('The user has stopped answer')),
            }
            const response = await prompts(question, promptOptions);
            resolve(response);
        })
    }
    state.save(content);
}

export default robot;