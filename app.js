const api = require('./api.js')

const serverless = require('serverless-http');
const express = require('express');
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
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
    const result = await api.sendEmail(req.body);
    res.status(200).json({ message: "Request processed successfully." });
  } catch (error) {
    res.status(500).json({name: 'Error', message: 'Internal server error'});
  }
})

app.get("/api/og-image", async (req, res, next) => {
  try {
    const viewport = {
      deviceScaleFactor: 1,
      hasTouch: false,
      height: 630,
      isLandscape: true,
      isMobile: false,
      width: 1200,
    };
    const browser = await puppeteer.launch({
      args: puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
      defaultViewport: viewport,
      executablePath: await chromium.executablePath(),
      headless: "shell",
    });

    const page = await browser.newPage();
    await page.goto(process.env.API_GATEWAY_URL);
    const buffer = await page.screenshot();
    await browser.close();
    console.log(buffer);

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({name: 'Error', message: 'Internal server error'});
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
})

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

exports.handler = serverless(app, {
  binary: ["image/png"]
});
