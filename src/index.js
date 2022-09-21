const express = require('express');
const {Pool} = require('pg');
require('dotenv').config();

const PORT = 3000;


const pool = new Pool({
    connectionString: "postgres://qwrkzofw:Sc6j2DXCWhTAQ_XYe6wOhhyjnZJ2PE4g@motty.db.elephantsql.com/qwrkzofw"
})

const app = express();

app.use(express.json()); 

app.post('/register', async (req, res) => {
    const {email, password,user_country,user_language} = req.body;
    try {
        const registerAccount = await pool.query('SELECT * FROM users WHERE email = ($1)', [email])
        if(!registerAccount.rows[0]) {
            registerAccount = await pool.query('INSERT INTO users (email,password,user_country,user_language) VALUES($1,$2,$3,$4)  RETURNING *', [email, password,user_country, user_language]);
            
        }
        return res.status(200).send(registerAccount.rows);
    } 
    catch (err) {
        return res.status(400).send(err); 
    }
});

app.get('/login', async (req, res) => {
    const {email,password} = req.body;
    try {
        const registerAccount = await pool.query('SELECT * FROM users WHERE (email, password) = ($1,$2)', [email,password])
        return res.status(200).send(registerAccount.rows);
    } 
    catch (err) {
        return res.status(400).send(err); 
    }
});

app.listen(PORT);


