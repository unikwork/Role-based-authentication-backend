const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");
const multer = require('multer');
const upload = multer();
const helmet = require('helmet');
const response = require('./helpers/response');

app.use(upload.any());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes 
app.use('/api/v1', require('./routes/index.route'));

// Error handler
app.use((err, req, res, next) => {
     return response.error(res, 9999, 500)
});

// Not found url
app.use((req, res) => {
     return response.error(res, 9001, 404)
});

module.exports = app;