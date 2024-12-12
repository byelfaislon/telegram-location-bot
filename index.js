const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Rota para o webhook
app.post('/webhook', (req, res) => {
  const { chat_id, city } = req.body; // Dados enviados pelo site

  if (chat_id && city) {
    const botToken = '7459877062:AAHXAu-hgjifd6Gb1mTuvTDjGD1xiyHX4aM'; // Seu token do bot

    // Enviar a mensagem para o Telegram
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id,
        text: `Olá! Detectamos que você está em ${city}. Bem-vindo(a)!`,
      }),
    })
      .then(() => console.log('Mensagem enviada ao Telegram com sucesso.'))
      .catch((error) => console.error('Erro ao enviar mensagem:', error));
  }

  res.sendStatus(200); // Responder ao Telegram que a solicitação foi recebida
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
