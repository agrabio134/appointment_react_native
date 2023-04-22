const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tattoo_appointment',
});

// Test MySQL connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }

  console.log('Connected to MySQL database.');
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query(
    'SELECT * FROM customer WHERE email = ? AND password = ?',
    [email, password],
    (error, results, fields) => {
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).json({ error: 'Server error' });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ error: 'Invalid email and password' });
        return;
      }

      const user = results[0];

      res.json({
        status: { remarks: 'success' },
        payload: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
