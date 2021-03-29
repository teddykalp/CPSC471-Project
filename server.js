var DEBUG = true;

// packages we're going to be using
const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');

// Initialize the app
var app = express();

// Establish the sql connection variables
var mysqlConnection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'work_it',
      multipleStatements: true
});

// Connect to sql
mysqlConnection.connect((err)=> {
  if(!err)
  console.log('Connection Established Successfully');
  else
  console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});


// define the port number we will be connecting to
var PORT = process.env.PORT || 3000;

// Storing all client-side scripts in the ./client folder
app.use(express.static(__dirname + '/client'));
// Using the bodyparser for JSON objects
app.use(bodyparser.json());

// Application will be listening on port 3000
app.listen(PORT, function(){
  console.log("Server listening on Port " + PORT);
});

app.get('/', function(req, res){
    // this a test query, all this does is get all the data from the branch table and print
    // it to the console
    if (DEBUG){
      mysqlConnection.query('SELECT * FROM Branch', (err, rows, fields) => {
        if (!err)
          console.log(rows);
        else
        console.log(err);
      })
    }
    res.sendFile(__dirname + '/index.html');
});

app.get('/manager', function(req,res){
	 res.sendFile(__dirname + '/manager.html');
})

app.get('/crudEmployee', function(req,res){
	 res.sendFile(__dirname + '/crud-employee.html');
})

app.get('/payHistory', function(req,res){
	 res.sendFile(__dirname + '/payHistory.html');
})

app.get('/scheduleManager', function(req,res){
	 res.sendFile(__dirname + '/scheduleManager.html');
})

app.get('/addSchedule', function(req,res){
	 res.sendFile(__dirname + '/addSchedule.html');
})

app.get('/sendNotification', function(req,res){
	 res.sendFile(__dirname + '/notification.html');
})


app.get('/login/id=:id', function(req,res){
  var id = [req.params.id][0];
  var query = 'SELECT * FROM Employee WHERE EID ='.concat(id);
  console.log(query);
  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err){
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
  })
});



// app.get('/employees/:id/:name', function(req,res){
//   console.log("2 Arguments clicked");
//   console.log([req.params.id]);
//   console.log([req.params.name]);
//   res.send(employees);
// });
