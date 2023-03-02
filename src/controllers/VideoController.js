const jimp = require("jimp");
const { Videos } = require("../app/models");

module.exports = {
    async create(req,res) {
        const { titulo, url, categoria, fonte } = req.body;  

        let imagem = await jimp.read(req.file.path);
        imagem.write(req.file.path);
        imagem = `public/${req.file.filename}`;

        const video = await Videos.create({
            titulo: titulo,
            url: url,
            imagem: imagem,
            categoria: categoria,
            fonte: fonte,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log(video);
        return res.status(201).json(video.id);
    },
    async list(req,res) {
        const videos = await Videos.findAll();   
        return res.status(200).json(videos);     
    },
    async delete(req,res) {
        try{ 
            const id = req.params.id;
            const deleted = await Videos.destroy({ where: { id: id } });
            return res.status(204).send("Vídeo deletado.");
        } catch(error) {
            return res.status(500).send(error.message);
        }
    },
    async update(req,res) {   
        const id = req.params.id;
        const { titulo, url, categoria, fonte } = req.body;
        let imagem = req.file;

        if (imagem == undefined) {
            const updated = await Videos.update({
                titulo: titulo,
                url: url,
                categoria: categoria,
                fonte: fonte,
                updatedAt: new Date()
            }, { 
                where: { id: id } 
            });
            const updatedVideo = await Videos.findOne({ where: { id: id } });
            return res.status(200).json({ Video: updatedVideo });
        }

        imagem = await jimp.read(req.file.path);
        imagem.write(req.file.path);
        imagem = `public/${req.file.filename}`;

        const updated = await Videos.update({
            titulo: titulo,
            url: url,
            imagem: imagem,
            categoria: categoria,
            fonte: fonte,
            updatedAt: new Date()
        }, { 
            where: { id: id } 
        });

        const updatedVideo = await Videos.findOne({ where: { id: id } });
        return res.status(200).json({ Video: updatedVideo });
    },
}
