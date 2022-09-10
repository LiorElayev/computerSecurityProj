const express = require('express');
var router = express.Router();
var databaseConnection = require("../handlers/db");
const passwordComplexity = require("joi-password-complexity");
const PWD_CONFIG = require("../config/pwd.config");
const PWDTool = require("../vars/passwords");


router.post('/', (req, res) => {


     if(req.body.username && req.body.password && req.body.emailAddress && req.body.firstName && req.body.lastName){
         //-------------------------------------------------------------------------------------------------------------------------
         // solution to SQL Injection :
         //var SQLQuery = `SELECT userName FROM users WHERE userName = ?`;
         //results = databaseConnection.query(SQLQuery,[req.body.username])
         //-------------------------------------------------------------------------------------------------------------------------
         results = databaseConnection.query(`SELECT userName FROM users WHERE userName = '${req.body.username}'`)
        if(results.length == 0){
            // password validation:
            var passwordValidation = passwordComplexity(PWD_CONFIG).validate(req.body.password)
            var checkDictionary = PWD_CONFIG.dictionary.includes(req.body.password)
            if(passwordValidation.hasOwnProperty('error')){
                var validationMessage = passwordValidation.error.details[0].message
                res.status(400).send(`ValidationErr: ${validationMessage}`)
            }
            else if(checkDictionary){
                res.status(400).send(`Invalid password, please use a different password`)
            }
            else{
                var passRes = PWDTool.calculateHmacAndSalt(req.body.password)
                var passwordHash = passRes.hmac
                var passwordSalt = passRes.salt
                PWDTool.archivePassword(req.body.username,passwordHash,passwordSalt)

                // solution to SQL Injection :
                var SQLQuery = `INSERT INTO securityprojectdb.users(userName,passwordHash,passwordSalt,lastName,firstName,emailAddress) VALUES (?,?,?,?,?,?)`;
                results = databaseConnection.query(SQLQuery,[req.body.username,passwordHash,passwordSalt,req.body.lastName,req.body.firstName,req.body.emailAddress])

                // var results = databaseConnection.query(`INSERT INTO securityprojectdb.users(userName,passwordHash,passwordSalt,lastName,firstName,emailAddress)
                //     VALUES ('${req.body.username}','${passwordHash}','${passwordSalt}','${req.body.lastName}','${req.body.firstName}','${req.body.emailAddress}')`)
                res.status(200).send(`{"userID": ${results.insertId}}`);
            }
        }else{
            
            res.status(400).send(`the user '${req.body.username}' is already exists` + JSON.stringify(results));
        }
    } else{
        res.status(400).send("One or more parameters are not provided. Required parameters:'username','password','emailAddress'");
    }
  });

module.exports = router;


