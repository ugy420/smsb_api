const queries = require('./queries');
const db = require('../db');

const getGroundId = (req, res) => {
    const {id} = req.params;

    db.query(queries.selGroundId, [id], (error,results) =>{
        if (error) {
            console.error('Error fetching ground details:', error);
            res.status(500).send('Error fetching ground details');
        } else { 
            res.status(200).json(results); // Send the results back as JSON
        }
    });
};

const getGrounds = (req, res) => {
    db.query(queries.selGrounds, (error, results) => {
        if (error) throw error;
        if (results && results.length > 0) {
            return res.json(results);
        } else {
            return res.json({ message: "No grounds found" });
        }
    });
};

const getBookings = (req, res) => {
    const {id} = req.params;

    db.query(queries.selBookings, [id], (error,results) =>{
        if (error) {
            console.error('Error fetching bookings:', error);
            res.status(500).send('Error fetching bookings');
        } else {
            res.status(200).json(results); // Send the results back as JSON
        }
    });
};

const getBookingsbd = (req,res) => {
    const {id} = req.params;
    const {date} = req.query;

    db.query(queries.selBookingsbd, [id,date], (error, results) =>{
        if (error) {
            console.error('Error fetching bookings by date:', error);
            res.status(500).send('Error fetching bookings by date');
        } else {
            res.status(200).json(results);
        }
    });
};

const posBooking = (req, res) => {
    const { userId, groundId, date, time } = req.body;
    db.query(
        'SELECT * FROM books WHERE user_id = ? AND ground_id = ? AND booking_date = ? AND booking_time = ?',
        [userId, groundId, date, time],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: "An error occurred while checking for duplicates", details: err });
            }
            if (results.length > 0) {
                return res.status(409).json({
                    status: 'duplicate',
                    message: 'This booking already exists. Please select another time or date.',
                });
            }

            db.query(
                queries.insBooking, 
                [userId, groundId, date, time],
                (err, results) => {
                    if (err) {
                        // Handle the error during the insert operation
                        return res.status(500).json({ error: "An error occurred while adding the booking", details: err });
                    }
                    // Send a success response if the booking was added
                    return res.status(200).json({ message: "Booking added successfully" });
                }
            );
        }
    );
};


const getEvents = (req,res) => {
    db.query(queries.getEvents, (error, results) =>{
        if (error) {
            console.error('Error fetching:', error);
            res.status(500).send('Error fetching');
        } else {
            res.status(200).json(results);
        }
    });
};

const getBookingU = (req, res) => {
    const { id } = req.params;

    db.query(queries.selBookingsByUser, [id], (error, results) => {
        if (error) {
            console.error("Error fetching user's bookings:", error);
            res.status(500).send("Error fetching user's bookings");
        } else {
            res.status(200).json(results); // Send the results as JSON
        }
    });
};

const delBooking = (req, res) => {
    const { user_id, ground_id, booking_date, booking_time } = req.body;
    db.query(queries.delBooking, [user_id, ground_id, booking_date, booking_time], (error, result) => {
        if (error) {
          console.error("Error canceling booking:", error);
          res.status(500).send("Error canceling booking");
        } else if (result.affectedRows > 0) {
          res.status(200).json({ success: true, message: 'Booking canceled successfully' });
        } else {
          res.status(404).json({ success: false, message: 'No booking found to cancel' });
        }
      });
};

module.exports = 
{ 
    getGroundId,
    getGrounds,
    getBookings,
    getBookingsbd,
    posBooking,
    getEvents,
    getBookingU,
    delBooking
};
