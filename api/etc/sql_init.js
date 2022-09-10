var databaseConnection = require('../handlers/db')
const PWDTool = require("../vars/passwords");
const usersDefaultPassword = "Password1!"


var customerTableQuerys = `CREATE TABLE securityprojectdb.customers (
    customerID int NOT NULL AUTO_INCREMENT,
    lastName varchar(255),
    firstName varchar(255),
    emailAddress varchar(255),
    phoneNumber varchar(255),
    PRIMARY KEY (customerID)
);`

var customersQueries = [
    `INSERT INTO securityprojectdb.customers(lastName,firstName,emailAddress,phoneNumber) VALUES ('Levi','David','david.levi@gmail.com','111-598-4722');`,
    `INSERT INTO securityprojectdb.customers(lastName,firstName,emailAddress,phoneNumber) VALUES ('Avrami','Avi','avi.a@gmail.com','104-432-5183');`,
    `INSERT INTO securityprojectdb.customers(lastName,firstName,emailAddress,phoneNumber) VALUES ('Edri','Shir','Shir2008@gmail.com','519-548-2706');`,
]

var usersTableQuerys = `CREATE TABLE securityprojectdb.users (
    userID int NOT NULL AUTO_INCREMENT,
    userName varchar(255),
    passwordHash varchar(255),
    passwordSalt varchar(255),
    lastName varchar(255),
    firstName varchar(255),
    emailAddress varchar(255),
    PRIMARY KEY (userID)
);`

var passwordHistoryTableQuery = `CREATE TABLE securityprojectdb.passwordHistory (
    passwordId int NOT NULL AUTO_INCREMENT,
    userName varchar(255),
    passwordHash varchar(255),
    passwordSalt varchar(255),
    created datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (passwordId)
);
`

var forgetPasswordTableQuery = `CREATE TABLE securityprojectdb.forgetPassword (
    userName varchar(255) NOT NULL,
    PincodeHash varchar(255),
    PincodeSalt varchar(255),
    PRIMARY KEY (userName)
);`



console.log("-----------------------------------------------------\n            Initialization of Database:\n-----------------------------------------------------")

console.log("cleaning up:")

databaseConnection.query("DROP TABLE IF EXISTS customers")
console.log("   'customers' table has been droped!")

databaseConnection.query("DROP TABLE IF EXISTS passwordHistory")
console.log("   'passwordHistory' table has been droped!")

databaseConnection.query("DROP TABLE IF EXISTS forgetPassword")
console.log("   'forgetPassword' table has been droped!")

databaseConnection.query("DROP TABLE IF EXISTS users")
console.log("   'users' table has been droped!")

// databaseConnection.query("DELETE FROM securityprojectdb.sessions")
// console.log("   'sessions' table has been deleted!")

console.log("\n-----------------------------------------------------")


console.log("creating 'customers' table:")
databaseConnection.query(customerTableQuerys)
console.log("   'customers' table has been created!")
console.log("inserting data to 'customers' table:")

customersQueries.forEach( query =>
    databaseConnection.query(query)
)
console.log("   data has been inserted to 'customers' table!")


console.log("\n-----------------------------------------------------")
console.log("creating 'passwordHistory' table:")
databaseConnection.query(passwordHistoryTableQuery)
console.log("   'passwordHistory' table has been created!")

console.log("\n-----------------------------------------------------")
console.log("creating 'forgetPassword' table:")
databaseConnection.query(forgetPasswordTableQuery)
console.log("   'passwordHistory' table has been created!")



console.log("\n-----------------------------------------------------")
console.log("creating 'users' table:")
databaseConnection.query(usersTableQuerys)
console.log("   'users' table has been created!")
console.log("inserting data to 'users' table:")

var passRes = PWDTool.calculateHmacAndSalt(usersDefaultPassword)
var passwordHash = passRes.hmac
var passwordSalt = passRes.salt

databaseConnection.query(`INSERT INTO securityprojectdb.users(userName,passwordHash,passwordSalt,lastName,firstName,emailAddress) VALUES ('admin','${passwordHash}','${passwordSalt}','User','Administrative','admin.comm@gmail.com')`)
PWDTool.archivePassword('admin',passwordHash,passwordSalt)

console.log("   data has been inserted to 'users' table!")

console.log("-----------------------------------------------------\n         Database Initialization Completed!\n-----------------------------------------------------")
