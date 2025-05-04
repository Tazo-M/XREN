const express = require('express');
const app = express();
const port = 4000;

// GET 
app.get('/api/cats', (req, res) => {
  res.send('😻');
});

// GET WITH JSON
app.get('/api/dog', (req, res) => {
  res.json({
    emoji: '🐶',
    sound: 'woof'
  });
});

// Start server on http://localhost:4000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
