const { Noticias } = require("../app/models");

module.exports = {
    async create(req, res) {
        const { titulo, urlTexto, urlImagem, dataPublicacao, horaPublicacao, autor, 
            fonte } = req.body;

        const noticia = await Noticias.create({
            titulo: titulo,
            urlTexto: urlTexto,
            urlImagem: urlImagem,
            dataPublicacao: dataPublicacao,
            horaPublicacao: horaPublicacao,
            autor: autor,
            fonte: fonte,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log(noticia);
        return res.status(201).json(noticia.id);
    },
    async list(req,res) {  
        const noticias = await Noticias.findAll();  
        return res.status(200).json(noticias);        
    },
    async delete(req,res) {      
        try{ 
            const id = req.params.id;
            const deleted = await Noticias.destroy({ where: { id: id } });
            return res.status(204).send("Notícia deletada.");
        } catch(error) {
            return res.status(500).send(error.message);
        }
    },
    async update(req,res) {   
        const id = req.params.id;
        const { titulo, urlTexto, urlImagem, dataPublicacao, horaPublicacao, autor, 
            fonte } = req.body; 

        const updated = await Noticias.update({
            titulo: titulo,
            urlTexto: urlTexto,
            urlImagem: urlImagem,
            dataPublicacao: dataPublicacao,
            horaPublicacao: horaPublicacao,
            autor: autor,
            fonte: fonte,
            updatedAt: new Date()
        }, { 
            where: { id: id } 
        });

        const updatedNoticia = await Noticias.findOne({ where: { id: id } });

        console.log(updatedNoticia);

        return res.status(200).json(updatedNoticia);
    },
}