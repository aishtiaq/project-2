//window.addEventListener('load', () => {
$(function() {
  Handlebars.registerHelper('json',function(obj) {
    return new Handlebars.SafeString(JSON.stringify(obj))
  })
  //console.log("chat room is "+JSON.parse('{{{json roomName}}}'));
  var room=JSON.parse('{{{json roomName}}}');
  console.log("some more "+room);
  const localVideoEl = $('#local-video');

  // Remote Videos
  const remoteVideosEl = $('#remote-videos');
  let remoteVideosCount = 0;

  // Hide cameras until they are initialized
  localVideoEl.hide();

 
  // create our webrtc connection
  const webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'local-video',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remote-videos',
    // immediately ask for camera access
    autoRequestMedia: true,
    debug: false,
    detectSpeakingEvents: true,
    autoAdjustMic: false
  });

  // We got access to local camera
  webrtc.on('localStream', () => {
   // localImageEl.hide();
    localVideoEl.show();
  });

  // Remote video was added
  webrtc.on('videoAdded', (video, peer) => {
    // eslint-disable-next-line no-console
    const id = webrtc.getDomId(peer);
    const html = '<div id="'+id +'" class="remote-video" >\
    </div>';
    console.log("someone joined");
    
    if (remoteVideosCount === 0) {
      remoteVideosEl.html(html);
      console.log("appending");
    } else {
      remoteVideosEl.append(html);
    }
    console.log("id is "+id);
    $('#'+id).html(video);
    // $('#'+id).addAttribute('muted');
    // $('#'+id).addAttribute('mirror','false');
    // $('#'+id).addAttribute('controls');
    remoteVideosCount += 1;
  });

  
  // Display Chat Interface
  const showChatRoom = (room) => {
    formEl.hide();
    const html = chatTemplate({ room });
    chatEl.html(html);
    const postForm = $('form');
    postForm.form({
      message: 'empty',
    });
    $('#post-btn').on('click', () => {
      const message = $('#post-message').val();
      postMessage(message);
    });
    $('#post-message').on('keyup', (event) => {
      if (event.keyCode === 13) {
        const message = $('#post-message').val();
        postMessage(message);
      }
    });
  };

  // Register new Chat Room
  const createRoom = (roomName) => {
    // eslint-disable-next-line no-console
    console.info(`Creating new room: ${roomName}`);
    
    webrtc.createRoom(roomName, (err, name) => {
      console.log("webrtc room created");
      // var path="/video?roomName="+roomName;
      // window.location.href = path;
    });
  };

  // Join existing Chat Room
  const joinRoom = (roomName) => {
    // eslint-disable-next-line no-console
    
    console.log(`Joining Room: ${roomName}`);
    webrtc.joinRoom(roomName);
  };

  // Receive message from remote user
  webrtc.connection.on('message', (data) => {
   
  });

  
  // Room Submit Button Handler
  // $('.submit').on('click', (event) => {
   
    const roomName = "{{{roomName}}}";
    var method = "{{method}}";
    console.log(method);
    console.log(roomName);
    // if (event.target.id === 'create-btn') {
    //   alert(roomName);
    //   createRoom(roomName);
    // } else {
    //   alert(roomName);
    //   joinRoom(roomName);
    // }
    // return false;
  // });
});