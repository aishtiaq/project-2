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
    first_name: $first_name.val().trim(),
    last_name: $last_name.val().trim(),
    phone: $mob_no.val().trim(),
    username: $username.val().trim(),
    password: $password.val().trim()
  };

  API.saveUser(user).then(function() {
    if(user) {
     
      $first_name.val("");
      $last_name.val("");
      $mob_no.val("");
      $username.val("");
      $password.val("");
      window.location.href="/signin";
    }
  });

};


var handleLogin = function (){
 event.preventDefault();
 
  
  var findUser = {
    username: $username.val().trim(),
    password: $password.val().trim()
  };

  
  API.getUser(findUser).then(function(dbUsers) {
   // alert(dbUsers);
   window.location.href="/dashboard";
    
  });
}

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$loginBtn.on("click", handleLogin);
