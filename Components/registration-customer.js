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
  let customer = {
    First_Name: $("#first_name").val(),
    Last_Name: $("#last_name").val(),
    Address: $("#address").val(),
    Phone_No: $("#phone_no").val(),
    Credit_Card_No: $("#credit_card").val(),
    user: {
      Email: $("#email").val(),
      Username: $("#user_name").val(),
      Password: $("#user_password").val(),
      User_Role: 3,
    },
  };

  if (customer.First_Name.length < 3) {
    alert("First name is too short");
    return;
  }

  if (customer.Last_Name.length < 3) {
    alert("Last name is too short");
    return;
  }

  if (customer.Address.length < 5) {
    alert("Address is too short");
    return;
  }

  if (isNaN(customer.Phone_No)) {
    alert("Phone number must contain digits only");
  } else if (customer.Phone_No.length < 6) {
    alert("Phone number must contain at least 6 digits");
    return;
  }

  if (isNaN(customer.Credit_Card_No)) {
    alert("Credit card number must contain digits only");
  } else if (customer.Credit_Card_No.length != 16) {
    alert("Credit card number must contain 16 digits only");

    return;
  }

  if (customer.user.Username.length < 4) {
    alert("Username must contain at least 4 letters");
    return;
  }

  var bool = ValidatePassword(customer.user.Password);
  if (bool === false) {
    alert(
      "Password must be at least 6 letters and contain both digits and letters"
    );
    return;
  }

  if (customer.user.Password != $("#confirm_password").val()) {
    alert("Passwords do not match");
    return;
  }

  var bool = ValidateEmail(customer.user.Email);

  if (bool === false) {
    alert("Email address is not valid");
    return;
  }

  console.log(customer);

  let customerJson = JSON.stringify(customer);

  let jqXhr = $.ajax({
    url: "https://localhost:44371/api/Anonymous/SignUpCustomer",
    type: "POST",
    data: customerJson,
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
