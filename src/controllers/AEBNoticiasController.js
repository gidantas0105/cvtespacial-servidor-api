const { Noticias } = require("../app/models");
const puppeteer = require("puppeteer");
const palavrasChave = require("../infra/palavrasChave");

 
module.exports = {

//exportação da função reproduzir que será usada em rota
async reproduzir (req, res) {
  const browser = await puppeteer.launch({
    headless: true,
  });//criação de um objeto browser
 
  const page = await browser.newPage();
  //abrir pagina do browser criado

  await page.setDefaultNavigationTimeout(0);
  //comando adicionado para anular fechamento do navegador depos do tempo (o scraping demora)
 
  await page.goto("https://www.gov.br/aeb/pt-br/assuntos/noticias");
  //abrir pagina do link
  
  const urls = await page.$$eval("article > div > h2 > a", (el) => {
    return el.map((a) => a.getAttribute("href"));
  });

  const noticias = [];

  for (const url of urls) {
    await page.goto(url);
    await page.waitForSelector("#parent-fieldname-text > div");

    const titulo = await page.$eval("article > h1", (title) => title.innerText); //extração do titulo

    const noticiasRegistradas = await Noticias.findAll();

    let reproduzir = true;

    for (const noticiaRegistrada of noticiasRegistradas) {
      if (noticiaRegistrada.titulo === titulo) {
        reproduzir = false;
        break;
      }
    }

    if (reproduzir === true) {

    const tituloLowCase = titulo.toLowerCase();
    reproduzir = false;

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
}
browser.close(); 
return res.status(200).send(noticias);
}
}