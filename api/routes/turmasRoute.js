const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController')

const router = Router()
router
    .get('/turmas', TurmaController.pegaTodasAsTurmas)
    .post('/turmas', TurmaController.criaTurma)
    .get('/turmas/:id', TurmaController.pegaUmaTurma)
    .put('/turmas/:id', TurmaController.atualizaTurma)
    .delete('/turmas/:id', TurmaController.apagaTurma)
    .post('/turmas/:id/restore', TurmaController.restauraTurma)

module.exports = router