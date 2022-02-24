const Services = require('./Services')
const database = require('../models')

class TurmasServices extends Services {
    constructor() {
        super('Turmas')
    }

    async pegaTodosOsRegistros(where = {}) {
        return database[this.nomeDoMoldelo].findAll({
            where: where
        })
    }
}

module.exports = TurmasServices