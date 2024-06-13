const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const port = 3001

const filmesPath = path.join(__dirname, 'filmes.json');
const filmesData = fs.readFileSync(filmesPath, 'utf-8');
const filmes = JSON.parse(filmesData);


function buscarFilme(genero) {
    return filmes.find(filme => filme.genero.toLowerCase() === genero.toLowerCase())
}

app.get('/', (req, res) => {
    const GeneroFilme = req.query.genero
    const FilmeEncontrado = buscarFilme(GeneroFilme);
    var lista = `${JSON.stringify(FilmeEncontrado, null, 2)}`


    let filmTable = ''; 

    filmes.forEach(filme => {



        filmTable += `
        <tr>
            <td>${filme.titulo}</td>
            <td>${filme.ano}</td>
            <td>${filme.diretor}</td>
            <td>${filme.genero}</td>
            <td><img src="${filme.cartaz}" alt="${filme.titulo}" style="max-width: 100px;"></td>
        </tr>
        `;
    });

    const htmlContent = fs.readFileSync('dadosfilme.html', 'utf-8');
    const finalHtml  = htmlContent.replace('{{filmTable}}', filmTable);

    res.send(finalHtml);
});

app.listen(port, () =>{
    console.log(`Servidor iniciado em: http://localhost:${port}`)
})