const express = require('express');
const axios = require('axios');
const app = express();

const VERIFY_TOKEN = 'bombardier123'; // TOKENUL ALES DE TINE
const MAKE_WEBHOOK_URL = 'https://hook.make.com/ID_TAU'; // LINKUL TĂU MAKE

app.use(express.json());

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  try {
    await axios.post(MAKE_WEBHOOK_URL, req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error('Eroare la redirecționare:', error.message);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serverul merge pe portul ${PORT}`));
