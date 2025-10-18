const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

//connection to sql
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


//show data
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});


//add opertaion
app.post("/api/post", (req, res) => {
    const {name, email, contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db(name, email, contact) VALUES(?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});


//add delete
app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlInsert = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlInsert, id, (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});


//show contact by particular id
app.get("/api/get/:id", (req, res) =>{
    const {id} = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id=?";
    db.query(sqlGet, id, (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

//update the existing contact
app.put("/api/update/:id", (req,res) => {
    const {id} = req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});


//insert data to sql database
app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('Anurag Tiwari', 'Anurag@gmail.com', 9330371115)";
    // db.query(sqlInsert, (error, result) => {
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("Hello Express");
    // })
});

app.listen(8080, (req, res) => {
    console.log("Server is running on port 8080");
});