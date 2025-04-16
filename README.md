  Este é um projeto de exemplo que demonstra como criar uma API simples usando Node.js, Express e PostgreSQL. A API permite consultar e adicionar clientes a um banco de dados PostgreSQL.

Funcionalidades
- Consultar clientes: Retorna uma lista de todos os clientes cadastrados.
- Adicionar cliente: Permite adicionar um novo cliente ao banco de dados.

Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- Node.js (v18 ou superior)
- PostgreSQL (v15 ou superior)
- Git (opcional, para clonar o repositório)

Instalação
Clone o repositório (ou baixe o código-fonte):
- git clone git@github.com:Gus-96/API-REST-CRUD.git
- cd API-REST-CRUD

Instale as dependências:
- npm install

Configure o banco de dados:
- Crie um banco de dados no PostgreSQL chamado user_base.
- Crie uma tabela clientes com as colunas id, nome e email:

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

Configure as credenciais do PostgreSQL:
- PG_USER=augustosilva
- PG_DATABASE=user_base
- PG_PASSWORD=sua_senha
  
Inicie o servidor:
- npm start

O servidor estará rodando em http://localhost:3000.

Rotas da API
Consultar todos os clientes
- Método: GET
- URL: /clientes
- Exemplo de resposta:
{
  "id": 3,
  "nome": "Carlos Oliveira",
  "email": "carlos@example.com"
}

Adicionar um novo cliente
- Método: POST
- URL: /clientes
- Corpo da requisição:
{
  "nome": "Augusto Silva ",
  "email": "as.teste@example.com"
}

- Exemplo de resposta:
{
  "id": 2,
  "nome": "Augusto Silva ",
  "email": "as.teste@example.com"
}
