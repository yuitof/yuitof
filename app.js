const api = require('./api.js')

const serverless = require("serverless-http");
const express = require("express");
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.json());

app.get("/", (req, res, next) => {
  return res.status(200).sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.post("/api", async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await api.sendEmail(req.body);
    console.log(result);
    return res.status(200).json({ message: "Request processed successfully.", result });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Failed (in my application)" });
  }
})

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
