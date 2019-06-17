const express = require('express')

const FiltroController = require('./controllers/FiltroController')
const TrocaController = require('./controllers/TrocaController')

const routes = new express.Router()

routes.get('/filtros', FiltroController.index)

routes.post('/filtros', FiltroController.store)

routes.post('/filtros/:id/solicita', TrocaController.solicitaTroca)

routes.post('/filtros/:id/aceita', TrocaController.aceitaTroca)

module.exports = routes