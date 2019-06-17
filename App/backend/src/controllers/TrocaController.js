const Filtro = require('../models/Filtro')

module.exports = {
    async solicitaTroca(req,res){
        const filtro = await Filtro.findById(req.params.id);

        filtro.trocaSolicitada = true;

        await filtro.save()

        req.io.emit('solicita', filtro)

        return res.json(filtro)
    },
    async aceitaTroca(req,res){
        const filtro = await Filtro.findById(req.params.id);

        filtro.trocaAceita = true;

        await filtro.save()

        req.io.emit('aceita', filtro)

        return res.json(filtro)
    },
}