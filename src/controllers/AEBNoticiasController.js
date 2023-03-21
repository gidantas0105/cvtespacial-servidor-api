const { Noticias } = require("../app/models");
const puppeteer = require("puppeteer");
const palavrasChave = require("../infra/palavrasChave");

 
module.exports = {

async reproduzir (req, res) {
  const browser = await puppeteer.launch({
    headless: true,
  });
 
  const page = await browser.newPage();
 
 
  await page.goto("https://www.gov.br/aeb/pt-br/assuntos/noticias");
  
  const urls = await page.$$eval("article > div > h2 > a", (el) => {
    return el.map((a) => a.getAttribute("href"));
  });

  const noticias = [];

  for (const url of urls) {
    await page.goto(url);
    await page.waitForSelector("#parent-fieldname-text > div");

    const titulo = await page.$eval("article > h1", (title) => title.innerText); 

    const tituloLowCase = titulo.toLowerCase();
    let reproduzir = false;

    for (const palavra of palavrasChave) {
      if (tituloLowCase.indexOf(palavra) != -1) {
        reproduzir = true;
        break;
      }
    }
    if (reproduzir === true) {
      const urlImagem = await page.$eval("img", (image) =>
        image.getAttribute("src")
      ); // seleciona o elemento da imagem e busca o atributo src da imagem, que contém a url da mesma.
      const autor = "Agência Espacial Brasileira";
      const fonte = "Agência Espacial Brasileira";
      const dataHoraPublicacao = await page.$eval("span.value", (data) =>
        data.innerText.split(" ")
      );
      const dataPublicacao = dataHoraPublicacao[0];
      const horaPublicacao = dataHoraPublicacao[1];

      const noticia = await Noticias.create({
        titulo: titulo,
        urlTexto: url,
        urlImagem: urlImagem,
        dataPublicacao: dataPublicacao.toString(),
        horaPublicacao: horaPublicacao,
        autor: autor,
        fonte: fonte,
        createdAt: new Date(),
        updatedAt: new Date()
    });

      noticias.push(noticia);
  }
}
browser.close(); 
return res.status(200).send(noticias);
}
}