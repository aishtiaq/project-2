window.addEventListener('load', () => {
  // Chat platform
  // const chatTemplate = Handlebars.compile($('#chat-template').html());
  // const chatContentTemplate = Handlebars.compile($('#chat-content-template').html());
  // const chatEl = $('#chat');
  // const formEl = $('.form');
  // const messages = [];
  // let username;

  // Local Video
  //const localImageEl = $('#local-image');
  const localVideoEl = $('#local-video');

  // Remote Videos
  //const remoteVideoTemplate = Handlebars.compile($('#remote-video-template').html());
  const remoteVideosEl = $('#remote-videos');
  let remoteVideosCount = 0;

  // Hide cameras until they are initialized
  localVideoEl.hide();

  // Add validation rules to Create/Join Room Form
  // formEl.form({
  //   fields: {
  //     roomName: 'empty',
  //     username: 'empty',
  //   },
  // });

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
    autoAdjustMic: false,
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
    const html = ' <div id="'+id+'" > \
     </div>';
    console.log("someone joined");
    
    if (remoteVideosCount === 0) {
      remoteVideosEl.html(html);
      console.log("appending");
    } else {
      remoteVideosEl.append(html);
    }
    console.log("id is "+id);
    $(`#${id}`).html(video);
  //  $(`#${id} video`).addClass('ui image medium'); // Make video element responsive
    $(`#${id} video`).addAttribute('muted');
    remoteVideosCount += 1;
  });
});
