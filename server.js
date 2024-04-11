const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors'); // Importe o pacote 'cors'

const app = express();
const port = 3000;
app.use(cors()); // Use o middleware 'cors'
app.use(bodyParser.json());

// Rota para buscar por CEP
app.get('/cep/:cep', async (req, res) => {
  const cep = req.params.cep;
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    res.status(500).json({ error: 'Erro ao buscar CEP' });
  }
});

// Rota para buscar estados (UFs)
app.get('/ufs', async (req, res) => {
  try {
    const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar UFs:', error);
    res.status(500).json({ error: 'Erro ao buscar UFs' });
  }
});

// Rota para buscar municípios por UF
app.get('/municipios/:uf', async (req, res) => {
  const uf = req.params.uf;
  try {
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar municípios por UF:', error);
    res.status(500).json({ error: 'Erro ao buscar municípios por UF' });
  }
});

// Rota para buscar por rua
app.get('/rua/:uf/:cidade/:rua', async (req, res) => {
  const { uf, cidade, rua } = req.params;
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar rua:', error);
    res.status(500).json({ error: 'Erro ao buscar rua' });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});
