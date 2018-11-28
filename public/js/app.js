//window.addEventListener('load', () => {
  
$(function() {
  
  console.log("chat room is {{roomName}}");
  
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
   
    const roomName = $("#room").html();
    var method = $("#room").attr( "attr" );
    console.log(method);
    console.log(roomName);
    if (method === 'create') {
      createRoom(roomName);
    } else {
      joinRoom(roomName);
    }
    // return false;
  // });
});


var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);