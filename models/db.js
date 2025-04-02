// import mysql from "mysql2";
// import dotenv from "dotenv";

// dotenv.config();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,           // localhost ya IP address
//     user: process.env.DB_USER,           // root (ya aapka username)
//     password: process.env.DB_PASSWORD,   // root (ya aapka password)
//     database: process.env.DB_NAME,       // user_db (ya aapka database name)
// });

// db.connect((err) => {
//     if (err) {
//         console.error("Database connection failed:", err);
//         process.exit(1);
//     }
//     console.log("Connected to MySQL database");
// });

// export default db;


import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your database username
  password: 'root', // replace with your database password
  database: 'user_db' // replace with your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

export default connection;