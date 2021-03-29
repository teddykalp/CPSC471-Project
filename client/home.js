
// On load
$(function(){

  // When an employee trys to log in
  $("#mgr-button").click(function(e){
    e.preventDefault();
    var empId = $('#mgr-input').val();
    if (empId === ""){
      console.log("Didn't enter a valid Employee ID");
    }
    else{
      //window.location.href = window.location.href.replace("home.html","employee.html");
      var request = "/login/id=" + empId;
      $.ajax({
        type: "GET",
        url: request,
        contentType: 'application/json',
        success: function(response){
          console.log(response[0])
          if (response[0].length == 0){
            $('#emp-error').text("Invalid Employee Number");
          }
          else{
            var employeeData = response[0][0];
            console.log(employeeData);
            if (employeeData["Manager"] == 1 || employeeData["Sub_Manager"] == 1){
              var name = employeeData["First_Name"];
              var id = employeeData["EID"];
              console.log(name);
              console.log(id);
              localStorage.setItem("name", name);
              localStorage.setItem("id", id);
              window.location.href = window.location.href + "manager";
              // console.log("Manager entered")
              }
            else{
              console.log("Employee entered");
              }
            }

          }
        });
    }
  });

});

// if (response === ""){
//   $('#emp-error').text("Invalid Employee Number");
// }
// // on success of logging in
// else{
//   //console.log(window.location.href + "manager");
//   $('#emp-error').hide();
//   if (response["manager"] == true){
//     console.log("Manager Result");
//     console.log(response);
//     window.location.href = window.location.href + "manager"
//   }
//   else{
//     console.log("Employee Result");
//     console.log(response);
//     window.location.href = window.location.href + "employee"
