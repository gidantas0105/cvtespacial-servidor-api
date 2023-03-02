const express = require("express")
const routes = require("./routers");
const path = require("path");//importa a lib path
const cors = require("cors");

const corsOptions = {
  exposedHeaders: ["x-access-token"]
};

const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

const uploadDir = "./uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);  
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    console.log("Recebendo arquivo");
    cb(null, true);
  }
});

const app = express();

app.set("upload", upload);
app.set("secret", "CVT-Espacial IFRN 2020");
app.use("/public", express.static("uploads"));
app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    const token = req.headers["x-access-token"];    
    if (token) {      
      console.log("Token com valor " + token);
    } else {
      console.log("Sem token");
    }    
    next();
  });

routes(app);

app.use("*", (req, res) => {
    res.status(404).json({ message: `Rota ${req.originalUrl} não existe!` });
});
  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Erro interno no servidor!" });
});

module.exports = app;

 