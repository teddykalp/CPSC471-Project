$(function () {
  $("#employeeSchedule").hide();

  $("#employeeSchedule-btn").click(function () {
    $("#employeeSchedule").show();
    $("#managerSchedule").hide();
  })

  $("#managerSchedule-btn").click(function () {
    $("#employeeSchedule").hide();
    $("#managerSchedule").show();
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