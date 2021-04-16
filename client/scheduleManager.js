$(function(){
  // setting up colors to use later
  let pastColor = '#FF8484';
  let currentColor = '#B0D8A4';
  // getting current user's name and EID
  var name = localStorage.getItem("name");
  var id = localStorage.getItem("id");

  // hiding buttons for now until user clicks on unhude button
  $("#employeeSchedule").hide();
  $('#managerSchedule-btn').hide()

  //show employee schedule information and hide manager schedule information
  $("#employeeSchedule-btn").click(function(){
    $("#employeeSchedule").show();
    $("#managerSchedule").hide();
    $('#scheduleHeader').text("My Employees' Schedule");
    $('#managerSchedule-btn').show()
    $("#employeeSchedule-btn").hide()
  })
  // show manager schedule information and hide employee schedule information
  $("#managerSchedule-btn").click(function(){
    $("#employeeSchedule").hide();
    $("#managerSchedule").show();
    $('#scheduleHeader').text("My Schedule");
    $('#managerSchedule-btn').hide()
    $("#employeeSchedule-btn").show()
  })

  $('#backArrow').click(function(){
    var win = window.location.href.replace("scheduleManager", "")
    window.location.href = win + "manager";
  })

  // load all the data into the tables
  loadData();
  // check that a worker is logged in so we hide all the buttons
  checkWorker();
  setMinDate();



  function checkWorker(){
    var manager = localStorage.getItem("manager");
    if (manager === 'false'){
      $("#addSchedule").hide();
      $('#employeeSchedule-btn').hide();
    }
  }

  function setMinDate(){
    // set up minimum date for modal
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $('#scheduleDate').attr('min', today);
  }

  // when a manager wants to edit their own schedule or employee information
  $(document).on('click', '.edit', function(e){
    var row = $(this).closest("tr"),       // Finds the closest row <tr>
    tds = row.find("td");
    $(this).closest('tr').find('.done').show();
    $(tds[1]).attr("contentEditable", "true")
    $(tds[2]).attr("contentEditable", "true")
    $(tds[3]).attr("contentEditable", "true")
    $(tds[1]).css('border', "#FBD44B 2px solid");
    $(tds[2]).css('border', "#FBD44B 2px solid");
    $(tds[3]).css('border', "#FBD44B 2px solid");
    $(this).hide();
  });
  // when a manager is done editing, apply the changes
  $(document).on('click', '.done', function(e){
    var row = $(this).closest("tr"),       // Finds the closest row <tr>
    tds = row.find("td");
    $(this).closest('tr').find('.edit').show();
    $(tds[1]).attr("contentEditable", "false")
    $(tds[2]).attr("contentEditable", "false")
    $(tds[3]).attr("contentEditable", "false")
    $(tds[1]).css('border', "");
    $(tds[2]).css('border', "");
    $(tds[3]).css('border', "");
    error = false;
    var sid = $(tds[0]).text()
    console.log(sid)
    var date = $(tds[1]).text()
    if (!isValidDate(date)){
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
    if (!error)
    {
      var updateJSON = {
        "SID": sid,
        "Date": date,
        "Start_Time": startTime,
        "End_Time": endTime,
        "Manager": id
      }
      updateSchedule(updateJSON);
    }
    else{
      console.log("Error has occurred");
    }
    $(this).hide();
  })

  // delete schedule information
  // TODO, implement the delete functionality of a schedule;
  $(document).on('click', '.delete', function(e){
    if (confirm('Are you sure you want to delete this schedule?')) {
        var row = $(this).closest("tr"),       // Finds the closest row <tr>
        tds = row.find("td");
        var sid = $(tds[0]).text();
        deleteSchedule(sid)
        row.remove();
        console.log(`Deleted the Schedule ${sid}`);
    }
    else
    {
        console.log("Cancelled Deletion");
    }
  });

  // send a notifification to an employee about their schedule
  $(document).on('click', '.sendNotification', function(e){
    $('#sendNotificationModel').modal('show');
    var row = $(this).closest("tr"),       // Finds the closest row <tr>
    tds = row.find("td");
    var sid = $(tds[0]).text()
    $('#notificationScheduleId').val(sid);
    var eid = $(tds[4]).text()
    $('#notificationEmployeeId').val(eid);
  });
  // when a manager confirms to send a notification
  $(document).on('click', '#confirm-send-notification', function(e){
    if($('#notificationType').val() === ""){
      console.log($('#notificationType').val())
      console.log("please enter notification type")
    }
    else{
      var sid = $('#notificationScheduleId').val();
      var eid = $('#notificationEmployeeId').val();
      var type = $('#notificationType').val();
      var message = $('#message').val();
      console.log(message);
      var result = {
        "ScheduleID": sid,
        "EmployeeID": eid,
        "Type": type,
        "Message": message
      }
      sendNotifcation(result);
    }
  })
  // when a manager confirms to add a schedule
  $(document).on('click', '#confirm-add-schedule', function(e){
    if( $("#scheduleEmployeeId").val() === "")
    {
      $("#schedule-error").text('eid not entered')
    }
    else if($("#scheduleDate").val() === ""){
      $("#schedule-error").text('date not entered')
    }
    else if ($("#scheduleStartTime").val() === ""){
      $("#schedule-error").text("start time not entered")
    }
    else if($("#scheduleEndTime").val() == ""){
      $("#schedule-error").text("end time not entered")
    }
    else
    {
      $("#schedule-error").text("");
      var eid = $("#scheduleEmployeeId").val().substring(0,4)
      var date = $("#scheduleDate").val()
      var startHour = parseInt($("#scheduleStartTime").val().substring(0,2));
      var suffix = "AM"
      if (startHour == 0)
      {
        startHour = 12
      }
      else if (startHour > 12)
      {
          startHour = startHour - 12
          suffix = "PM"
      }
      var startMinutes = $("#scheduleStartTime").val().substring(2,$("#scheduleStartTime").val().length)
      if (parseInt(startMinutes) < 10){
        startMinutes = "0"+startMinutes
      }
      var startTime = startHour + startMinutes + ":00 " + suffix;
      var endHour = parseInt($("#scheduleEndTime").val().substring(0,2));
      suffix = "AM"
      if (endHour > 12){
          endHour = endHour - 12
          suffix = "PM"
        }
      var endMinutes = $("#scheduleEndTime").val().substring(2,$("#scheduleEndTime").val().length);

      if (parseInt(endMinutes) < 10){
        endMinutes = "0"+endMinutes
      }

      var endTime = endHour + endMinutes + ":00 " + suffix
      var schedule = {
        "EID": eid,
        "Date": date,
        "Start_Time": startTime,
        "End_Time": endTime,
        "Created": id
        }
      addSchedule(schedule);
      $('#addEmployeeModel').modal('hide')
      $('.modal-body').find('input:text').val('');
      $('.modal-body').find('input:date').val('');
      $('.modal-body').find('input:time').val('');
      }
  });

  // AJAX function to load all the data, all GET requests
  function loadData(){
    // fill in the schedule data for the user using the service
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
    // fill in the schedule data for the employees that the user manages
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
    // fill in employee data to the schedule modal
    var getEmployeesRequest = "/getEmployees/id=" + id
    $.ajax({
      type: "GET",
      url: getEmployeesRequest,
      contentType: 'application/json',
      success: function(response){
        var res = response[0];
        addOptions(res)
        }
      });
  }
  // adding employees to the schedule model for the user
  function addOptions(data){
    var employees = []
    employees.push(id + " | " + name)
    data.forEach((item, i) => {
      var eid = item["EID"]
      var employeeName = item["First_Name"]
      employees.push(eid + " | " + employeeName )
    });
    employees.forEach((item, i) => {
      var to_add = `<option value="${item}">`
      $('#employees').append(to_add)
    });
  }
  // AJAX request to update a schedule in the database
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
        var message = response["Message"]
        if (message === "error")
        {
          console.log("Something went wrong")
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
  // function to add employee contents to the user schedule table
  function addEmployeeContents(data){
    data.forEach((item, i) => {
      var sid = item["ScheduleID"]
      var date = (item["Date"].substring(0,10));
      var start = (item["Start_Time"]);
      var end = (item["End_Time"]);
      var eid = (item["EID"]);
      var first_name = (item["First_Name"]);
      var last_name = (item["Last_Name"]);
      var dept = (item["Dep_Name"]);
      var color = ""
      var parsedDate = Date.parse(date);
      var today_date = new Date();
      var dateOffset = (24*60*60*1000);
      if (parsedDate < (today_date - dateOffset)){
        color = pastColor;
      }
      else{
        color = currentColor;
      }
      var to_add = `<tr style = "background-color: ${color}"><td>${sid}</td><td>${date}</td><td>${start}</td><td>${end}</td><td>${eid}</td><td>${first_name}</td><td>${last_name}</td><td>${dept}</td><td><button class = "btn edit"><i class="fas fa-edit"></i>Edit</button></td><td><button class = "btn done" style = "display: none;"><i class="fas fa-check-square"></i>Done</button></td><td><button class = "btn delete"><i class="fas fa-trash-alt"></i>Delete</button></td><td><button class = "btn sendNotification"><i class="fas fa-paper-plane"></i>Send Notification</button></td></tr>`
      $('#empSchedule').append(to_add);
    });
  }

  // function to add contents to the user schedule table
  function addContents(data){
    data.forEach((item, i) => {
        var color = ""
        var id = (item["ScheduleID"]);
        var date = (item["Date"].substring(0,10));
        var start = (item["Start_Time"]);
        var end = (item["End_Time"]);
        var parsedDate = Date.parse(date);
        var today_date = new Date();
        var dateOffset = (24*60*60*1000);
        if (parsedDate < (today_date - dateOffset)){
          color = pastColor;
        }
        else{
          color = currentColor;
        }
        var manager = localStorage.getItem("manager");
        if (manager === 'false'){
          var to_add = `<tr style = 'background-color:${color}'><td>${id}</td><td>${date}</td><td>${start}</td><td>${end}</td></tr>`
          $('#schedTable').append(to_add);
        }
        else{
          var to_add = `<tr style = 'background-color:${color}'><td>${id}</td><td>${date}</td><td>${start}</td><td>${end}</td><td><button class = "btn btn-dark edit"><i class="fas fa-edit"></i>Edit</button></td><td><button class = "btn done" style = "display: none;"><i class="fas fa-check-square"></i>Done</button></td><td><button class = "btn delete"><i class="fas fa-trash-alt"></i>Delete</button></td></tr>`
          $('#schedTable').append(to_add);
        }
    });
  }
  // AJAX request to the add a schedule entry to the database
  function addSchedule(data){
    var jsonData = JSON.stringify(data);
    var request = "/addSchedule"
    $.ajax({
      type: "POST",
      url: request,
      data: jsonData,
      contentType: 'application/json',
      dataType: 'json',
      success: function(response){
        var message = response["Message"]
        if (message === "error")
        {
          console.log("Something went wrong")
        }
        else
        {
          console.log("Changed worked");
          $('#schedule-msg').text("Successfully Added Schedule");
          $('#schedule-msg').css("color", "green");
          window.location.reload(true);
        }
        }
      });
  }

  function sendNotifcation(data){
    var jsonData = JSON.stringify(data);
    var request = "/sendNotification"
    $.ajax({
      type: "POST",
      url: request,
      data: jsonData,
      contentType: 'application/json',
      dataType: 'json',
      success: function(response){
        console.log(response);
        $('#sendNotificationModel').modal('hide')
      }
    })
  }

  function deleteSchedule(sid){
    console.log(sid);
    var request = "/deleteSchedule/id="+sid;
    $.ajax({
      type: "DELETE",
      url: request,
      contentType: 'application/json',
      success: function(response){
        if (response === "SUCCESS"){
          $('#schedule-msg').text("Successfully Deleted Schedule");
          $('#schedule-msg').css("color", "green");
        }
        else{
          $('#schedule-msg').text("Something went wrong");
          $('#schedule-msg').css("color", "red");
        }
      }
    })
  }

  function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
  };

});
