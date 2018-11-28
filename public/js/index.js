// Get references to page elements
var $first_name = $("#first_name");
var $last_name = $("#last_name");
var $mob_no = $("#mob_no");
var $username = $("#username");
var $password = $("#password");
var $submitBtn = $("#btn-signup");
var $loginBtn = $("#btn-login");

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function (user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/Users",
      data: JSON.stringify(user)
    });
  },
  getUser: function (user) {

    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "api/signin",
      type: "POST",
      data: JSON.stringify(user)
    });
  }
};



// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var user = {
    first_name: $first_name.val().trim(),
    last_name: $last_name.val().trim(),
    phone: $mob_no.val().trim(),
    username: $username.val().trim(),
    password: $password.val().trim()
  };

  API.saveUser(user).then(function () {
    if (user) {

      $first_name.val("");
      $last_name.val("");
      $mob_no.val("");
      $username.val("");
      $password.val("");
      window.location.href = "/signin";
    }
  });

};


var handleLogin = function (event) {
  event.preventDefault();

  $("#nameInput").removeClass("is-invalid");
  $("#passwordInput").removeClass("is-invalid");
  $("#nameError").html("");
  $("#passwordError").html("");

  if(validate()) {
    var findUser = {
      username: $("#nameInput").val().trim(),
      password: $("#passwordInput").val().trim()
    };
  
  
    API.getUser(findUser).then(function (result) {
      console.log(result);
      if(result.error1) {
        $("#passwordInput").addClass("is-invalid");
        $("#passwordError").html(result.error1);
      } else if(result.error2) {
        $("#nameInput").addClass("is-invalid");
        $("#nameError").html(result.error2);
      } else {
        window.location.href = "/dashboard";
      }
      
    });
  }
  
}

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$loginBtn.on("click", handleLogin);

function validate(e) {

  name = $("#nameInput").val().trim();
  pass = $("#passwordInput").val().trim();


  var errors;

  if (!checkLength(name, 1, 250)) {
    errors = true;
    $("#nameInput").addClass("is-invalid");
    $("#nameError").html("Username should be between 1 and 250 characters");
  }

  if (!checkLength(pass, 1, 25)) {
    errors = true;
    $("#passwordInput").addClass("is-invalid");
    $("#passwordError").html("Password should be between 1 and 250 characters");
  }

  if (errors) {

    return false;

  } else {
    return true;
  }


}

function checkLength(text, min, max) {

  if (text.length < min || text.length > max) {
    return false;
  }
  return true;
}
