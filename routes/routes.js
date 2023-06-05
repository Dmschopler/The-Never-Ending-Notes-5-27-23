const app = require('express').Router();
const randomID = require('uuid');
const { writeFile } = require('fs').promises;
let db = require('../db/db.json');

app.get('/notes', (req, res) => {
    try {
        res.json(db);
    } catch (error) {
        res.status(500).json({ error: 'An error has occured' })
    }
});

app.post('/notes', (req, res) => {
    try {
        let note = {
            title: req.body.title,
            text: req.body.text,
            id: randomID,
        };
        db.push(note);
        writeFile('./db/db.json', JSON.stringify(db))
        .then(() => {
            res.json(db);
        })
        .catch((err) => {
            res.status(500).json({ error: 'An error has occured saving the note' });
        });
    } catch (error) {
        res.status(500).json({ error: 'An error has occured creating the note'});
    }
});

module.exports = app;