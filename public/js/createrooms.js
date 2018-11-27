
$("#create-btn").on("click", function (e) {
    var roomName = $("#roomName").val();
    if (roomName.length < 1) {
        alert("Please enter a room name");
    } else {
        var socket = io();
        //e.preventDefault();            
        socket.emit("create", roomName);

        var path = "/video?method=create&roomName=" + roomName;
        $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/Rooms",
            data: JSON.stringify({
                room_name: roomName
            })
        }).then(function () {
            window.location.href = path;
        });

        return false;
    }

});
// $("#join-btn").on("click", function(e) {
//     var roomName = $("#roomName").val();
//     var socket = io();
//     //e.preventDefault();
    
//     socket.emit("join", roomName);
    
//     var path="/video?method=join&roomName="+roomName;

//     window.location.href = path; 
//     return false;
// });