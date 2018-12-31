import {currentInstance} from './controllers/NegociacaoController';

let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('.apagaButton').onclick = negociacaoController.apaga.bind(negociacaoController);