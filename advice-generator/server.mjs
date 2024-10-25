const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = 3000;

app.get('/quotes', async (req, res) => {
    try {
        const response = await fetch('https://zenquotes.io/api/quotes');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
