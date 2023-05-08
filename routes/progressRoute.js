//requiring the necessary packages at the top of your file:
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Define routes for the users resource
const progressRoute = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set up a connection to your database by adding the following code to your index.js file:
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mechex',
    password: 'chinelo',
    port: 5432,
});

pool.connect()
    .then(() => console.log('Connected to Postgres database'))
    .catch(err => console.error('Failed to connect to Postgres database', err.stack));



// example route; Define your API endpoints. These are the routes that your client-side code will use to interact with your server and database.
progressRoute.get('/', (req, res) => {
    // Your code to retrieve all users from the database
    res.send('This is the response for GET /users');
});

progressRoute.get('/:id', (req, res) => {
    const userId = req.params.id;
    // Your code to retrieve a user by ID from the database
    res.send(`This is the response for GET /users/${userId}`);
});

// POST /users - Create a new user to be deleted
progressRoute.post('/', (req, res) => {
    // Your code to create a new user in the database
    res.send('This is the response for POST /users');
});

// PUT /users/:id - Update a user by ID
progressRoute.put('/:id', (req, res) => {
    const userId = req.params.id;
    // Your code to update a user by ID in the database
    res.send(`This is the response for PUT /users/${userId}`);
});

// DELETE /users/:id - Delete a user by ID
progressRoute.delete('/:id', (req, res) => {
    const userId = req.params.id;
    // Your code to delete a user by ID from the database
    res.send(`This is the response for DELETE /users/${userId}`);
});

module.exports = progressRoute;

// Add the users router to the app
app.use('/progress', progressRoute);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
