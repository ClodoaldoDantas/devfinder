## :satellite: DevFinder

[![author](https://img.shields.io/badge/author-clodoaldodantas-green?style=flat-square)](https://github.com/ClodoaldoDantas)
[![GitHub language count](https://img.shields.io/github/languages/count/clodoaldodantas/devfinder?color=green&style=flat-square)](#)
[![GitHub](https://img.shields.io/github/license/clodoaldodantas/devfinder?color=green&style=flat-square)](#)

Localize desenvolvedores perto de você.

![Tela de Detalhes](layout/tela-listagem.png)

![Tela de Detalhes](layout/tela-cadastro.png)

![Tela de Detalhes](layout/tela-detalhe.png)

## :wrench: Configuração do banco de dados

No diretório `backend`, acesse o arquivo `knexfile.js` e configure a sua base de dados como no exemplo abaixo:

```javascript
development: {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "devfinder"
  },
  migrations: {
    directory: `${__dirname}/src/database/migrations`,
  },
},
```

> é importante configurar corretamente o diretório das **migrations**

## :fire: Instalação

```bash
# backend
$ cd backend
$ npm install
$ npm run dev

# frontend
$ cd frontend
$ npm install
$ npm run serve
```

## :memo: Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
