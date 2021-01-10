const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./queries')
const port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// CRUD Add, GET, Edit, Delete

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API'})
})

app.get('/streetfighter', db.getStreetfighter)
app.get('/streetfighter/:id', db.getStreetfighterById);
app.post('/streetfighter', db.createStreetfighter);
app.delete('/streetfighter/:id', db.deleteStreetfighterById);
app.put('/streetfighter/:id', db.updateStreetfighterById);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});