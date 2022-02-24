const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }

    async pegaRegistrosAtivos(where = {}) {
        return database[this.nomeDoMoldelo].findAll({ where: { ...where } })
    }

    async pegaTodosOsRegistros(where = {}) {
        return database[this.nomeDoMoldelo].scope('todos').findAll({ where: { ...where } })
    }

    async cancelaPessoaEMatriculas(estudanteId) {
        return database.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({ ativo: false }, estudanteId, { transaction: transacao })
            await this.matriculas.atualizaRegistros({ status: 'cancelado' }, { estudante_id: estudanteId }, { transaction: transacao })
        })
    }

    async apagaPessoaEMatriculas(estudante_id) {
        return database.sequelize.transaction(async transacao => {
            await database[this.nomeDoMoldelo].scope('todos').destroy({ where: { id: estudante_id } }, { transaction: transacao })
            await this.matriculas.apagaRegistros({ estudante_id: estudante_id }, { transaction: transacao })
        })
    }

    async restauraPessoaEMatriculas(estudante_id) {
        return database.sequelize.transaction(async transacao => {
            await super.restauraRegistro(estudante_id, { transaction: transacao })
            await this.matriculas.restauraRegistros({ estudante_id: estudante_id }, { transaction: transacao })
        })
    }

    async pegaPessoaMatriculasAtivas(estudante_id) {
        const pessoa = await super.pegaUmRegistro(estudante_id)

        return await pessoa.getAulasMatriculadas() 
    }

}

module.exports = PessoasServices