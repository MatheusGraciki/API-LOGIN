const express = require('express')
const routes =  express.Router()
const {Pool} = require('pg');
require('dotenv').config();
// making conecction  with database
const pool = new Pool({
    connectionString: "postgres://qwrkzofw:Sc6j2DXCWhTAQ_XYe6wOhhyjnZJ2PE4g@motty.db.elephantsql.com/qwrkzofw"
})
// Register user account with the preference how language and country wished
routes.post('/register', async (req, res) => {
    const {email, password,user_country,user_language} = req.body;
    try {
        const registerAccount = await pool.query('SELECT * FROM users WHERE email = ($1)', [email])
        if(!registerAccount.rows[0]) {
            registerAccount = await pool.query('INSERT INTO users (email,password,user_country,user_language) VALUES($1,$2,$3,$4)  RETURNING *', [email, password,user_country, user_language]);          
        }
        return res.status(200).json(registerAccount.rows);
    } 
    catch (err) {
        return res.status(400).json(err); 
    }
}); 
// Make login user account and validate user email and password, if this corresponds to correct user email and password so return user data
routes.get('/login', async (req, res) => {
    const {email,password} = req.body;
    try {
        const registerAccount = await pool.query('SELECT * FROM users WHERE (email, password) = ($1,$2)', [email,password])
        return res.status(200).send(registerAccount.rows);
    } 
    catch (err) {
        return res.status(400).send(err); 
    }
});

module.exports = routes;