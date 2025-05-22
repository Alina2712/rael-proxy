import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

const SUPABASE_URL = 'https://fnwaivfwqcsxfvxfxies.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZud2FpdmZ3cWNzeGZ2eGZ4aWVzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzY1MjI3MywiZXhwIjoyMDYzMjI4MjczfQ.ZjOgb6OT-DMX0nXENfLta57NTbH_jVF5E6zi-NBIF5I';

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
    const response = await fetch(`${SUPABASE_URL}/rest/v1/alina_rael`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.text();
      return res.status(500).json({ status: 'error', detail: errorData });
    }

    const data = await response.json();
    res.status(200).json({ status: 'ok', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.listen(3000, () => {
  console.log('SRL Gateway running on port 3000');
});
