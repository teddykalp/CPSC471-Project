$(function(){
  $("#employeeSchedule").hide();

  $("#employeeSchedule-btn").click(function(){
    $("#employeeSchedule").show();
    $("#managerSchedule").hide();
  })

  $("#managerSchedule-btn").click(function(){
    $("#employeeSchedule").hide();
    $("#managerSchedule").show();
  })
});
