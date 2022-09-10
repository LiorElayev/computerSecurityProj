# Cyber Security Project

*This project is a customer managemet web application and REST API for a communication company.

*By design, this application is vulnerable for XSS attacks and SQL injection attacks.


<br />
-Prerequiesits:

*Install mySQL on your machine and create DB called "securityprojectdb".

<br />

-Configuration files:

*Go to /api/config/db.config.js and change the 'PASSWORD' value to your DB password.

*Go to /api/config/transporter.congif.js and change the 'user' and 'pass' to your smtp email credentials.

<br />
-Installing:

*Go to /api directory from the terminal and run the follwoing command:

$ npm install

*Go to /client directory from the terminal and run the follwoing command:

$ npm install


<br />
-Database initialization:

*Go to /api directory from the terminal and run the follwoing command:

$ npm run init

<br />
-Root and server certificates:

*Create a certificates (follow the instructions on https://github.com/FiloSottile/mkcert)

*Copy the certs files to /api directory

<br />
-Starting the Project:

*Go to /api directory from the terminal and run the follwoing command:

$ npm start

*Go to /client directory from the terminal and run the follwoing command:

$ npm start
