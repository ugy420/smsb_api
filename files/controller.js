const queries = require('./queries');
const db = require('../db');

const getUser = (req, res) => {
    db.query(queries.selUser, (error, results) => {
        if (error) throw error;
        if (results && results.length > 0) {
            return res.json(results);  // Show all rows directly
        } else {
            return res.json({ message: "No users found" });
        }
    });
};

module.exports = { getUser };
