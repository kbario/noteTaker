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

// notes
app.get('/api/notes', (req, res) => {
    const dbs = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf-8'));
    res.json(dbs)
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

app.delete('/api/notes/:id', (req, res) => {
    // get the id
    const id2Go = req.params.id;
    // read db
    const dbs = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf-8'));
    // for each
    const newDb = dbs.filter(element => {
        return element.id !== id2Go
    });
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(newDb));
    res.status(201).json(newDb)
});

// this always comes last just before listen
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);