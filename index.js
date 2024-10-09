const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const main = require("./utils/main");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define the async function igual
async function execute(req, res) {
    try {
        const result = await main()
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching data' });
    }
}

// Add the new route
app.get('/tasa-de-cambio', execute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});