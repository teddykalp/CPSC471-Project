$(function(){
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

    $(tds[0]).attr("contentEditable", "true")
    $(tds[1]).attr("contentEditable", "true")
    $(tds[2]).attr("contentEditable", "true")
    $(this).hide();
  })

  $(document).on('click', '.done', function(e){
    var row = $(this).closest("tr"),       // Finds the closest row <tr>
    tds = row.find("td");

    $(this).closest('tr').find('.edit').show();

    $(tds[0]).attr("contentEditable", "false")
    $(tds[1]).attr("contentEditable", "false")
    $(tds[2]).attr("contentEditable", "false")
    $(this).hide();
  })

  $(document).on('click', '.editEmployee', function(e){
    var row = $(this).closest("tr"),       // Finds the closest row <tr>
    tds = row.find("td");

    $(this).closest('tr').find('.doneEmployee').show();

    $(tds[0]).attr("contentEditable", "true")
    $(tds[1]).attr("contentEditable", "true")
    $(tds[2]).attr("contentEditable", "true")
    $(tds[3]).attr("contentEditable", "true")
    $(tds[4]).attr("contentEditable", "true")
    $(tds[5]).attr("contentEditable", "true")
    $(this).hide();
  })

  $(document).on('click', '.doneEmployee', function(e){
    var row = $(this).closest("tr"),       // Finds the closest row <tr>
    tds = row.find("td");

    $(this).closest('tr').find('.editEmployee').show();

    $(tds[0]).attr("contentEditable", "false")
    $(tds[1]).attr("contentEditable", "false")
    $(tds[2]).attr("contentEditable", "false")
    $(tds[3]).attr("contentEditable", "false")
    $(tds[4]).attr("contentEditable", "false")
    $(tds[5]).attr("contentEditable", "false")
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
        console.log(res);
        addContents(res);
        }
      });
  }

  function addEmployeeContents(data){
    data.forEach((item, i) => {
      var date = (item["Date"].substring(0,10));
      var start = (item["Start_Time"]);
      var end = (item["End_Time"]);
      var eid = (item["EID"]);
      var name = (item["Name"]);
      var dept = (item["Department"]);

      var to_add = `<tr><td>${date}</td><td>${start}</td><td>${end}</td><td>${eid}</td><td>${name}</td><td>${dept}</td><td><button class = "btn editEmployee"><i class="fas fa-edit"></i>Edit</button></td><td><button class = "btn doneEmployee" style = "display: none;"><i class="fas fa-check-square"></i>Done</button></td><td><button class = "btn deleteEmployee"><i class="fas fa-trash-alt"></i>Delete</button></td><td><button class = "btn sendNotification"><i class="fas fa-paper-plane"></i>Send Notification</button></td></tr>`
      $('#empSchedule').append(to_add);
    });

  }


  function addContents(data){
    data.forEach((item, i) => {
        var past = false
        var today = false
        var future = false

        var date = (item["Date"].substring(0,10));
        var parsedDate = Date.parse(date);
        var today_date = new Date();


        var start = (item["Start_Time"]);
        var end = (item["End_Time"]);
        var to_add = `<tr style = 'background-color:'><td>${date}</td><td>${start}</td><td>${end}</td><td><button class = "btn edit"><i class="fas fa-edit"></i>Edit</button></td><td><button class = "btn done" style = "display: none;"><i class="fas fa-check-square"></i>Done</button></td><td><button class = "btn delete"><i class="fas fa-trash-alt"></i>Delete</button></td></tr>`
        console.log(to_add)
        $('#schedTable').append(to_add);
    });
  }
});
