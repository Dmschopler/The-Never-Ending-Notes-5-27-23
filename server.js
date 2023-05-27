const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const routes = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);