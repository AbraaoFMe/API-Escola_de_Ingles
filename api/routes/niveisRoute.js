const { Router } = require('express')
const NivelController = require('../controllers/NivelController')

const router = Router()

router
  .get('/niveis', NivelController.pegaTodosOsNiveis)
  .post('/niveis', NivelController.criaNivel)
  .get('/niveis/:id', NivelController.pegaUmNivel)
  .put('/niveis/:id', NivelController.atualizaNivel)
  .delete('/niveis/:id', NivelController.apagaNivel)
  .post('/niveis/:id/restore', NivelController.restauraNivel)

module.exports = router