const Sequelize = require('sequelize')

const { PessoasServices } = require('../services')
const { MatriculasServices } = require('../services')

const pessoasServices = new PessoasServices()
const matriculasServices = new MatriculasServices()

class PessoaController {
    static async pegaTodasAsPessoasAtivas(req, res) {
        try {
            const todasAsPessoasAtivas = await pessoasServices.pegaRegistrosAtivos()

            return res.status(200).json(todasAsPessoasAtivas)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()

            return res.status(200).json(todasAsPessoas)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params

        try {
            const umaPessoa = await pessoasServices.pegaUmRegistro(id)

            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body

        try {
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa)

            return res.status(201).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res) {
        const novasInfos = req.body
        const { id } = req.params

        try {
            await pessoasServices.atualizaRegistro(novasInfos, Number(id))

            return res.status(204).end()
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params

        try {
            await pessoasServices.apagaPessoaEMatriculas(Number(id))

            return res.status(204).end()
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params

        try {
            await pessoasServices.restauraPessoaEMatriculas(Number(id))

            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params

        try {
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))

            return res.status(200).json({ mensagem: `matrículas ref. ${estudanteId} canceladas` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTodasAsMatriculasAtivas(req, res) {
        const { estudanteId } = req.params

        try {
            const matriculasAtivas = await pessoasServices.pegaPessoaMatriculasAtivas(estudanteId)

            return res.status(200).json(matriculasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        const { turmaId } = req.params

        try {
            const todasAsMatriculas = await matriculasServices.pegaRegistrosPorTurma(turmaId)

            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTurmasLotadas(req, res) {
        const { turmaId } = req.params
        const lotacaoTurma = 2

        try {
            const turmasLotadas = await matriculasServices.pegaEContaRegistros(
                {
                    status: 'confirmado'
                },
                {
                    attributes: ['turma_id'],
                    group: ['turma_id'],
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                })

            return res.status(200).json(turmasLotadas.count)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params

        try {
            const umaMatricula = await matriculasServices.pegaUmRegistro(estudanteId, matriculaId)

            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }

        try {
            const novaMatriculaCriada = await matriculasServices.criaRegistro(novaMatricula)

            return res.status(201).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res) {
        const novasInfos = req.body
        const { estudanteId, matriculaId } = req.params

        try {
            await matriculasServices.atualizaRegistro(novasInfos, estudanteId, matriculaId)

            return res.status(204).end()
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params

        try {
            await matriculasServices.apagaRegistro(estudanteId, matriculaId)

            return res.status(204).end()
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params

        try {
            await matriculasServices.restauraRegistro(estudanteId, matriculaId)

            return res.status(200).json({ mensagem: `id ${matriculaId} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController