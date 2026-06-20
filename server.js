const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'src')));

app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Agent Star Rewards running at http://localhost:${PORT}`);
});
