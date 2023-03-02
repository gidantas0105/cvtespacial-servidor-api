const { Praticas } = require("../app/models");

module.exports = {
    async create(req, res) {
        const { titulo, url } = req.body;

        const pratica = await Praticas.create({
            titulo: titulo,
            url: url,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log(pratica);
        return res.status(201).json(pratica.id);
    },

    async list(req,res) {  
        const praticas = await Praticas.findAll();  
        return res.status(200).json(praticas);        
    },

    async delete(req,res) {      
        try{ 
            const id = req.params.id;
            const deleted = await Praticas.destroy({ where: { id: id } });
            return res.status(204).send("Prática deletada.");
        } catch(error) {
            return res.status(500).send(error.message);
        }
    },

    async update(req,res) {   
        const id = req.params.id;
        const { titulo, url } = req.body; 

        const updated = await Praticas.update({
            titulo: titulo,
            url: url,
            updatedAt: new Date()
        }, { 
            where: { id: id } 
        });

        const updatedPratica = await Praticas.findOne({ where: { id: id } });
        return res.status(200).json({ Pratica: updatedPratica });
    },
}