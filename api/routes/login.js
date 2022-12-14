var express = require("express");
const PWDTool = require("../vars/passwords");
var ExpressBrute = require('express-brute');
var router = express.Router();
var databaseConnection = require("../handlers/db");
var moment = require('moment');

var store = new ExpressBrute.MemoryStore();
const failCallback = (req, res, next, nextValidRequestDate) => {
  res.status(429).send("You've made too many failed attempts in a short period of time, please try again "+moment(nextValidRequestDate).fromNow());
};
const handleStoreError = (error) => {
	log.error(error); 
	throw {
		message: error.message,
		parent: error.parent
	};
};

const userBruteForce = new ExpressBrute(store, {
  freeRetries: 2,
  attachResetToRequest: false,
  refreshTimeoutOnRequest: false,
  minWait: 5*60*1000,
  maxWait: 5*60*1000,
  lifetime: 5*60*1000,
  failCallback: failCallback,
  handleStoreError: handleStoreError
});


router.post("/", userBruteForce.getMiddleware({
  key: (req,res, next) =>{
    next(req.body.username);
  }
}) ,(req, res) => {
  if (req.body.username && req.body.password) {
    //-------------------------------------------------------------------------------------------------------------------------
    // solution to SQL Injection :
    //var SQLQuery = `SELECT passwordHash,passwordSalt FROM users WHERE userName = ?`;
    //results = databaseConnection.query(SQLQuery,[req.body.username])
    //-------------------------------------------------------------------------------------------------------------------------
     results = databaseConnection.query(`SELECT passwordHash,passwordSalt FROM users WHERE userName = '${req.body.username}'`);

    if (results.length != 1) {
      res.status(401).send("Incorrect Username or Password");
    } else {
      // password validation:
      var passwordHash = results[0].passwordHash;
      var passwordSalt = results[0].passwordSalt;
      if (
        PWDTool.validatePassword(req.body.password, passwordHash, passwordSalt)
      ) {
        req.session.IsLoggedin=true;
        req.session.username=req.body.username;
        res.status(200).send("loggin Succeeded!");
        //req.session.user=req.body.username;
      } else {
        res.status(401).send("Incorrect Username or Password");
      }
    }
  } else {
    res
      .status(400)
      .send(
        "One or more parameters are not provided. Required parameters:'username','password'"
      );
  }
});

router.get("/", (req, res) => {
  console.log(req.session.id);
  if (req.session.IsLoggedin === true) {
    res.send({ loggedIn: true,
                username: req.session.username });
  } else {
    res.send({ loggedIn: false });
  }
});

module.exports = router;
