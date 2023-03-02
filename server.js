const http = require("http");
const app = require("./src/config/express");

http.createServer(app).listen(process.env.PORT || 3333, function() {
  console.log(`Servidor escutando na porta: ${this.address().port}`);
});
