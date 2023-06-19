//requiring the necessary packages at the top of your file:
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');
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

/*Next, add middleware to your application. Middleware is software that lies between an operating 
system and the applications running on it, and is used to manage network resources and other aspects of the system.*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

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
    res.send('Landing Page');
});



// In-memory storage for session data
const sessions = {};

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the customers table
    const userQuery = 'SELECT * FROM public.users WHERE email = $1 AND password = $2';
    const userResult = await pool.query(userQuery, [email, password]);

    if (userResult.rows.length > 0) {
      // User is a customer

      const sessionIdentifier = uuidv4(); // Generate session identifier
      const user_id = userResult.rows[0].id; // Extract user ID from the query result

      // Store the session data
      sessions[sessionIdentifier] = {
        user_id,
        userType: 'customer',
      };

      res.json({ success: true, sessionIdentifier, userType: 'customer', user_id });
      return;
    }

    // Query the mechanics table
    const mechanicQuery = 'SELECT * FROM public.mechanics WHERE email = $1 AND password = $2';
    const mechanicResult = await pool.query(mechanicQuery, [email, password]);

    if (mechanicResult.rows.length > 0) {
      // User is a mechanic

      const sessionIdentifier = uuidv4(); // Generate session identifier
      const mechanic_id = mechanicResult.rows[0].id; // Extract mechanic ID from the query result

      // Store the session data
      sessions[sessionIdentifier] = {
        mechanic_id,
        userType: 'mechanic',
      };

      res.json({ success: true, sessionIdentifier, userType: 'mechanic', mechanic_id });
      return;
    }

    // User not found in either table
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

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

/** The code you provided looks correct. It defines the generateSessionId function and uses it within the 
 * /login endpoint to generate a session identifier for each authenticated session. The session data
 * is stored in the sessions object.

When a user or mechanic logs in successfully, a unique session identifier is generated using generateSessionId. 
The relevant user or mechanic ID is extracted from the query result, and the session data is stored in the sessions 
object using the session identifier as the key.

The /login endpoint then responds with the success status and the generated session identifier. 
This allows the client-side to store the session identifier in local storage or a cookie for future authentication.

Please make sure to handle session expiration, session validation, and any necessary security measures 
to protect the session data and prevent unauthorized access.
 */