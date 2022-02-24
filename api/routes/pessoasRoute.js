const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
router.post('/pessoas', PessoaController.criaPessoa)

router.get('/pessoas/ativas', PessoaController.pegaTodasAsPessoasAtivas)

router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.delete('/pessoas/:id', PessoaController.apagaPessoa)

router.post('/pessoas/:id/restore', PessoaController.restauraPessoa)

router.post('/pessoas/:estudanteId/matriculas', PessoaController.criaMatricula)
router.get('/pessoas/:estudanteId/matriculas', PessoaController.pegaTodasAsMatriculasAtivas)

router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)

router.get('/pessoas/matricula/:turmaId/confirmado', PessoaController.pegaMatriculasPorTurma)
router.get('/pessoas/matricula/lotada', PessoaController.pegaTurmasLotadas)

router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.pegaUmaMatricula)
router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula)
router.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.apagaMatricula)

router.post('/pessoas/:estudanteId/matriculas/:matriculaId/restore', PessoaController.restauraMatricula)

module.exports = router