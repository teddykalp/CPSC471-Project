$(function () {
  $("#employeeSchedule").hide();

  //larger schedule
  $("#employeeSchedule-btn").click(function () {
    $("#employeeSchedule").show();
    $("#managerSchedule").hide();

    
  })

  $("#searchSchedule").click(function () {
    console.log("Hit the search button!");
  })

  function loadManagerSchedule(data) {

  }

  //smaller schedule
  $("#managerSchedule-btn").click(function () {
    $("#employeeSchedule").hide();
    $("#managerSchedule").show();
    console.log("Manager Schedule");
  })
});

//edit and delete only for present/future schedules
//managers and subs make schedules
//add new schedule
//get schedule for one id
//get schedule for all emps who work for a manager

//seeing a schedule with 1 param like employee id
//seeing 1 parameter but using manages table, we want employee info
//add new schedule