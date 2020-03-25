const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

/**
 * Metodos HTTP
 * GET - Busca/lista informação do back-end
 * POST - Cria informação no back-end
 * PUT - Altera informação no back-end
 * DELETE - Deleta informação no back-end
 */

 /**
  * Tipos de parâmetros
  * Query Params - Consulta dados via caminho após o "?" (Filtros, paginação, nome, idade) | "http://localhost:3333/user?page=2&nome=Hudson&idade=30"
  * Route Params - Utilizado para identificar recursos/rota | "http://localhost:3333/user/1" ou "http://localhost:3333/user:id"
  * Request Body - Corpo da requisição, utilizado para criar ou alterar recursos
  */

/**
 * Driver: SELECT * FROM user
 * Query Builder: table('user').select('*').where()
 */