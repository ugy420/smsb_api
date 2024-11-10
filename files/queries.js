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


module.exports = 
{
    selGroundId,
    selGrounds,
    selBookings,
    selBookingsbd,
    insBooking
};