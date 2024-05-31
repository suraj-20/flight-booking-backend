const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

https.createServer().listen(PORT, () => {
  console.log(`HTTPS server running on port ${PORT}`);
});
