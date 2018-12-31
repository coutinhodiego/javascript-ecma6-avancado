import {HttpService} from './HttpService';
import {Negociacao} from '../models/Negociacao';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {ConnectionFactory} from './ConnectionFactory';


export class NegociacaoService {

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoes(){
        return Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()])
                .then(periodos => {
                    let negociacoes = periodos.reduce((dados, periodo)=> dados.concat(periodo), []);
                    return negociacoes;
                })
                .catch(erro => {
                    throw new Error(erro)
                });
            
    }
    
    obterNegociacoesDaSemana(){

            return this._http.get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map( objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            })
            .catch(erro => {
                console.log(erro);
                throw new Error(`Dados da semana nao importados.`)
                
            })

    }

    obterNegociacoesDaSemanaAnterior(){

            return this._http.get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map( objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            })
            .catch(erro => {
                console.log(erro);
                throw new Error(`Dados da semana anterior nao importados.`)                
            })
    }

    obterNegociacoesDaSemanaRetrasada(){

            return this._http.get('negociacoes/retrasada')
            .then( negociacoes => {
                return negociacoes.map( objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            })
            .catch(erro => {
                console.log(erro);
                throw new Error(`Dados da semana retrasada nao importados.`);                
            });
    }

    cadastra(negociacao){
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.add(negociacao))
            .then(() => 'Negociacao adicionada com sucesso!')
            .catch((erro)=> {
                console.log(erro);                
                throw new Error('Nao foi possivel adicionar uma negociacao!')
            });          
        }
        
    lista(){
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);                
                throw new Error('Nao foi possivel obter as negociacoes.');
            })
    }

    apaga(){
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagarBanco())
            .then(() => 'Dados do banco apagados com sucesso!')
            .catch(erro => {
                console.log(erro);                
                throw new Error('Nao foi possivel apagar os dados do banco.')
            })
          
    }

    importa(listaAtual){
        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente)
                    )
                )
            )
            .catch(erro => {
                console.log(erro);            
                throw new Error('Nao foi possivel importar a lista de negociacoes.')
            });
    }
}