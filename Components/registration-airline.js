$(document).ready(function () {
  // Get all countries with ajax
  let countries = $.ajax({
    url: "https://localhost:44371/api/Anonymous/getallcountries",
    type: "GET",
    dataType: "json",
    contentType: "application/json",
  })
    .done(function (result) {
      console.log(result);
      countries = result;
      select = document.getElementById("country");
      for (var i = 0; i < countries.length; i++) {
        var opt = document.createElement("option");
        opt.value = countries[i].id;
        opt.innerHTML = countries[i].name;
        select.appendChild(opt);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("failed: ");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      alert("Error!");
    });
});

function ValidateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mailformat.test(inputText)) {
    return true;
  } else {
    return false;
  }
}

function register(e) {
  let airline = {
    Name: $("#airline_name").val(),
    Country_Id: parseInt($("#country").val()),
    user: {
      Username: $("#user_name").val(),
      Password: $("#user_password").val(),
      Email: $("#email").val(),
      User_Role: 2,
    },
  };

  if (airline.Name.length < 2) {
    alert("Airline name is too short");
    return;
  }

  if (airline.user.Username.length < 4) {
    alert("Username must contain at least 4 letters");
    return;
  }

  if (airline.user.Password.length < 8) {
    alert("Password must contain at least 8 letters");
    return;
  }

  if (airline.user.Password != $("#confirm_password").val()) {
    alert("Passwords do not match");
    return;
  }

  var bool = ValidateEmail(airline.user.Email);

  if (bool === false) {
    alert("Email address is not valid");
    return;
  }

  console.log(airline);

  let airlineJson = JSON.stringify(airline);

  let jqXhr = $.ajax({
    url: "https://localhost:44371/api/Anonymous/AddAirlineToWaitingList",
    type: "POST", // default GET
    data: airlineJson, // data sent to server
    // dataType: "json", // => since no data returned from server, this will throw an error
    contentType: "application/json", // type of data to be sent
  })
    .done(function (result) {
      console.log("action taken: " + result.success);
      alert("You have signed up sussessfully!");
      location.href = "login.html";
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("failed: ");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      alert("Error!");
    });
}
