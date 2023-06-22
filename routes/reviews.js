//requiring the necessary packages at the top of your file:
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// Define routes for the users resource
const reviews = express.Router();
//fixes the error '[Error] Origin http://127.0.0.1:5173 is not allowed by Access-Control-Allow-Origin. Status code: 200'
app.use(cors())
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
//creates new review
reviews.post('/', (req, res) => {
    const { mechanicId, name, newReview} = req.body;
  
    pool.query(
      'INSERT INTO reviews (mechanic_id, name, review) VALUES ($1, $2, $3)',
      [mechanicId, name, newReview],
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: 'An error occurred while creating the review' });
        } else {
          res.status(201).json({ message: 'Review created successfully' });
        }
      }
    );
  });
  

// GETs all reviews for a specific mechanic
reviews.get('/mechanics/:mechanic_id', (req, res) => {
    const mechanic_id = parseInt(req.params.mechanic_id)
  
    pool.query(
      'SELECT * FROM public.reviews WHERE mechanic_id = $1',
      [mechanic_id],
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: 'An error occurred while fetching the reviews' , error});
        } else {
          res.status(200).json(result.rows);
        }
      }
    );
});

 
 

module.exports = reviews;

// Add the users router to the app
app.use('/reviews', reviews);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
