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

app.get('/employee', function(req,res){
  res.sendFile(__dirname + '/employee.html');
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
  var call = `CALL EmployeeLogin(${id})`;
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
  var firstname = "\"" + data["First Name"] + "\"";
  var lastname = "\"" + data["Last Name"] + "\"";
  var email = "\"" + data["Email"] + "\"";
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
  var eid = [req.params.id][0];
  var call = `CALL DeleteEmployee(${eid})`
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err){
      console.log("Sent the following data to client");
      console.log(rows);
      res.send("SUCCESS");
    }
    else
      console.log("ERROR");
  });
});

// an an employee to the employee table who is managed by the manager who is adding the employee
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

// verify when employee clocks in, if they are working on a particular day
app.get('/verifySchedule/id=:id&date=:date', function(req,res){
  id = ([req.params.id][0])
  date = "\"" + ([req.params.date][0]) + "\"";
  var query = `SELECT ScheduleID FROM SCHEDULE WHERE EID = ${id} AND DATE = ${date}`
  mysqlConnection.query(query, true, (err, rows, fields) => {
    if (!err){
      console.log("Sent the following data to client");
      res.send(rows[0]);
    }
    else
      console.log(err);
  });
});

// getting schedule for a particular eid
app.get('/getSchedule/id=:id', function (req, res) {
  var id = [req.params.id];
  var call = `CALL getSchedule(${id})`;
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err) {
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
  });
});

// getting schedules for employess managed by a particular eid
app.get('/getEmployeeSchedule/id=:id', function (req, res) {
  var id = [req.params.id];
  var call = `CALL getEmployeeSchedule(${id})`;
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err) {
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
  });
});

// manager adding a schedule entry for an employee
app.post('/addSchedule', function (req, res) {
  var data = req.body;
  var date = "\"" + data["Date"] + "\"";
  var startTime = "\"" + data["Start_Time"] + "\"";
  var endTime = "\"" + data["End_Time"] + "\"";
  var eid = data["EID"];
  var created = data["Created"];

  var call = `CALL addSchedule(${date}, ${startTime}, ${endTime}, ${eid}, ${created})`
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err) {
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
  });
});

// manager updating a schedule entry for an employee
app.put('/updateSchedule', function (req, res) {
  var data = req.body;

  var sid = data["SID"];
  var date = "\"" + data["Date"] + "\"";
  var startTime = "\"" + data["Start_Time"] + "\"";
  var endTime = "\"" + data["End_Time"] + "\"";
  var eid = data["Manager"];


  var call = `CALL updateSchedule(${sid}, ${date}, ${startTime}, ${endTime}, ${eid})`
    console.log(call);
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err) {
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
  });
});

app.get('/payHistory/id=:id', function(req,res){
  var id = [req.params.id][0];
  var call = `CALL GetPayHistory(${id})`
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err) {
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
  });
});

app.post("/sendNotification", function(req, res){
  var data = req.body
  var sid = data["ScheduleID"]
  var eid = data["EmployeeID"]
  var type = "\"" + data["Type"] + "\"";
  var message = "\"" + data["Message"] + "\"";
  var call = `CALL SendNotification(${sid}, ${eid},${type}, 0, ${message})`
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err) {
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
  });
})

app.get('/checkClock/id=:id', function(req,res){
  var id = [req.params.id][0];
  var query = `SELECT * FROM work_it.Clock WHERE EID = ${id} AND Clock_in <> '' AND Clock_out = ''`;
  mysqlConnection.query(query, true, (err, rows, fields) => {
    if (!err) {
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
  });
})

app.post('/clockIn', function(req, res){
  var data = req.body;
  var sid = data["SID"];
  var eid = data["EID"];
  var clockIn = "\"" + data["Clock_in"] + "\"" ;
  var clockOut = "\"" + data["Clock_out"] + "\"";
  var call = `CALL ClockIn(${sid}, ${eid}, ${clockIn}, ${clockOut})`;
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err) {
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
  });
});

app.put("/clockOut", function(req,res){
  var data = req.body;
  var sid = data["SID"];
  var clockOut = "\"" + data["Clock_out"] + "\"";
  var call = `CALL ClockOut(${sid}, ${clockOut})`;
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err) {
      console.log("Sent the following data to client");
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);
  });
})

app.delete("/deleteSchedule/id=:id", function(req,res){
  console.log("DELETE REQUEST");
  var sid = [req.params.id][0];
  var call = `CALL DeleteSchedule(${sid})`
  console.log(call)
  mysqlConnection.query(call, true, (err, rows, fields) => {
    if (!err){
      console.log("Sent the following data to client");
      console.log(rows);
      res.send("SUCCESS");
    }
    else
      res.send("ERROR");
  });
})



// app.get('/employees/:id/:name', function(req,res){
//   console.log("2 Arguments clicked");
//   console.log([req.params.id]);
//   console.log([req.params.name]);
//   res.send(employees);
// });
