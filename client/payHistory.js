$(function(){
  var name = localStorage.getItem("name");
  var id = localStorage.getItem("id");

  loadData();

  function loadData(){
    var request = '/payHistory/id='+id
    $.ajax({
      type: "GET",
      url: request,
      contentType: 'application/json',
      success: function(response){
        var res = response[0];
        addContents(res);
        }
    })
  }

  function addContents(data){
    data.forEach((item, i) => {
      console.log(item)
      var payId = item["PayId"];
      var startDate = item["Pay_Period_Start"].substring(0,10);
      var endDate = item["Pay_Period_End"].substring(0,10);
      var totalHours = item["Total_Hours"];
      var grossPay = item["Gross_Pay"];
      var netPay = item["Net_Pay"];

      var to_add = `<tr><td>${payId}</td><td>${startDate}</td><td>${endDate}</td><td>${totalHours}</td><td>${grossPay}</td><td>${netPay}</td></tr>`
      $("#paytable").append(to_add);
    });

  }


});
