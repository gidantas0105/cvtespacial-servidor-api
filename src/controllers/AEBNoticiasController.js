const { Noticias } = require("../app/models");
const puppeteer = require("puppeteer");
const palavrasChave = require("./palavrasChave");
var ultimaAtualizacao;

 
let scrape = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: true,
  });
 
  const page = await browser.newPage();
 
 
  await page.goto("https://www.gov.br/aeb/pt-br/assuntos/noticias");
  
  const urls = await page.$$eval("article > div > h2 > a", (el) => {
    return el.map((a) => a.getAttribute("href"));
  });

  for (const url of urls) {
    await page.goto(url);
    await page.waitForSelector("#parent-fieldname-text > div");
    
    const dataHoraPublicacao = await page.$eval("span.value", (data) =>
        data.innerText.split(" ")
    );
    const dataPublicacao = new Date(dataHoraPublicacao[0]);
    const horaPublicacao = dataHoraPublicacao[1];

    if (ultimaAtualizacao.setDate(d.getDate() + 3) < dataPublicacao) {

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
    console.log(noticia);
}
}
 
  browser.close();
  ultimaAtualizacao = new Date();
  return res.status(200).send(posts);
}
};
 
 
module.exports = scrape;