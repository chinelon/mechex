//requiring the necessary packages at the top of your file:
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//importing routers in index.js
const usersRoute = require('./routes/usersRoute');

app.use('/api/users', usersRoute);

const mechanicsRoute = require('./routes/mechanicsRoute');

app.use('/api/mechanics', mechanicsRoute);

const appointmentsRoute = require('./routes/appointmentsRoute');

app.use('/api/appointments', appointmentsRoute);

const progressRoute = require('./routes/progressRoute');

app.use('/api/progress', progressRoute);

/*Next, add middleware to your application. Middleware is software that lies between an operating 
system and the applications running on it, and is used to manage network resources and other aspects of the system.*/
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
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/signin', (req, res) => {
    res.send('you are signed in!');
});

app.get('/login', (req, res) => {
    res.send('you are logged in!');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
