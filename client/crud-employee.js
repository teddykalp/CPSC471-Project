$(function(){
  var name = localStorage.getItem("name");
  var id = localStorage.getItem("id");

  console.log(name);
  console.log(id);

  loadData();


  $('#addEmployee').click(function(){
    console.log("Add Clicked");
  });

  $(document).on('click', '.edit', function(e) {
    var row = $(this).closest("tr"),       // Finds the closest row <tr>
    tds = row.find("td");
             // Finds all children <td> elements
    //$(this).removeClass('edit')
    //$(this).addClass('done')

    var eid = $(tds[0]).text()
    var firstname = $(tds[1]).text()
    var lastname = $(tds[2]).text()
    var email = $(tds[3]).text()
    var phone = $(tds[4]).text()
    var dept = $(tds[5]).text()

    var result ={
      "ID": eid,
      "First Name": firstname,
      "Last Name": lastname,
      "Email": email,
      "Phone": phone,
      "Dept": dept
    }

    console.log(result)

  });

  $(document).on('click', '.delete', function(e) {
    console.log("Delete Clicked");
  });

  $('#clear-btn').click(function(){
    console.log("Clear Clicked")
    $('#searchArea').hide();
  });

  $('#delete-btn').click(function(){
    console.log("Delete Clicked")
  });

  $('#add-btn').click(function(){
    console.log("Add Clicked")
  });

  $('#update-btn').click(function(){
    console.log("Update Clicked")
  });

  function addContents(data){
    data.forEach((item, i) => {
        var eid = (item["EID"]);
        var firstname = (item["First_Name"]);
        var lastname = (item["Last_Name"]);
        var email = (item["Email"]);
        var phone = (item["Phone"]);
        var dept = (item["Dept_Num"]);
        var to_add = `<tr><td>${eid}</td><td>${firstname}</td><td>${lastname}</td><td>${email}</td><td>${phone}</td><td>${dept}</td><td><button class = "edit"><i class="fas fa-edit"></i>Edit</button></td><td><button class = "delete"><i class="fas fa-trash-alt"></i>Delete</button></td></tr>`
        $('#searchTable').append(to_add);
    });
  }

  function loadData(){
    var request = "/getEmployees/id=" + id;
    $.ajax({
      type: "GET",
      url: request,
      contentType: 'application/json',
      success: function(response){
        var res = response[0];
        addContents(res);
        }
      });
  }
})
