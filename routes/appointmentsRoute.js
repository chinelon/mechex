//requiring the necessary packages at the top of your file:
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Define routes for the users resource
const appointmentsRoute = express.Router();

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
appointmentsRoute.get('/', (req, res) => {
    /* Your code to retrieve all users from the database
    res.send('This is the response for GET /users');*/
    pool.query('SELECT * FROM public.appointments ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).json(results.rows)
        }
    });
});

// GET /users/:id - Get a user by ID
appointmentsRoute.get('/:id', (req, res) => {
   /* const mechanicId = req.params.id;
     code to retrieve a user by ID from the database
    res.send(`This is the response for GET /users/${userId}`);*/
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM public.appointments WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).json(results.rows)
        }
    });

});

// POST /users - Create a new user to be deleted
appointmentsRoute.post('/', (req, res) => {
    /* Your code to create a new user in the database
    res.send('This is the response for POST /users');*/
    const { appointment_date, vehicle_make, vehicle_model, vehicle_year, vehicle_description } = req.body

    pool.query('INSERT INTO public.appointments (appointment_date, vehicle_make, vehicle_model, vehicle_year, vehicle_description) VALUES ($1, $2) RETURNING *', [appointment_date, vehicle_make, vehicle_model, vehicle_year, vehicle_description], (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.status(201).send(`Appoinmtent added with ID: ${results.rows[0].id}`)
        }
    });
});

// PUT /users/:id - Update a user by ID
appointmentsRoute.put('/:id', (req, res) => {
    /*const userId = req.params.id;
      Your code to update a user by ID in the database
     res.send(`This is the response for PUT /users/${userId}`);*/
    const id = parseInt(req.params.id)
    const { appointment_date, vehicle_make, vehicle_model, vehicle_year, vehicle_description } = req.body

    pool.query(
        'UPDATE public.appointments SET appointment_date =$1 , vehicle_make = $2, vehicle_model = $3, vehicle_year = $4, vehicle_description = $5  WHERE id = $6',
        [appointment_date, vehicle_make, vehicle_model, vehicle_year, vehicle_description, id],
        (error, results) => {
            if (error) {
                console.log(error)
            }
            res.status(200).send(`Mechanic modified with ID: ${results.rows[0].id}`)
        }
    );
});

// DELETE /users/:id - Delete a user by ID
appointmentsRoute.delete('/:id', (req, res) => {
    /*const userId = req.params.id;
    // Your code to delete a user by ID from the database
    res.send(`This is the response for DELETE /users/${userId}`);*/
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM public.appointments WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log(error) 
        }
        res.status(200).send(`appoinments deleted with ID: ${results.id}`)
    });
});

module.exports = appointmentsRoute;

// Add the users router to the app
app.use('/appointments', appointmentsRoute);

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
