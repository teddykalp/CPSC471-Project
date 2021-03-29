$(function(){
  var name = localStorage.getItem("name");
  var id = localStorage.getItem("id");

  console.log(name);
  console.log(id);

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

  $("#notification-btn").click(function(){
    var win = window.location.href.replace("manager", "")
    window.location.href = win + "sendNotification";
  });

  $("#clock-btn").click(function(){
    console.log("Clock Clicked")
  });


});
