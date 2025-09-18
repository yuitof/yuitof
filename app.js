const api = require('./api.js')

const serverless = require('serverless-http');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.get("/contact", (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, 'client/dist', 'index.html'));
})

app.post("/api", async (req, res, next) => {
  try {
    await api.sendEmail(req.body);
    res.status(200).json({ message: "Request processed successfully." });
  } catch (error) {
    res.status(500).json({name: 'Error', message: 'Internal server error'});
  }
})

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

exports.handler = serverless(app);
