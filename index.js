// Importa as bibliotecas
const express = require('express');
const { Pool } = require('pg');

// Cria uma instância do Express
const app = express();

// Middleware para processar requisições no formato JSON
app.use(express.json());

// Configura a conexão com o PostgreSQL
const pool = new Pool({
  user: 'augustosilva',       // Substitua com seu usuário PostgreSQL
  host: 'localhost',         // Pode ser o host do banco de dados (localhost ou IP remoto)
  database: 'user_base',     // Substitua com o nome do seu banco de dados
  password: 'sua_senha',     // Substitua com sua senha do PostgreSQL
  port: 5432,                // O padrão do PostgreSQL é a porta 5432
});

// Verifica se a conexão ao banco de dados está funcionando
pool.connect()
  .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
  .catch(err => console.error('Erro de conexão ao PostgreSQL:', err));

// Rota de exemplo (GET)
app.get('/', (req, res) => {
  res.send('Consultar Clientes: "http://localhost:3000/clientes"');
});

// Rota para consultar o banco de dados
app.get('/clientes', async (req, res) => {
  try {
    // Fazendo uma consulta SQL para retornar todos os clientes
    const result = await pool.query('SELECT * FROM clientes');
    res.status(200).json(result.rows);  // Retorna os dados no formato JSON
  } catch (err) {
    console.error('Erro ao consultar o banco de dados', err);
    res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
  }
});

// Rota para adicionar um cliente ao banco de dados (POST)
app.post('/clientes', async (req, res) => {
  const { nome, email } = req.body; // Dados enviados no corpo da requisição

  // Verifica se os dados necessários foram fornecidos
  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  try {
    // Faz a consulta para inserir um novo cliente no banco de dados
    const result = await pool.query(
      'INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]  // Passa os valores como parâmetros
    );
    
    // Retorna o cliente recém-adicionado
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao adicionar cliente ao banco de dados', err);
    res.status(500).json({ error: 'Erro ao adicionar cliente ao banco de dados' });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});