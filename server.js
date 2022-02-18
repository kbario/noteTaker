// require
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4 } = require("uuid");
const req = require('express/lib/request');

// initialise express app
const app = express();

// define port
const PORT = 3001

// define middleware
app.use(express.static('public'));

// get the html files and display them
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html')
})

// notes
app.get('/api/notes', (req, res) => {
    res.json(__dirname + './db/db.json')
})

app.post('/api/notes', (req, res) => {
    console.log(req.body)
})


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);