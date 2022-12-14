var express = require("express");
var router = express.Router();
var databaseConnection = require("../handlers/db");

router.get("/", function (req, res) {
  results = databaseConnection.query("SELECT * FROM customers")
  res.status(200).send(results);
});

router.get("/:customerId", function (req, res) {
  results = databaseConnection.query(`SELECT * FROM customers WHERE customerID = '${req.params.customerId}'`)
  if (results.length == 0) {
    res.sendStatus(404);
  } else {
    res.send(results);
  }
});

router.post("/", function (req, res) {
  if (req.body.lastName && req.body.firstName && req.body.emailAddress && req.body.phoneNumber) {
    databaseConnection.prepare
    var SQLQuery = `INSERT INTO securityprojectdb.customers(lastName,firstName,emailAddress,phoneNumber) VALUES ('${req.body.lastName}','${req.body.firstName}','${req.body.emailAddress}','${req.body.phoneNumber}')`;
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // solution to SQL Injection :
    //var SQLQuery = `INSERT INTO securityprojectdb.customers(lastName,firstName,emailAddress,phoneNumber) VALUES (?,?,?,?)`;
    //results = databaseConnection.query(SQLQuery,[req.body.lastName,req.body.firstName,req.body.emailAddress,req.body.phoneNumber])
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    results = databaseConnection.query(SQLQuery)
    res.send(`{"customerID": ${results.insertId}}`);
  }else{
    res.status(400).send("One or more parameters are not provided. Required parameters:'lastName','firstName','emailAddress','phoneNumber'")
  }
});

module.exports = router;
