const express = require('express');

/**
 * Dev Confessions API
 * A simple Node.js Express API for developers to anonymously post and retrieve confessions.
 */

const app = express();
app.use(express.json());

// Configuration
const PORT = 3000;
const DELETE_TOKEN = 'supersecret123';
const MAX_CONFESSION_LENGTH = 500;
const VALID_CATEGORIES = ["bug", "deadline", "imposter", "vibe-code"];

// In-memory storage for confessions
const confessions = [];
let idCounter = 0;

/**
 * Validates if a category is supported by the API.
 * @param {string} category 
 * @returns {boolean}
 */
const isValidCategory = (category) => VALID_CATEGORIES.includes(category);

/**
 * POST /api/v1/confessions
 * Creates a new confession.
 */
app.post('/api/v1/confessions', (req, res) => {
  const { text, category } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  if (text.length === 0) {
    return res.status(400).json({ error: 'Text cannot be empty' });
  }

  if (text.length > MAX_CONFESSION_LENGTH) {
    return res.status(400).json({ 
      error: `Confession too long. Must be less than ${MAX_CONFESSION_LENGTH} characters.` 
    });
  }

  if (!isValidCategory(category)) {
    return res.status(400).json({ 
      error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}` 
    });
  }

  const newConfession = {
    id: ++idCounter,
    text,
    category,
    createdAt: new Date()
  };

  confessions.push(newConfession);
  console.log(`Added confession ID: ${newConfession.id}`);
  
  res.status(201).json(newConfession);
});

/**
 * GET /api/v1/confessions
 * Retrieves all confessions, sorted by newest first.
 */
app.get('/api/v1/confessions', (req, res) => {
  // Create a copy and sort by date descending
  const sortedConfessions = [...confessions].sort((a, b) => b.createdAt - a.createdAt);
  
  console.log('Fetching all confessions');
  res.json({
    count: sortedConfessions.length,
    data: sortedConfessions
  });
});

/**
 * GET /api/v1/confessions/:id
 * Retrieves a single confession by its ID.
 */
app.get('/api/v1/confessions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const confession = confessions.find(item => item.id === id);

  if (!confession) {
    return res.status(404).json({ error: 'Confession not found' });
  }

  console.log(`Retrieved confession ID: ${id}`);
  res.json(confession);
});

/**
 * GET /api/v1/confessions/category/:cat
 * Retrieves confessions filtered by category.
 */
app.get('/api/v1/confessions/category/:cat', (req, res) => {
  const category = req.params.cat;

  if (!isValidCategory(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const filteredConfessions = confessions
    .filter(item => item.category === category)
    .reverse(); // Newest first for that category

  res.json(filteredConfessions);
});

/**
 * DELETE /api/v1/confessions/:id
 * Deletes a confession by ID. Requires a secret token in headers.
 */
app.delete('/api/v1/confessions/:id', (req, res) => {
  const deleteToken = req.headers['x-delete-token'];

  if (deleteToken !== DELETE_TOKEN) {
    return res.status(403).json({ error: 'Unauthorized: Invalid delete token' });
  }

  const id = parseInt(req.params.id);
  const index = confessions.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Confession not found' });
  }

  const deletedItem = confessions.splice(index, 1)[0];
  console.log(`Deleted confession ID: ${id}`);
  
  res.json({ 
    message: 'Confession deleted successfully', 
    deletedItem 
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Dev Confessions API running on http://localhost:${PORT}`);
});

