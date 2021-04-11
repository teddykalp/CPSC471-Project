$(function(){
  var name = localStorage.getItem("name");
  var id = localStorage.getItem("id");

  console.log(name);
  console.log(id);

  loadData();


  $('#addEmployee').click(function(){
    console.log("Add Clicked");
  });

  $(document).on('click', '.done', function(e) {
    var row = $(this).closest("tr"),       // Finds the closest row <tr>
    tds = row.find("td");



    var eid = $(tds[0]).text()
    var firstname = $(tds[1]).text()
    var lastname = $(tds[2]).text()
    var email = $(tds[3]).text()
    var phone = $(tds[4]).text()
    var dept = $(tds[5]).text()
    console.log(dept);
    var deptNum = parseInt(dept)
    if (firstname === ""){
      $("#search-msg").text("Please enter a valid firstname");
      $('#search-msg').css("color", "red");
    }
    else if (lastname === ""){
      $("#search-msg").text("Please enter a valid lastname");
      $('#search-msg').css("color", "red");
    }
    else if (!validateEmail(email)){
      $("#search-msg").text("Please enter a valid email");
      $('#search-msg').css("color", "red");
    }
    else if (!validatePhone(phone)){
      $("#search-msg").text("Please enter a valid phone number");
      $('#search-msg').css("color", "red");
    }
    else if (!Number.isInteger(deptNum)){
      $("#search-msg").text("Please enter a valid department number");
      $('#search-msg').css("color", "red");
    }
    else
    {
      var data ={
        "ID": eid,
        "First Name": firstname,
        "Last Name": lastname,
        "Email": email,
        "Phone": phone,
        "Dept": dept
      }
      updateEmployee(data);
      // on success change the Button
      $(this).closest('tr').find('.edit').show();
      $(this).hide();


      $(tds[1]).attr("contentEditable", "false")
      $(tds[2]).attr("contentEditable", "false")
      $(tds[3]).attr("contentEditable", "false")
      $(tds[4]).attr("contentEditable", "false")
      $(tds[5]).attr("contentEditable", "false")
    }
  });

    $(document).on('click', '.edit', function(e) {
      $('#search-msg').text("");
      var row = $(this).closest("tr");
      tds = row.find("td");
      $(this).closest('tr').find('.done').show();
      $(tds[1]).attr("contentEditable", "true")
      $(tds[2]).attr("contentEditable", "true")
      $(tds[3]).attr("contentEditable", "true")
      $(tds[4]).attr("contentEditable", "true")
      $(tds[5]).attr("contentEditable", "true")

      $(this).hide();
  });

  // gonna work on this later because has lots of integrity constraints
  $(document).on('click', '.delete', function(e){
    if (confirm('Are you sure you want to delete this employee?')) {
        var row = $(this).closest("tr"),       // Finds the closest row <tr>
        tds = row.find("td");

        var eid = $(tds[0]).text()
        deleteEmployee(eid);
        row.remove();

    }
    else
    {
        console.log("Cancelled Deletion");
    }

  });

  $(document).on('click', '#confirm-add',function(e){
    var firstname = $('#addEmployeeFirstName').val();
    var lastname = $('#addEmployeeLastName').val();
    var email = $('#addEmployeeEmail').val();
    var phone = $('#addEmployeePhone').val();
    var role = $('input[name="manager"]:checked').val();
    var wage = $('#addPay').val();
    var dept = $('#addDepartmentNumber').val();
    $('#add-error').css('color', 'red');

    if (firstname === ""){
      $('#add-error').text('Please enter a first name');
    }
    else if(lastname === ""){
      $('#add-error').text('Please enter a last name');
    }
    else if (email === "" || !validateEmail(email)){
      $('#add-error').text('Please enter a valid email');
    }
    else if (phone === "")
    {
      $('#add-error').text('Please enter a valid phone');
    }
    else if(role === "")
    {
      $('#add-error').text('Please select a role');
    }
    else if (wage === ""){
      $('#add-error').text('Please enter a wage');
    }
    else if(dept === ""){
      $('#add-error').text('Please enter department number');
    }
    else
    {
      var isManager = false;
      var isWorker = false;
      var salary = false
      // what type of role is the employee
      if (role === "manager"){
        isManager = true
      }
      else{
        isWorker = true;
      }

       var employeeToAdd = {
         "Manager EID": localStorage.getItem("id"),
         "EID": 0,
         "First Name": firstname,
         "Last Name": lastname,
         "Email": email,
         "Phone": phone,
         "Salary": salary,
         "Manager": false,
         "Sub_Manager": isManager,
         "Worker": isWorker,
         "Pay": 0,
         "Wage_hr": wage,
         "Branch_id": localStorage.getItem("branch"),
         "Dept_Num": dept,
         "Store_Name": localStorage.getItem("store")
       }

       addEmployee(employeeToAdd);
       window.location.reload(true);
       $('.modal').modal('hide')
       $('.modal-body').find('input:text').val('');
       $('.modal-body').find('input:radio').prop('checked', false);
    }
  })

  $(document).on('click', "#close-menu", function(e){
    console.log("Close clicked");
    $('.modal').modal('hide')
    $('.modal-body').find('input:text').val('');
    $('.modal-body').find('input:radio').prop('checked', false);
  })


  function addContents(data){
    data.forEach((item, i) => {
        var eid = (item["EID"]);
        var firstname = (item["First_Name"]);
        var lastname = (item["Last_Name"]);
        var email = (item["Email"]);
        var phone = (item["Phone"]);
        var dept = (item["Dept_Num"]);
        var to_add = `<tr><td>${eid}</td><td>${firstname}</td><td>${lastname}</td><td>${email}</td><td>${phone}</td><td>${dept}</td><td><button class = "btn edit"><i class="fas fa-edit"></i>Edit</button></td><td><button class = "btn done" style = "display: none;"><i class="fas fa-check-square"></i>Done</button></td><td><button class = "btn delete"><i class="fas fa-trash-alt"></i>Delete</button></td></tr>`
        $('#searchTable').append(to_add);
    });
  }

  function loadData(){
    var request = "/getEmployees/id=" + id;
    console.log("Getting data");
    $.ajax({
      type: "GET",
      url: request,
      contentType: 'application/json',
      success: function(response){
        var res = response[0];
        addContents(res);
        }
      });
  }

  function addEmployee(data){
    jsonData = JSON.stringify(data);
    console.log(jsonData);
    var request = "/addEmployee";
    $.ajax({
      type: "POST",
      url: request,
      data: jsonData,
      contentType: 'application/json',
      dataType: 'json',
      success: function(response){
        console.log(response);
      }
    });
  }

  function updateEmployee(data){
    jsonData = JSON.stringify(data);

    var request = "/updateEmployee";

    $.ajax({
      type: "PUT",
      url: request,
      data: jsonData,
      contentType: 'application/json',
      dataType: 'json',
      success: function(response){
        console.log(response)
        if (response === "error")
        {
          console.log("Something went wrong")
        }
        else if (response["affectedRows"] < 1)
        {
          console.log("Nothing changed")
        }
        else
        {
          console.log("Changed worked");
          $('#search-msg').text("Successfully Updated Employee");
          $('#search-msg').css("color", "green");
        }
      }
    });
  }

  function deleteEmployee(eid){
    var request = "/deleteEmployee/id="+eid
    $.ajax({
      type: "DELETE",
      url: request,
      contentType: 'application/json',
      success: function(response){
        if (response === "SUCCESS"){
          console.log(response)
          $("#search-msg").text("Successfully Deleted Employee");
          $('#search-msg').css("color", "green");
        }
        else{
          $("#search-msg").text("Something went wrong");
          $('#search-msg').css("color", "red");
        }
      }
    })
  }

  function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(email);
  }

  function validatePhone(phone){
    var phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    return phoneReg.test(phone);
  }



})
