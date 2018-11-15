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
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  
  console.log ("i am here");

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
    }
  });

  // $exampleText.val("");
  // $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
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
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
