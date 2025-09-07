const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/dist')));

app.post('/api', (req, res) => {
  res.json({ status: 200 });
  console.log(req.body);
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});