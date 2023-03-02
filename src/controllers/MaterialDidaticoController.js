const jimp = require("jimp");
const { MateriaisDidaticos } = require("../app/models");

module.exports = {
    async create(req,res){
        const { titulo, categoria } = req.body;
        let arquivo = `public/${req.file.filename}`;

        const materialDidatico = await MateriaisDidaticos.create({
            titulo: titulo,
            categoria: categoria,
            arquivo: arquivo,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log(materialDidatico);
        return res.status(201).json(materialDidatico.id);
    },
    async list(req,res) {    
        const materiaisDidaticos = await MateriaisDidaticos.findAll();
        return res.status(200).json(materiaisDidaticos);    
    },

    async delete(req,res) {
        try{ 
            const id = req.params.id;
            const deleted = await MateriaisDidaticos.destroy({ where: { id: id } });
            return res.status(204).json("Material didático deletado.");
        } catch(error) {
            return res.status(500).send(error.message);
        }   
    },

    async update(req,res){
        const id = req.params.id;
        const { titulo, categoria } = req.body; 
        let arquivo = `public/${req.file.filename}`;

        const updated = await MateriaisDidaticos.update({
            titulo: titulo,
            categoria: categoria,
            arquivo: arquivo,
            updatedAt: new Date()
        }, { 
            where: { id: id } 
        });

        const updatedMaterial = await MateriaisDidaticos.findOne({ where: { id: id } });
        return res.status(200).json({ Material: updatedMaterial });  
    }
}
