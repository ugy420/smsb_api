const selGroundId = 'SELECT * FROM ground WHERE id = ?';

const selGrounds = 'SELECT * FROM ground';

const selBookings = 'SELECT * FROM books WHERE id = ?';

const selBookingsbd = 
`
    SELECT b.booking_time,u.name,u.phone
    FROM books b
    JOIN user u ON b.user_id = u.id
    WHERE ground_id = ? AND booking_date = ?
`;

const insBooking = `INSERT INTO books (user_id, ground_id, booking_date, booking_time) VALUES (?, ?, ?, ?)`; 

const getEvents = 'SELECT * FROM events';

const selBookingsByUser = `
    SELECT b.user_id, b.ground_id, b.booking_date, b.booking_time,g.name
    FROM books b
    JOIN ground g ON b.ground_id = g.id
    WHERE user_id = ?
`;

const delBooking = 'DELETE FROM books WHERE user_id = ? AND ground_id = ? AND booking_date = ? AND booking_time = ?';

module.exports = 
{
    selGroundId,
    selGrounds,
    selBookings,
    selBookingsbd,
    insBooking,
    getEvents,
    selBookingsByUser,
    delBooking
};