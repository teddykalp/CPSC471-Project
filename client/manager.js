$(function(){
  var name = localStorage.getItem("name");
  var id = localStorage.getItem("id");
  var branch = localStorage.getItem("branch");
  var store = localStorage.getItem("store");
  var working = localStorage.getItem("work");

  console.log(name);
  console.log(id);
  console.log(branch);
  console.log(store);

  checkClockedIn();
  checkWorker();

  function checkWorker(){
    var manager = localStorage.getItem("manager");
    if (manager === 'false'){
      $("#crud-btn").hide();
      $('#scheduleMessage').text("View Schedule");
    }
  }

  $('#welcomeName').text(`Welcome ${name}`)

  $("#crud-btn").click(function(){
    var win = window.location.href.replace("manager", "")
    window.location.href = win + "crudEmployee";
  });

  $("#pay-btn").click(function(){
    var win = window.location.href.replace("manager", "")
    window.location.href = win + "payHistory";
  });

  $("#schedule-btn").click(function(){
    var win = window.location.href.replace("manager", "")
    window.location.href = win + "scheduleManager";
  });


  $("#clock-btn").click(function(){

    var today = new Date();
    // year - month - day
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    var str_date = `${year}-${month}-${day}`
    getSchedule(str_date);
  });

  $("#logout").click(function(){
    var win = window.location.href.replace("manager", "")
    window.location.href = win;
  })

  function getSchedule(str_date){
    var url = "/verifySchedule/id="+id+"&date="+str_date
    console.log(url)
    $.ajax({
      type: "GET",
      url: url,
      contentType: 'application/json',
      success: function(response){
        if (response.length != 0){
          clockCheck(response["ScheduleID"]);
        }
        else{
          $('#clockError').text("You're not working today");
          $('#clockError').css('color', 'red');
        }
      }
    });
  }
  // TODO: write a function here and on the server to check if a user has already clocked in or not
  function checkClockedIn(){
    url = "/checkClock/id="+id
    $.ajax({
      type: "GET",
      url: url,
      contentType: 'application/json',
      success: function(response){
        console.log(response);
        if (response.length != 0){
          localStorage.setItem("clock", true);
          $('#clock-msg').text('Clock Out')
        }
        else{
          localStorage.setItem("clock", false);
          $('#clock-msg').text('Clock In')
        }
      }
    })
  }

  function clockCheck(sid){
    var work = localStorage.getItem("clock");
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var suffix = "AM"
    if (hours > 12){
      hours = hours - 12;
      suffix = "PM"
    }
    var time = hours + ":" + minutes + " " + suffix;
    // clock in
    if (work === `false` || work === false){
        clockIn(sid, time);
    }
    // clock out
    else{
        clockOut(sid, time);
    }
  }

  function clockIn(sid, time){
    var request = "/clockIn";
    var body = {
      "SID": sid,
      "EID": id,
      "Clock_in": time,
      "Clock_out": ''
    };
    var jsonData = JSON.stringify(body);
    console.log(jsonData);
    $.ajax({
      type: "POST",
      url: "/clockIn",
      data: jsonData,
      contentType: 'application/json',
      dataType: 'json',
      success: function(response){
        console.log(response);
        window.location.reload(true);
      }
    })
  }

  function clockOut(sid, time){
    {
      var request = "/clockOut";
      var body = {
        "SID": sid,
        "Clock_out": time
      };
      var jsonData = JSON.stringify(body);
      console.log(jsonData);
      $.ajax({
        type: "PUT",
        url: "/clockOut",
        data: jsonData,
        contentType: 'application/json',
        dataType: 'json',
        success: function(response){
          console.log(response);
          window.location.reload(true);
        }
      })
    }
  }
});
