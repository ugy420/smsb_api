const express = require('express');
const routes = require('./files/routes');
const db = require('./db');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

db.connect((err) => {
    if(err){
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID' + db.threadId);
});

app.post('/login', (req,res) => {
    const sql = "SELECT * FROM user WHERE Email = ? AND Password = ?";
    db.query(sql, [req.body.email, req.body.password], (err,results)=> {
        if(err) return res.json("Error");
        if(results.length > 0) {
            return res.json({message: "Login Successfully", userId: results[0].id});
        }
        else{
            return res.json("Login Failed ");
        }
    });
});

app.post('/signup', (req, res) => {
    const sql = `INSERT INTO User (name, email, phone, password) VALUES (?, ?, ?, ?)`;
    const { name, email, phone, password } = req.body;
    
    db.query(sql, [name, email, phone, password], (err, results) => {
        if (err) {
            return res.json("Error");
        }
        return res.json({ message: "Signup successful", userId: results.insertId });
    });
});

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});