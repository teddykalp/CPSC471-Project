$(function(){

  let pastColor = '#FF8484';
  let currentColor = '#B0D8A4';

  var name = localStorage.getItem("name");
  var id = localStorage.getItem("id");
  $("#employeeSchedule").hide();
  $('#managerSchedule-btn').hide()

  $("#employeeSchedule-btn").click(function(){
    $("#employeeSchedule").show();
    $("#managerSchedule").hide();
    $('#scheduleHeader').text("My Employees' Schedule");
    $('#managerSchedule-btn').show()
    $("#employeeSchedule-btn").hide()
  })

  $("#managerSchedule-btn").click(function(){
    $("#employeeSchedule").hide();
    $("#managerSchedule").show();
    $('#scheduleHeader').text("My Schedule");
    $('#managerSchedule-btn').hide()
    $("#employeeSchedule-btn").show()
  })

  loadData();


  $(document).on('click', '.edit', function(e){
    var row = $(this).closest("tr"),       // Finds the closest row <tr>
    tds = row.find("td");

    $(this).closest('tr').find('.done').show();

    $(tds[1]).attr("contentEditable", "true")
    $(tds[2]).attr("contentEditable", "true")
    $(tds[3]).attr("contentEditable", "true")
    $(this).hide();
  })

  $(document).on('click', '.done', function(e){
    var row = $(this).closest("tr"),       // Finds the closest row <tr>
    tds = row.find("td");

    $(this).closest('tr').find('.edit').show();

    $(tds[1]).attr("contentEditable", "false")
    $(tds[2]).attr("contentEditable", "false")
    $(tds[3]).attr("contentEditable", "false")

    error = false

    var sid = $(tds[0]).text()
    console.log(sid)
    var date = $(tds[1]).text()
    if (date.length != 10){
      console.log("Improper Date")
      error = true
    }

    var startTime =  $(tds[2]).text()

    if (startTime.length < 10 || startTime.length > 11){
      console.log("Incorrect Start Time")
      error = true
    }
    var endTime = $(tds[3]).text()
    if (endTime.length < 10 || endTime.length > 11){
      console.log("Incorrect End Time")
      error = true
    }

    if (!error){
      var updateJSON = {
        "SID": sid,
        "Date": date,
        "Start_Time": startTime,
        "End_Time": endTime,
        "Manager": id
      }
      console.log(updateJSON);
      updateSchedule(updateJSON);
    }

    $(this).hide();
  })

  $(document).on('click', '.editEmployee', function(e){
    var row = $(this).closest("tr"),       // Finds the closest row <tr>
    tds = row.find("td");

    $(this).closest('tr').find('.doneEmployee').show();


    $(tds[1]).attr("contentEditable", "true")
    $(tds[2]).attr("contentEditable", "true")
    $(tds[3]).attr("contentEditable", "true")

    $(this).hide();
  })

  $(document).on('click', '.doneEmployee', function(e){
    var row = $(this).closest("tr"),       // Finds the closest row <tr>
    tds = row.find("td");

    $(this).closest('tr').find('.editEmployee').show();

    $(tds[1]).attr("contentEditable", "false")
    $(tds[2]).attr("contentEditable", "false")
    $(tds[3]).attr("contentEditable", "false")

    error = false

    var sid = $(tds[0]).text()
    console.log(sid)
    var date = $(tds[1]).text()
    if (date.length != 10){
      console.log("Improper Date")
      error = true
    }

    var startTime =  $(tds[2]).text()

    if (startTime.length < 10 || startTime.length > 11){
      console.log("Incorrect Start Time")
      error = true
    }
    var endTime = $(tds[3]).text()
    if (endTime.length < 10 || endTime.length > 11){
      console.log("Incorrect End Time")
      error = true
    }

    if (!error){
      var updateJSON = {
        "SID": sid,
        "Date": date,
        "Start_Time": startTime,
        "End_Time": endTime,
        "Manager": id
      }
      console.log(updateJSON);
      updateSchedule(updateJSON);
    }

    $(this).hide();
  });

  $(document).on('click', '.delete', function(e){
    if (confirm('Are you sure you want to delete this schedule?')) {
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

  });

  $(document).on('click', '.deleteEmployee', function(e){
    if (confirm('Are you sure you want to delete this schedule?')) {
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

  });

  $(document).on('click', '.sendNotification', function(e){
    $('#sendNotificationModel').modal('show');
  });

  function loadData(){

    var request = "/getSchedule/id=" + id;
    $.ajax({
      type: "GET",
      url: request,
      contentType: 'application/json',
      success: function(response){
        var res = response[0];
        addContents(res);
        }
      });

    var employeeRequest = "/getEmployeeSchedule/id=" + id;
    $.ajax({
      type: "GET",
      url: employeeRequest,
      contentType: 'application/json',
      success: function(response){
        var res = response[0];
        addEmployeeContents(res);
        }
      });
  }

  function updateSchedule(data){
    var jsonData = JSON.stringify(data)
    console.log(jsonData);
    var request = "/updateSchedule"
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
          $('#schedule-msg').text("Successfully Updated Schedule");
          $('#schedule-msg').css("color", "green");
        }
        }
      });
  }

  function addEmployeeContents(data){
    data.forEach((item, i) => {
      var sid = item["ScheduleID"]
      var date = (item["Date"].substring(0,10));
      var start = (item["Start_Time"]);
      var end = (item["End_Time"]);
      var first_name = (item["First_Name"]);
      var last_name = (item["Last_Name"]);
      var dept = (item["Dep_Name"]);
      var color = ""
      var parsedDate = Date.parse(date);
      var today_date = new Date();

      if (parsedDate < today_date){
        color = pastColor;
      }
      else{
        color = currentColor;
      }


      var to_add = `<tr style = "background-color: ${color}"><td>${sid}</td><td>${date}</td><td>${start}</td><td>${end}</td><td>${first_name}</td><td>${last_name}</td><td>${dept}</td><td><button class = "btn editEmployee"><i class="fas fa-edit"></i>Edit</button></td><td><button class = "btn doneEmployee" style = "display: none;"><i class="fas fa-check-square"></i>Done</button></td><td><button class = "btn deleteEmployee"><i class="fas fa-trash-alt"></i>Delete</button></td><td><button class = "btn sendNotification"><i class="fas fa-paper-plane"></i>Send Notification</button></td></tr>`
      $('#empSchedule').append(to_add);
    });

  }


  function addContents(data){
    data.forEach((item, i) => {

        var color = ""
        var id = (item["ScheduleID"]);
        var date = (item["Date"].substring(0,10));
        var start = (item["Start_Time"]);
        var end = (item["End_Time"]);
        var parsedDate = Date.parse(date);
        var today_date = new Date();
        if (parsedDate < today_date){
          color = pastColor;
        }
        else{
          color = currentColor;
        }

        var to_add = `<tr style = 'background-color:${color}'><td>${id}</td><td>${date}</td><td>${start}</td><td>${end}</td><td><button class = "btn btn-dark edit"><i class="fas fa-edit"></i>Edit</button></td><td><button class = "btn done" style = "display: none;"><i class="fas fa-check-square"></i>Done</button></td><td><button class = "btn delete"><i class="fas fa-trash-alt"></i>Delete</button></td></tr>`
        $('#schedTable').append(to_add);



    });
  }
});
