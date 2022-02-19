// require
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4 } = require("uuid");
// const req = require('express/lib/request');

// initialise express app
const app = express();

// define port
const PORT = 3001

// define middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get the html files and display them

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html')
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})
// notes
app.get('/api/notes', (req, res) => {
    const dbs = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf-8'));
    const response = {
        status: 'success',
        body: dbs
    };
    console.log(response);
    res.status(200).json(response);
});

app.post('/api/notes', (req, res) => {
    // get the new note sent in body
    const newNote = req.body
    // add a uuid to the new note
    newNote.id = v4()
    // get the existing notes
    const dbs = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf-8'))
    // add the new note to existing
    dbs.push(newNote)
    // save new stuff
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(dbs))
    // return response

    const response = {
        status: 'success',
        body: newNote,
      };
    res.status(201).json(response);
});


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);