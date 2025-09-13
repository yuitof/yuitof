const api = require('./api.js')

const serverless = require("serverless-http");
const express = require("express");
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get("/", (req, res, next) => {
  return res.status(200).sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.post("/api", (req, res, next) => {
  api.sendEmail(req.body);
  return res.status(200);
})

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
