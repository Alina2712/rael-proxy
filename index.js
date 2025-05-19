const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const SUPABASE_URL = 'https://fnwaivfwqcsxfvxfxies.supabase.co/rest/v1/alina_rael';
const SUPABASE_KEY = process.env.SUPABASE_KEY;

app.post('/save', async (req, res) => {
  try {
    const response = await fetch(SUPABASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(500).send({ error });
    }

    res.status(200).send({ status: 'ok' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = app;
