//requiring the necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');
//uuid4 is used to generate a unique key for our sessionIdentifier 
const { v4: uuidv4 } = require('uuid');

//importing routers in index.js
const usersRoute = require('./routes/usersRoute');
app.use('/api/users', usersRoute);

const mechanicsRoute = require('./routes/mechanicsRoute');
app.use('/api/mechanics', mechanicsRoute);

const appointmentsRoute = require('./routes/appointmentsRoute');
app.use('/api/appointments', appointmentsRoute);

const reviews = require('./routes/reviews');
app.use('/api/reviews', reviews);

/* Middleware is software that lies between an operating system and the applications running on it, and is used to manage network resources and other aspects of the system.*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//connection to databse is setup 
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

//api endpoint for landing page
app.get('/', (req, res) => {
    res.send('Landing Page');
});

/**
When a user or mechanic logs in successfully, a unique session identifier is generated using uuidv4. 
The relevant user or mechanic ID is extracted from the query result, and the session data is stored in the sessions 
object using the session identifier as the key.

The /login endpoint then responds with the success status and the generated session identifier. 
This allows the client-side to store the session identifier in local storage.
 */

// empty object used to store session data when a user logs in
const sessions = {};

//defines post endpoints that handles login requests from the frontend
app.post('/login', async (req, res) => {
  //email and password are extracted from the request sent from frontend
  const { email, password } = req.body;

  try {
    // Query the customers table 
    const userQuery = 'SELECT * FROM public.users WHERE email = $1 AND password = $2';
    const userResult = await pool.query(userQuery, [email, password]);

    if (userResult.rows.length > 0) {
      //if a user is found and they are a customer

      const sessionIdentifier = uuidv4(); // Generate session identifier
      const user_id = userResult.rows[0].id; // Extract user ID from the query result

      // Store the session data
      sessions[sessionIdentifier] = {
        user_id,
        userType: 'customer',
      };
    
      //json response is sent back to the client with the success status, session identifier, user type, and user ID.
      res.json({ success: true, sessionIdentifier, userType: 'customer', user_id });
      return;
    }

    //if the user isnt found in the users table the code gpes to check in the mechanic table using thr code below
    // Query the mechanics table
    const mechanicQuery = 'SELECT * FROM public.mechanics WHERE email = $1 AND password = $2';
    const mechanicResult = await pool.query(mechanicQuery, [email, password]);

    if (mechanicResult.rows.length > 0) {
      //if a user is found and they are a mechanic

      const sessionIdentifier = uuidv4(); // Generate session identifier
      const mechanic_id = mechanicResult.rows[0].id; // Extract mechanic ID from the query result

      // Store the session data
      sessions[sessionIdentifier] = {
        mechanic_id,
        userType: 'mechanic',
      };
      
      //json response is sent back to the client with the success status, session identifier, user type, and mechanic ID.
      res.json({ success: true, sessionIdentifier, userType: 'mechanic', mechanic_id });
      return;
    }

    // if User not found in either table
    res.json({ success: false });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'An error occurred during login' });
  }
});

  
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

const PORT = process.env.PORT || 36608;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

