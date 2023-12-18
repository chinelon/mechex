//requiring the necessary packages 
/*const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// Define routes for the users resource
const usersRoute = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set up a connection to databasee:
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mechex',
    password: 'chinelo',
    port: 5432,
});
//if database is connected exeecute line 24 or else execute line 25
pool.connect()
    .then(() => console.log('Connected to Postgres database'))
    .catch(err => console.error('Failed to connect to Postgres database', err.stack));

//API Endpoints
//this endpoint gets all users from the database
usersRoute.get('/', (req, res) => {
    //query database
    pool.query('SELECT * FROM public.users ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(Hello)
        } else {
            res.status(200).json(results.rows)
        }
    });
});

//this endpoint gets a user by their ID
usersRoute.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM public.users WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).json(results.rows)
        }
    });

});

//this endpoint creates a new user 
usersRoute.post('/signup', (req, res) => {
    const { username, password, email, phone_no, user_type } = req.body
    console.log(username, password, email, phone_no, user_type);

    pool.query('INSERT INTO public.users (username, password, email, phone_no, user_type) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, password, email, phone_no, user_type], (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.status(201).send(`User added with ID: ${results.rows[0].id}`)
        }
    });
});

// this endpoint updates users information by their id
usersRoute.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const { username, password, email, phone_no } = req.body

    pool.query(
        'UPDATE public.users SET username = $1, password = $2, email = $3, phone_no = $4  WHERE id = $5',
        [username, password, email, phone_no, id],
        (error, results) => {
            if (error) {
                console.log(error)
            }
            res.status(200).send(`User modified with ID: ${id}`)
        }
    );
});

// this endpoint deletes a user by their ID
usersRoute.delete('/:id', (req, res) => {
   
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM public.users WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log(error)
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    });
});

module.exports = 
    usersRoute
;

// Add the users router to the app
app.use('/users', usersRoute);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});*/
