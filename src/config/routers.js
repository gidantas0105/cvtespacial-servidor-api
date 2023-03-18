const noticiasController = require("../controllers/NoticiasController");
const usuariosController = require("../controllers/UsuarioController");
const fotosController = require("../controllers/FotosController");
const videosController = require("../controllers/VideoController");
const materialDidaticoController = require("../controllers/MaterialDidaticoController");
const administradorController = require("../controllers/AdministradorController");
const praticasController = require("../controllers/PraticasController");
const AEBNoticiasController = require("../controllers/AEBNoticiasController");

const autenticacao = require("../infra/autenticacao");


module.exports = app => {
    app.get("/admin", autenticacao, administradorController.list);
    app.post("/admin", autenticacao, administradorController.create);
    app.post("/admin/login", administradorController.login);
    app.delete("/admin/:id", autenticacao, administradorController.delete);

    app.get("/fotos", autenticacao, fotosController.list);  
    app.post("/fotos", autenticacao, app.get("upload").single("image"),fotosController.create);    
    app.delete("/fotos/:id", autenticacao, fotosController.delete); 
    app.put("/fotos/:id", autenticacao, app.get("upload").single("image"),fotosController.update);  

    app.get("/materiais", autenticacao, materialDidaticoController.list);
    app.post("/materiais", autenticacao, app.get("upload").single("file"), materialDidaticoController.create);
    app.delete("/materiais/:id", autenticacao, materialDidaticoController.delete);
    app.put("/materiais/:id", autenticacao, app.get("upload").single("file"), materialDidaticoController.update);

    app.get("/noticias", autenticacao, noticiasController.list);
    app.get("/noticias/resgatar-da-aeb", AEBNoticiasController.reproduzir);
    app.post("/noticias", autenticacao, noticiasController.create);
    app.delete("/noticias/:id", autenticacao, noticiasController.delete);
    app.put("/noticias/:id", autenticacao, noticiasController.update);

    app.get("/praticas", autenticacao, praticasController.list);
    app.post("/praticas", autenticacao, praticasController.create);
    app.delete("/praticas/:id", autenticacao, praticasController.delete);
    app.put("/praticas/:id", autenticacao, praticasController.update);

    app.post("/usuarios/refresh-token", usuariosController.refreshToken);

    app.get("/videos", autenticacao, videosController.list);
    app.post("/videos", autenticacao, app.get("upload").single("image"), videosController.create);
    app.delete("/videos/:id", autenticacao, videosController.delete);
    app.put("/videos/:id", autenticacao, app.get("upload").single("image"),videosController.update);
};