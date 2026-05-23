const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

// Initialize dotenv at the top
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Health check route to verify server status
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
}); 

/**
 * AI Chat Route
 * This is where the magic happens.
 */
app.post('/chat', async (req, res) => {

  // TODO: Implement the AI chat route
  try {
    const { messages } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages is required" });
    }

    if (!apiKey) {
      return res.status(500).json({ error: "API key is missing" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: messages
      })
    });

    const data = await response.json();

    if (!response.ok || !data.choices || !data.choices.length) {
      console.error("OpenRouter error response:", JSON.stringify(data));
      return res.status(502).json({ error: data.error?.message || "No response from AI" });
    }

    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
