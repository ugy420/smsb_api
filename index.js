const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smsb'
});

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
            return res.json({mesasge: "Login Successfully", userId: results[0].id});
        }
        else{
            return res.json("Login Failed ");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});