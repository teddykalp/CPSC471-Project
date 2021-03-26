var express = require("express");
var app = express();

var employees = [
  {
      id: 2222,
      name: "Teddy",
      manager: true
  },
  {
      id: 2221,
      name: "Rob",
      manager: false
  }
]

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/client'));

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


app.get('/employees', function(req,res){
  res.send(employees);
});

app.get('/employees/:id/', function(req,res){

  //console.log([req.params.id]);
  var result = ""
  for (var i = 0; i < employees.length; i++){
    if (employees[i]["id"] == [req.params.id]){
      console.log(employees[i]["manager"]);
      result = employees[i];
      break;
    }
  }
  res.send(result);
});

// app.get('/employees/:id/:name', function(req,res){
//   console.log("2 Arguments clicked");
//   console.log([req.params.id]);
//   console.log([req.params.name]);
//   res.send(employees);
// });



app.listen(PORT, function(){
  console.log("Server listening on Port " + PORT);
})
