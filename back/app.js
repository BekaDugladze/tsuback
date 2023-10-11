const express = require("express");
const {Pool} = require("pg");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/register.js');
const morgan = require("morgan");
const session = require('express-session');
const flash = require('connect-flash');
const logIn = require('./routes/login.js')
const jwt = require('jsonwebtoken');
const pgSession = require('connect-pg-simple')(session);
const multer = require('multer');
const fs = require('fs');



const app = express();


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASS,
})


app.use(session({
  name: 'sid',
  secret: 'dcdf987ecfd271297887a83ee8af555dda14724e06ef9bfb0e939bcb008cfc51ae32bdf857a9244dc13e2f093eb524436c59dc5440fbf878061919ba3952123a',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: true,
      secure: false,
      httpOnly: true,
  },
  store: new pgSession({
    pool: pool,
    tableName: 'session'
  }),
}
));
app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200}
  ))
app.use(bodyParser.json());
app.use(morgan('app'));
app.use('/uploads', express.static('uploads'));

const location = path.join(__dirname, '../front');
app.use(express.static(location));



app.use('/', userRoutes);


app.get("/", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students'); // Replace with your table name
    res.json(result.rows); // Send the data as JSON response
  } catch (error) {
    console.error('Error querying the database', error);
    res.status(500).json({ error: 'Internal server error' }); // Handle the error gracefully
  }
});
app.post('/login', async (req, res) => {
  try {
    const { personalN, password } = req.body;
    const checkN = await pool.query('SELECT * FROM students WHERE personaln = $1', [personalN]);

    const user = checkN.rows[0];
    if (!user || !user.password) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    // Assuming there's only one user with the provided personalN
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({ message: 'Password mismatch' });
      return;
    }

    req.session.userid = user.personaln;
    console.log('Session data after login:', req.session);
    res.status(200).json({ message: 'Hi'})
  } catch (err) {
    console.error('Error in authentication:', err);
    res.status(400);
  }
});
app.get('/login', function (req, res) {
  res.send('hi haaa')
})

function requireLogin(req, res, next) {
  if (req.session.userid) {
    // User is logged in, proceed to the next middleware or route handler
    next();
  } else {
    // User is not logged in, send an error response or redirect to a login page
    res.status(401).json({ message: 'Unauthorized' });
  }
}
app.get('/account', requireLogin, async  (req, res) => {
  try {
        const personalN = req.session.userid;
        const name = await pool.query('SELECT * FROM students WHERE personaln = $1', [personalN]) 

        res.status(200).json({name: name.rows[0].name, lastName: name.rows[0].lastname})
  } catch (err) {
    console.error('Error in /account route:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('photo'), async(req, res) => {
  console.log(req.file)
  try {
    // Extract the student ID from the request (you may use req.session.userid or another method)
    const studentId = req.session.userid;
    const photoBuffers = req.file.path;
    // Use parameterized queries to safely insert the data into the database
    const response = await pool.query('INSERT INTO photo (student, photo) VALUES ($1, $2)', [studentId, photoBuffers]);

    res.status(200).json({response});
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/uploaded',  async (req, res) => {
  try {
    // Extract the student ID from the request (you may use req.session.userid or another method)
    const studentId = req.session.userid;
    // Query the database to retrieve the photo for the specified student
    const queryResult = await pool.query('SELECT * FROM photo WHERE student = $1', [studentId]);

    if (queryResult.rows.length === 0) {
      // If no photo is found, return a 404 Not Found response
      res.status(404).json({ error: 'Photo not found' });
    } else {
      // Retrieve the photo data from the query result
      const filePath = queryResult.rows[0].photo
      const absoluteFilePath = path.join(__dirname, filePath);
      // Send the user's photo as a response
      res.sendFile(absoluteFilePath);

    }
  } catch (error) {
    console.error('Error retrieving photo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/profile', async (req, res) => {
  try {
    const personalN = req.session.userid;
    const response = await pool.query('SELECT * FROM students WHERE personalN = $1', [personalN])
    const result = response.rows[0];
    if (result) {
      res.status(200).json({
        name: result.name,
        lastName: result.lastname,
        email: result.email,
        personaln: result.personaln,
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }
  catch (error) {
    console.log(error)
  }
})
app.post('/post', upload.array('postPhoto'), async (req, res) => {
  try{
    console.log(req.files)
    const personalN = req.session.userid;
    const response = await pool.query('SELECT * FROM students WHERE personaln = $1', [personalN]);
    if (response.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    }
    const user = [response.rows[0].name, response.rows[0].lastname];
    const username = user.join(' ');

    const destinationPaths = [];
    req.files.forEach((file) => {
      const originalName = file.originalname;
      const tempPath = file.path;
      const destinationPath = path.join('uploads', originalName); // Define the destination path
      try {
        fs.renameSync(tempPath, destinationPath);
        // Check if the destination file exists after the move
        if (fs.existsSync(destinationPath)) {
          destinationPaths.push(destinationPath);
        } else {
          console.error(`File move failed for ${originalName}`);
        }
      } catch (error) {
        console.error(`Error moving file for ${originalName}:`, error);
      }
    });
    const text = req.body.postText;
    console.log(text);

    const insert = await pool.query('INSERT INTO post (username, userid, photos, posttext) VALUES ($1, $2, $3, $4)', [username, personalN, destinationPaths, text])
    res.status(200).json({insert: insert})
  }
  catch (err) {
    console.log(err);
  }
})
app.get('/post',(req, res) => {
  res.send('hi')
})
app.get('/posted', async (req, res) => {
  try{
    const response = await pool.query('SELECT * FROM post')
    res.status(200).json({ data: response.rows})
    console.log(response.rows)
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
})
app.get('/image/:imageName', (req, res) => {
  const imagePath = path.join(__dirname, 'uploads', req.params.imageName);
  res.sendFile(imagePath);
});

app.get('/logout',  (req, res) => {
  // Clear the session to log the user out
  req.session.destroy(err => {
      if (err) {
          console.error('Error during logout:', err);
          res.status(400).json({ message: 'Logout failed' });
      } else {
          // Redirect the user to the login page or another appropriate page
          res.redirect('/login');
      }
  });
  res.clearCookie()
});








const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

