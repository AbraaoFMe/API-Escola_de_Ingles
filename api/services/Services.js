const database = require('../models')

class Services {
    constructor(nomeDoMoldelo) {
        this.nomeDoMoldelo = nomeDoMoldelo
    }

    async pegaTodosOsRegistros() {
        return database[this.nomeDoMoldelo].findAll()
    }

    async pegaUmRegistro(id) {
        return database[this.nomeDoMoldelo].findOne({
            where: {
                id: id
            }
        })
    }

    async criaRegistro(dados) {
        return database[this.nomeDoMoldelo].create(dados)

    }

    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return database[this.nomeDoMoldelo]
            .update(dadosAtualizados, { where: { id: id } }, transacao)
    }

    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
        return database[this.nomeDoMoldelo]
            .update(dadosAtualizados, { where: { ...where } }, transacao)
    }

    async apagaRegistro(id, transacao = {}) {
        return database[this.nomeDoMoldelo]
            .destroy({
                where: {
                    id: id
                }
            }, transacao)
    }

    async apagaRegistros(where, transacao = {}) {
        return database[this.nomeDoMoldelo]
            .destroy({
                where: { ...where }
            }, transacao)
    }

    async restauraRegistro(id, transacao = {}) {
        return database[this.nomeDoMoldelo]
            .restore({
                where: {
                    id: id
                }
            }, transacao)
    }

    async restauraRegistros(where, transacao = {}) {
        return database[this.nomeDoMoldelo]
            .restore({
                where: { ...where }
            }, transacao)
    }
}

module.exports = Services