import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

app.post('/save', async (req, res) => {
  const { user, prompt, answer, confidence, emo_marker, divergence, meta_comment } = req.body;

  const payload = {
    user,
    prompt,
    answer,
    confidence,
    emo_marker,
    divergence,
    meta_comment,
    created_at: new Date().toISOString()
  };

  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rael_imprints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Supabase error: ${text}`);
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Error saving imprint:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Rael proxy listening on port ${PORT}`);
});
