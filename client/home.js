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
      $.ajax({
        url: "/employees/"+ empId,
        contentType: 'application/json',
        success: function(response){
          // on failure of logging in
          if (response === ""){
            $('#emp-error').text("Invalid Employee Number");
          }
          // on success of logging in
          else{
            //console.log(window.location.href + "manager");
            $('#emp-error').hide();
            if (response["manager"] == true){
              console.log("Manager Result");
              console.log(response);
              window.location.href = window.location.href + "manager"
            }
            else{
              console.log("Employee Result");
              console.log(response);
              window.location.href = window.location.href + "employee"
            }
          }
        }
      })
    }
  });


});
