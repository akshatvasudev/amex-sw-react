/* eslint no-console: 0 */
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const buffer = fs.readFileSync('./character.json');
const characters = JSON.parse(buffer);
const app = express();
app.use(cors());

app.get('/getCharacters', (req, res) => {
	res.json(characters);
});

app.listen(9000);