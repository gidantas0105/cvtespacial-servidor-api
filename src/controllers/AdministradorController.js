const jwt = require('jsonwebtoken');
const criptografar = require("../infra/criptografar");
const { Administradores } = require("../app/models");

module.exports = {
    async create(req,res){  
        const { name } = req.body;              
        let { email, senha } = req.body;    
        email = email.toLowerCase();    
        senha = criptografar(senha);
        
        const administrador = await Administradores.create({
            name: name,
            email: email,
            senha: senha,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log(administrador);
        return res.status(201).json(administrador.id);
    },
    async list(req,res) {
        const administradores = await Administradores.findAll();   
        return res.status(200).json(administradores);      
    },
    async login(req,res) {
        try {
            let { email, senha } = req.body;  
            email = email.toLowerCase();   
            const [administrador] = await Administradores.findAll({
                where: {
                    email: email, 
                    senha: senha
                }
            });        
            
            console.log(administrador.dataValues);
            
            if(administrador) {                   
                const token = jwt.sign({administrador}, req.app.get('secret'), {
                    expiresIn: 86400 // segundos, 24h
                });
                res.set('x-access-token', token);
                return res.json(administrador);
            } else {            
                res.status(401).json({ message: "Falha na autenticação do administrador!"});  
            } 
        }
        catch(e) {
            console.error(e);
        }
    },    
    async delete(req,res) {
        try{ 
            const id = req.params.id;
            const deleted = await Administradores.destroy({ where: { id: id } });
            return res.status(204).send("Administrador deletado.");
        } catch(error) {
            return res.status(500).send(error.message);
        }
    },
    async update(req,res) {   
        const id = req.params.id;
        const { name } = req.body;
        let { email, senha } = req.body;
        
        email = email.toLowerCase();    
        senha = criptografar(senha);

        const updated = await Administradores.update({
            name: name,
            email: email,
            senha: senha,
            updatedAt: new Date()
        }, { 
            where: { id: id } 
        });

        const updatedAdministrador = await Administradores.findOne({ where: { id: id } });
        return res.status(200).json({ Administrador: updatedAdministrador });
    },
}