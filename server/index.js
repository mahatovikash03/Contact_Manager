// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const mysql = require("mysql2");
// const cors = require("cors");

// //connection to sql
// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "crud_contact"
// });

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));


// //show data
// app.get("/api/get", (req, res) => {
//     const sqlGet = "SELECT * FROM contact_db";
//     db.query(sqlGet, (error, result) => {
//         res.send(result);
//     });
// });


// //add opertaion
// app.post("/api/post", (req, res) => {
//     const {name, email, contact} = req.body;
//     const sqlInsert = "INSERT INTO contact_db(name, email, contact) VALUES(?, ?, ?)";
//     db.query(sqlInsert, [name, email, contact], (error, result) => {
//         if(error) {
//             console.log(error);
//         }
//     });
// });


// //add delete
// app.delete("/api/remove/:id", (req, res) => {
//     const { id } = req.params;
//     const sqlInsert = "DELETE FROM contact_db WHERE id = ?";
//     db.query(sqlInsert, id, (error, result) => {
//         if(error) {
//             console.log(error);
//         }
//     });
// });


// //show contact by particular id
// app.get("/api/get/:id", (req, res) =>{
//     const {id} = req.params;
//     const sqlGet = "SELECT * FROM contact_db WHERE id=?";
//     db.query(sqlGet, id, (error, result) => {
//         if(error) {
//             console.log(error);
//         }
//         res.send(result);
//     });
// });

// //update the existing contact
// app.put("/api/update/:id", (req,res) => {
//     const {id} = req.params;
//     const {name, email, contact} = req.body;
//     const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
//     db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
//         if(error) {
//             console.log(error);
//         }
//         res.send(result);
//     });
// });


// //insert data to sql database
// app.get("/", (req, res) => {
//     // const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('Anurag Tiwari', 'Anurag@gmail.com', 9330371115)";
//     // db.query(sqlInsert, (error, result) => {
//     //     console.log("error", error);
//     //     console.log("result", result);
//     //     res.send("Hello Express");
//     // })
// });

// app.listen(8080, (req, res) => {
//     console.log("Server is running on port 8080");
// });
















//due to render do this
require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

// Connect to Neon PostgreSQL
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

db.connect()
  .then(() => console.log("✅ Connected to Neon PostgreSQL"))
  .catch(err => console.log("❌ DB Connection Error:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET all contacts
app.get("/api/get", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM contact_db");
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// POST new contact
app.post("/api/post", async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    await db.query(
      "INSERT INTO contact_db(name, email, contact) VALUES($1, $2, $3)",
      [name, email, contact]
    );
    res.send({ message: "Contact added!" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// DELETE contact
app.delete("/api/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM contact_db WHERE id=$1", [id]);
    res.send({ message: "Contact deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// GET contact by ID
app.get("/api/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM contact_db WHERE id=$1", [id]);
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// UPDATE contact
app.put("/api/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    await db.query(
      "UPDATE contact_db SET name=$1, email=$2, contact=$3 WHERE id=$4",
      [name, email, contact, id]
    );
    res.send({ message: "Contact updated!" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
