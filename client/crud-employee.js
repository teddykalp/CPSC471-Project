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

    // do the server stuff first

    $(tds[1]).attr("contentEditable", "false")
    $(tds[2]).attr("contentEditable", "false")
    $(tds[3]).attr("contentEditable", "false")
    $(tds[4]).attr("contentEditable", "false")
    $(tds[5]).attr("contentEditable", "false")

    var eid = $(tds[0]).text()
    var firstname = $(tds[1]).text()
    var lastname = $(tds[2]).text()
    var email = $(tds[3]).text()
    var phone = $(tds[4]).text()
    var dept = $(tds[5]).text()

    var data ={
      "ID": eid,
      "First Name": firstname,
      "Last Name": lastname,
      "Email": email,
      "Phone": phone,
      "Dept": dept
    }

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
    // on success change the Button
    $(this).closest('tr').find('.edit').show();
    $(this).hide();


  });

  $(document).on('click', '.edit', function(e) {
    $('#search-msg').text("");

    var row = $(this).closest("tr"),       // Finds the closest row <tr>
    tds = row.find("td");
             // Finds all children <td> elements

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
        row.remove();
        console.log(`Deleted the Employee ${eid}`);
    }
    else
    {
        console.log("Cancelled Deletion");
    }

  })

  $(document).on('click', '#confirm-add',function(e){
    var firstname = $('#addEmployeeFirstName').val();
    var lastname = $('#addEmployeeLastName').val();
    var email = $('#addEmployeeEmail').val();
    var phone = $('#addEmployeePhone').val();
    var role = $('input[name="manager"]:checked').val();
    var pay = $('input[name="pay"]:checked').val();
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
    else if (phone === "" || !validatePhone(phone))
    {
      $('#add-error').text('Please enter a valid phone');
    }
    else if(role === "")
    {
      $('#add-error').text('Please select a role');
    }
    else if(pay === "")
    {
      $('#add-error').text('Please select type of pay');
    }
    else if(dept === ""){
      $('#add-error').text('Please enter department number');
    }

    else{
       $('.modal').modal('hide')
       $('.modal-body').find('input:text').val('');
       $('.modal-body').find('input:radio').prop('checked', false);
    }


  })


  $('#clear-btn').click(function(){
    console.log("Clear Clicked")
    $('#searchArea').hide();
  });

  $('#delete-btn').click(function(){
    console.log("Delete Clicked")
  });

  $('#add-btn').click(function(){
    console.log("Add Clicked")
  });

  $('#update-btn').click(function(){
    console.log("Update Clicked")
  });

  function addContents(data){
    data.forEach((item, i) => {
        var eid = (item["EID"]);
        var firstname = (item["First_Name"]);
        var lastname = (item["Last_Name"]);
        var email = (item["Email"]);
        var phone = (item["Phone"]);
        var dept = (item["Dept_Num"]);
        var to_add = `<tr><td>${eid}</td><td>${firstname}</td><td>${lastname}</td><td>${email}</td><td>${phone}</td><td>${dept}</td><td><button class = "edit"><i class="fas fa-edit"></i>Edit</button></td><td><button class = "done" style = "display: none;"><i class="fas fa-check-square"></i>Done</button></td><td><button class = "delete"><i class="fas fa-trash-alt"></i>Delete</button></td></tr>`
        $('#searchTable').append(to_add);
    });
  }

  function loadData(){
    var request = "/getEmployees/id=" + id;
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

  function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(email);
    /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
  }

})
