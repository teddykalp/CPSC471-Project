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


// on login, query the database for an id the user entered
app.get('/login/id=:id', function(req,res){
  var id = [req.params.id][0];
  //var query = 'SELECT * FROM Employee WHERE EID ='.concat(id);
  var call = `CALL EmployeeLogin(${id})`
  console.log(call);
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err){
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
  });
});

// view all employees for a manager or sub manager
app.get("/getEmployees/id=:id", function(req,res){
  var id = [req.params.id][0];
  console.log(id);
  var call = `CALL ManangeEmployees(${id})`;
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err){
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
  });
});

// update an employee's information
app.put("/updateEmployee", function(req,res){
  var data = req.body
  var id = data["ID"];
  var firstname = "\"" + data["First Name"] + "\"";;
  var lastname = "\"" + data["Last Name"] + "\"";;
  var email = "\"" + data["Email"] + "\"";;
  var phone = "\"" + data["Phone"] + "\"";
  var dept = data["Dept"];
  var call = `CALL UpdateEmployee(${id},${firstname},${lastname},${phone},${email},${dept})`;
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err){
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log("error");
  });
});

// delete an employee from the employee table
app.delete("/deleteEmployee/id=:id", function(req,res){
  var id = [req.params.id][0];
});

app.post("/addEmployee", function(req,res){
  var data = req.body ;
  var manager_id = data["Manager EID"];
  var eid = data["EID"];
  var firstname = "\"" + data["First Name"] + "\"";;
  var lastname = "\"" + data["Last Name"] + "\"";;
  var email = "\"" + data["Email"] + "\"";;
  var phone = "\"" + data["Phone"] + "\"";
  var salary = data["Salary"];
  var is_manager = false
  var is_sub_manager = data["Sub_Manager"];
  var is_worker = data["Worker"];
  var pay = data["Pay"];
  var wage = data["Wage_hr"];
  var branch = data["Branch_id"];
  var dept = data["Dept_Num"];
  var store = "\"" + data["Store_Name"] + "\"";

  var call = `CALL AddEmployee(${manager_id},${eid},${firstname},${lastname},${email},  ${phone},${salary},${is_manager},${is_sub_manager},${is_worker},${pay},${wage}, ${branch},${dept},${store})`;
  console.log(call);
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err){
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
  });


});




// app.get('/employees/:id/:name', function(req,res){
//   console.log("2 Arguments clicked");
//   console.log([req.params.id]);
//   console.log([req.params.name]);
//   res.send(employees);
// });
