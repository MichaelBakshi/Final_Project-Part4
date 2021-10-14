function ValidateEmail(inputText) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mailformat.test(inputText)) {
    // alert("Valid email address!");
    // document.form1.text1.focus();
    return true;
  } else {
    //alert("You have entered an invalid email address!");
    // document.form1.text1.focus();
    return false;
  }
}

function ValidatePassword(inputText) {
  var passwordformat = /^.*(?=.{6,})(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
  if (passwordformat.test(inputText)) {
    return true;
  } else {
    return false;
  }
}

function register(e) {
  let admin = {
    First_Name: $("#first_name").val(),
    Last_Name: $("#last_name").val(),
    Level: parseInt($("#level").val()),
    user: {
      Email: $("#email").val(),
      Username: $("#user_name").val(),
      Password: $("#user_password").val(),
      User_Role: 1,
    },
  };

  console.log(admin);

  if (admin.First_Name.length < 3) {
    alert("First name is too short");
    return;
  }

  if (admin.Last_Name.length < 3) {
    alert("Last name is too short");
    return;
  }

  if (admin.user.Username.length < 4) {
    alert("Username must contain at least 4 letters");
    return;
  }

  var bool = ValidatePassword(admin.user.Password);
  if (bool === false) {
    alert(
      "Password must be at least 6 letters and contain both digits and letters"
    );
    return;
  }

  if (admin.user.Password != $("#confirm_password").val()) {
    alert("Passwords do not match");
    return;
  }

  var bool = ValidateEmail(admin.user.Email);

  if (bool === false) {
    alert("Email address is not valid");
    return;
  }


  let adminJson = JSON.stringify(admin);
  console.log(adminJson);

  let jqXhr = $.ajax({
    url: "https://localhost:44371/api/Anonymous/SignUpAdmin",
    type: "POST",
    data: adminJson,
    dataType: "json",
    contentType: "application/json",
  })
    .done(function (result) {
      console.log("action taken: " + result.success);
      alert("You have signed up sussessfully!");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("failed: ");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      alert("Error!");
    });
}
