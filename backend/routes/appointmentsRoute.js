//requiring the necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// Define routes for the appointemnts resource
const appointmentsRoute = express.Router();

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
//this endpoint gets all appointments from the database
appointmentsRoute.get('/', (req, res) => {
    pool.query('SELECT * FROM public.appointments ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).json(results.rows)
        }
    });
});

//Get an appointment by ID from the database
appointmentsRoute.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM public.appointments WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).json(results.rows)
        }
    });

});

//Creatse a new appointment
appointmentsRoute.post('/', (req, res) => {
    const { user_id, mechanic_id, appointment_date, vehicle_make, vehicle_model, vehicle_year, vehicle_description } = req.body

    pool.query('INSERT INTO public.appointments (user_id, mechanic_id, appointment_date, vehicle_make, vehicle_model, vehicle_year, vehicle_description) VALUES ($1, $2, $3, $4, $5, $6, $7 ) RETURNING *', [user_id, mechanic_id, appointment_date, vehicle_make, vehicle_model, vehicle_year, vehicle_description], (error, results) => {
        if (error) {
            console.log(error)

        } else if (!user_id ) {
            return res.status(400).json({ error: 'Invalid userId' });
        } else {
            res.status(201).send(`Appoinmtent added with ID: ${results.rows[0].id}`)
        }
    });
});

//gets appointments based on the stored userid
appointmentsRoute.get('/user/:storedUserId', (req, res) => {
     const storedUserId = parseInt(req.params.storedUserId) 
     pool.query('SELECT * FROM public.appointments WHERE "user_id" = $1', [storedUserId], (error, results) => {
        if (error) {
          console.log(error);
         res.status(500).json({ error: 'An error occurred while fetching mechanics' });
        } else {
          res.status(200).json(results.rows);
        }
      });
      
 
 });
 
 //gets appointments based on the stored userid
 appointmentsRoute.get('/mechanic/:storedMechanicId', (req, res) => {
     const storedMechanicId = parseInt(req.params.storedMechanicId)
 
     pool.query('SELECT * FROM public.appointments WHERE "mechanic_id" = $1', [storedMechanicId], (error, results) => {
        if (error) {
          console.log(error);
         res.status(500).json({ error: 'An error occurred while fetching appointments' });
        } else {
          res.status(200).json(results.rows);
        }
      });
      
 
 }); 

 // API endpoint to update the appointment progress and notes in the database
 appointmentsRoute.put('/:appointment_id', (req, res) => {
    const appointment_id = parseInt(req.params.appointment_id);
    const { status, notes } = req.body;
  
    pool.query(
      'UPDATE public.appointments SET status = $1, notes = $2 WHERE id = $3',
      [status, notes, appointment_id],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: 'An error occurred while updating appointment progress' });
        }
        console.log('Received data:', {  status, notes });
        res.status(200).json(`Mechanic modified with ID: ${appointment_id}`); //{ success: true, message: 'Appointment progress and notes updated successfully' }, 
      }
    );
  });
  
//Update an appointment by ID
appointmentsRoute.put('/:id', (req, res) => {
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

// Deletes an appointment by ID
appointmentsRoute.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM public.appointments WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log(error)
        }
        res.status(200).send(`appoinments deleted with ID: ${results.id}`)
    });
});

module.exports = appointmentsRoute;

// Add the appointments router to the app
app.use('/appointments', appointmentsRoute);

/*const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});*/
