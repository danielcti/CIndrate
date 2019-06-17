const Filtro = require('../models/Filtro')

module.exports = {
    async index(req,res){
        const filtros = await Filtro.find().sort('andar')

        return res.json(filtros)
    },
    async store(req,res){
        const { bloco, andar, descricao, nivel } = req.body
        const trocaSolicitada = false
        const trocaAceita = false
        const trocaEfetuada = false

        const filtro = await Filtro.create({
            bloco,
            andar,
            descricao,
            nivel,
            trocaSolicitada,
            trocaAceita,
            trocaEfetuada,
        })

        req.io.emit('filtro', filtro)

        return res.json(filtro)
    },
}