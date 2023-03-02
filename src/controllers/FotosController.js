const { Fotos } = require("../app/models");

module.exports = {
    async create(req,res) {
        const { titulo, urlImagem, fonte } = req.body;

        const foto = await Fotos.create({
            titulo: titulo,
            urlImagem: urlImagem,
            fonte: fonte,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log(foto);
        return res.status(201).json(foto.id);
    },
    
    async list(req,res) {    
        const fotos = await Fotos.findAll();   
        return res.status(200).json(fotos);      
    },

    async delete(req,res) {
        try{ 
            const id = req.params.id;
            const deleted = await Fotos.destroy({ where: { id: id } });
            return res.status(204).send("Foto deletada.");
        } catch(error) {
            return res.status(500).send(error.message);
        }  
    },

    async update(req,res) {
        const id = req.params.id;
        const { titulo, urlImagem, fonte } = req.body; 

        const updated = await Fotos.update({
            titulo: titulo,
            urlImagem: urlImagem,
            fonte: fonte,
            updatedAt: new Date()
        }, { 
            where: { id: id } 
        });

        const updatedFoto = await Fotos.findOne({ where: { id: id } });
        return res.status(200).json({ Foto: updatedFoto });  
    }
}
