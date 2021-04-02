$(function(){
  $("#employeeSchedule").hide();

  $("#employeeSchedule-btn").click(function(){
    $("#employeeSchedule").show();
    $("#managerSchedule").hide();
    $('#scheduleHeader').text("My Employees' Schedule");
  })

  $("#managerSchedule-btn").click(function(){
    $("#employeeSchedule").hide();
    $("#managerSchedule").show();
      $('#scheduleHeader').text("My Schedule");
  })

  loadData();

  function loadData(){
    var entry1 = {
      "Date": "2020-01-02",
      "Start_Time": "9:00 AM",
      "End_Time": "5:00 PM"
    }
    var entry2 = {
      "Date": "2020-01-02",
      "Start_Time": "9:00 AM",
      "End_Time": "5:00 PM"
    }
    var entry3 = {
      "Date": "2020-01-02",
      "Start_Time": "9:00 AM",
      "End_Time": "5:00 PM"
    }

    var entries = []
    entries.push(entry1)
    entries.push(entry2)
    entries.push(entry3)
    addContents(entries)
  }

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

    $(tds[0]).attr("contentEditable", "true")
    $(tds[1]).attr("contentEditable", "true")
    $(tds[2]).attr("contentEditable", "true")
    $(this).hide();
  })

  function addContents(data){
    data.forEach((item, i) => {
        var past = false
        var today = false
        var future = false

        var date = (item["Date"]);
        var parsedDate = Date.parse(date);
        var today_date = new Date();


        var start = (item["Start_Time"]);
        var end = (item["End_Time"]);
        var to_add = `<tr style = 'background-color:'><td>${date}</td><td>${start}</td><td>${end}</td><td><button class = "edit"><i class="fas fa-edit"></i>Edit</button></td><td><button class = "done" style = "display: none;"><i class="fas fa-check-square"></i>Done</button></td><td><button class = "delete"><i class="fas fa-trash-alt"></i>Delete</button></td></tr>`
        console.log(to_add)
        $('#schedTable').append(to_add);
    });
  }
});
