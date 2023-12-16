//requiring the necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// Define routes for the mechanics resource
const mechanicsRoute = express.Router();

//fixes the error '[Error] Origin http://127.0.0.1:5173 is not allowed by Access-Control-Allow-Origin. Status code: 200'
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set up a connection to database 
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
//this endpoint gets all mechanics from the database
mechanicsRoute.get('/', (req, res) => {
    pool.query('SELECT * FROM public.mechanics ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(results.rows);
        }
    });
});

  
//get mechanics by their city
  mechanicsRoute.get('/:city', (req, res) => {
     const city = req.params.city
        console.log(city)
 
     pool.query('SELECT * FROM public.mechanics WHERE "city" LIKE $1', [`%${city}%`], (error, results) => {
        if (error) {
          console.log(error);
         res.status(500).json({ error: 'An error occurred while fetching mechanics' });
        } else {
          res.status(200).json(results.rows);
        }
      });
      
 
 }); 

//this endpoint gets a mechanic by their ID
mechanicsRoute.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM public.mechanics WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).json(results.rows)
        }
    });

});

//this endpoint creates a new mechanic 
mechanicsRoute.post('/signups', (req, res) => {
    
    const { name, phone, email, address, city, password, user_type } = req.body
    console.log(name, phone, email, address, password);

    pool.query('INSERT INTO public.mechanics (name, phone, email, address, city, password, user_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [name, phone, email, address, city, password, user_type], (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.status(201).send(`Mechanic added with ID: ${results.rows[0].id}`)
        }
    });
});

// Updates a mechanic by ID
mechanicsRoute.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const { name, phone, email, address, city, user_type } = req.body

    pool.query(
        'UPDATE public.mechanics SET name = $1, phone = $2, email = $3, address = $4, city = $5, password = $6, user_type = $7 WHERE id = $6',
        [name, phone, email, address, city, password,  user_type, id],
        (error, results) => {
            if (error) {
                console.log(error)
            }
            res.status(200).send(`Mechanic modified with ID: ${results.rows[0].id}`)
        }
    );
});

//Deletes a user by ID
mechanicsRoute.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM public.mechanics WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log(error) 
        }
        res.status(200).send(`Mechanic deleted with ID: ${results.id}`)
    });
});

module.exports = mechanicsRoute;

// Add the mechanic router to the app
app.use('/mechanics', mechanicsRoute);

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
