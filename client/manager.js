$(function(){
  var name = localStorage.getItem("name");
  var id = localStorage.getItem("id");
  var branch = localStorage.getItem("branch");
  var store = localStorage.getItem("store");

  console.log(name);
  console.log(id);
  console.log(branch);
  console.log(store);

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

    var today = new Date();
    // year - month - day
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    // hours - seconds
    var hours = today.getHours();
    var minutes = today.getMinutes();

    var str_date = `${year}-${month}-${day}`
    getSchedule(str_date);
  });

  function getSchedule(str_date){
    url = "/verifySchedule/id="+id+"&date="+str_date
    console.log(url)
    var works = false
    $.ajax({
      type: "GET",
      url: url,
      contentType: 'application/json',
      success: function(response){
        if (response.length != 0){
          works = true
        }
      }
    });
    
    return works
}

});
