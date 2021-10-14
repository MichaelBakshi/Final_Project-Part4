function signin(e) {
  let user = {
    UserName: $("#username").val(),
    Password: $("#password").val(),
  };
  console.log(user);
  let userJson = JSON.stringify(user);

  let jqXhr = $.ajax({
    url: "https://localhost:44371/api/Auth/token",
    type: "POST",
    data: userJson,
    dataType: "json",
    contentType: "application/json",
  })
    .done(function (result) {
      console.log("action taken: " + result.success);
      alert("Welcome to flight site!");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("failed: ");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      alert("Error!");
    });
}
