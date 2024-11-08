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

module.exports = 
{ 
    getGroundId,
    getGrounds,
    getBookings,
    getBookingsbd
};
