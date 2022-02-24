const Services = require('./Services')
const database = require('../models')

class MatriculasServices extends Services {
    constructor() {
        super('Matriculas')
    }

    async pegaRegistrosPorTurma(turma_id) {
        return database[this.nomeDoMoldelo].findAndCountAll({
            where: {
                turma_id: Number(turma_id),
                status: 'confirmado'
            },
            limit: 20,
            order: [['estudante_id', 'ASC']]
        })
    }

    async pegaUmRegistro(estudante_id, matricula_id) {
        return database[this.nomeDoMoldelo].findOne({
            where: {
                id: matricula_id,
                estudante_id: estudante_id
            }
        })
    }

    async atualizaRegistro(dadosAtualizados, estudante_id, matricula_id) {
        return database[this.nomeDoMoldelo].update(dadosAtualizados, {
            where: {
                id: matricula_id,
                estudante_id: estudante_id
            }
        })
    }

    async apagaRegistro(estudante_id, matricula_id) {
        return database[this.nomeDoMoldelo].destroy({
            where: {
                id: matricula_id,
                estudante_id: estudante_id
            }
        })
    }

    async restauraRegistro(estudante_id, matricula_id) {
        return database[this.nomeDoMoldelo].restore({
            where: {
                id: matricula_id,
                estudante_id: estudante_id
            }
        })
    }

    async pegaEContaRegistros(where = {}, agregadores) {
        return database[this.nomeDoMoldelo].findAndCountAll({
            where: { ...where },
             ...agregadores
            })
    }
}

module.exports = MatriculasServices