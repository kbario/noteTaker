// require
const express = require('express');
const path = require('path');

// initialise express app
const app = express();

// define port
const PORT = 3001

// define middleware
app.use(express.static('public'));