// Get references to page elements
var $firstName = $("#first_name");
var $lastName = $("#last_name");
var $mobno = $("#mob_no");
var $username = $("#username");
var $password = $("#password");
var $submitBtn = $("#btn-signup");
var $loginBtn = $("#btn-login");

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/Users",
      data: JSON.stringify(user)
    });
  },
  getUser: function(user) {
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
var handleFormSubmit = function(event) {
  event.preventDefault();

  var user = {
    first_name: $firstName.val().trim(),
    last_name: $lastName.val().trim(),
    phone: $mobno.val().trim(),
    username: $username.val().trim(),
    password: $password.val().trim()
  };

  API.saveUser(user).then(function() {
    if(user) {
      $firstName.val("");
      $lastName.val("");
      $mobno.val("");
      $username.val("");
      $password.val("");
      window.location.href="/signin";
    }
  });

};


var handleLogin = function (event){
  event.preventDefault();
  var findUser = {
    username: $username.val().trim(),
    password: $password.val().trim()
  };

  API.getUser(findUser).then(function() {
    window.location.href="/dashboard";
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$loginBtn.on("click", handleLogin);
