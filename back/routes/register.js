// back/routes/user.js
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {Pool} = require("pg");
const dotenv = require("dotenv");

dotenv.config({
  path: '../.env'
})

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASS,
})
pool.connect((err) => {
  if(err){console.log(err)}
  else{console.log('Connect')}
})

router.post('/', async (req, res, ) => {
  try{
    const {name, lastName, personalN, password, email} = req.body;
    const existUserByEmail = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
    const existUserByPersonalN = await pool.query('SELECT * FROM students WHERE personalN = $1', [personalN]);
    
    if (existUserByEmail.rows.length > 0) {
      res.status(400).json({ error: 'Email already exists' });
    } else if (existUserByPersonalN.rows.length > 0) {
      res.status(400).json({ error: 'PersonalN already exists' });
    } else{
    const saltRounds = 5; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
     
    const newUser = await pool.query('INSERT INTO students (personalN, name, lastName, email, password) VALUES ($1, $2, $3, $4, $5)', [personalN, name, lastName, email, hashedPassword])

      res.status(201).json(newUser.rows[0])
    }
  } catch (error) {
  console.error('Error during user registration:', error);
  res.status(500).json({ error: 'Internal server error' });
}

  
})

// Add more routes as needed

module.exports = router;
