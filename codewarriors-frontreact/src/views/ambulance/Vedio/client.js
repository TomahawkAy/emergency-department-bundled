var SIGNALING_SERVER = 'http://localhost:8000/';
// To create a new connection to the signaling server
socket = io.connect(SIGNALING_SERVER);
socket.on('connect', function () {
    // To subscribe the socket to a given channel
    socket.emit('join', {
        username: loggedInUser.username
    });
});
// For sending message
socket.send = function (message) {
    socket.emit('message', {
        fromUsername: peer.fromUsername,
        toUsername: peer.toUsername,
        data: message
    });
};
socket.on('disconnect', function () {
    // To intimate other clients about disconnection from server
    socket.emit('disconnect', {
        username: loggedInUser.username
    });
});
// To keep track of online users
socket_client.on('onlineUsers', function (onlineUsers) {
    $.each(onlineUsers, function (n, user) {
        if (user &amp;&amp; user.username != loggedInUser.username &amp;&amp; !(user.username == 'undefined' || user.username == '')) {
            chatObject.data.connections[user.username] = {
                onlineStatus: 'online'
            };
        }
    });
});
// To listen for other clients' disconnection from server
socket_client.on('disconnected', function (username) {
    chatObject.data.connections[username] = {
        onlineStatus: 'offline',
    };
});

// To intimate other clients about online presence
socket_client.emit('userPresence', {
    username: username
});

// To get video &amp; voice from webcam
function getUserMedia(mediaType, callback) {
    var mediaStreamConstraints = {};
    if (mediaType == 'audio') {
        mediaStreamConstraints = {
            audio: {
                echoCancellation: true
            }
        };
        window.mediaType = 'audio';
    } else
        window.mediaType = 'video';
    if (mediaType == 'video') {
        mediaStreamConstraints = {
            audio: {
                echoCancellation: true
            },
            video: {
                optional: [],
                mandatory: {}
            }
        };
    }
    navigator.getUserMedia(mediaStreamConstraints, function (stream) {
        if (peer)
            peer.mediaType = mediaType == 'audio' ? 'audio' : 'video';
        callback(stream);
        var mediaElement = document.createElement(mediaType == 'audio' ? 'audio' : 'video');
        mediaElement.id = 'selfMedia';
        mediaElement.preload = 'none';
        mediaElement[isGecko ? 'mozSrcObject' : 'src'] = isGecko ? stream : (window.URL || window.webkitURL).createObjectURL(stream);
        mediaElement.controls = false;
        mediaElement.muted = true;
        mediaElement.volume = 0;
        peer.onStreamAdded({
            mediaElement: mediaElement,
            username: username,
            stream: stream
        });
    }, function () {
        alert('Could not connect camera!');
    });
}

// Instantiate PeerConnection
peer = new PeerConnection(socket);
// Setup peer methods
setPeerMethod(peer);
function setPeerMethod(peer) {
    // On incoming call
    peer.onUserFound = function (messageData) {
        // ...
        // Handle UI for the incoming call
        // ...
        // On call accept
        getUserMedia(chatObject.data.callType, function (stream) {
            peer.toUsername = callerUserId;
            peer.fromUsername = loggedInUser.username;
            peer.addStream(stream);
            peer.sendParticipationRequest(callerUserId);
        });
    };
    // Render media-stream elements for both caller and callee respectively
    peer.onStreamAdded = function (e) {
        var media = e.mediaElement;
        if (chatObject.data.callType == 'video') {
            addVideo(media);
        } else {
            addAudio(media);
        }
    };
    // Remove media-stream elements
    peer.onStreamEnded = function (e) {
        // ...
    };
};
function addVideo(video) {
    var video_id = video.getAttribute('id');
    if (video_id == 'selfMedia') {
        $('#selfVideoContainer').append(video);
    } else {
        if (chatObject.data.callTimer == 0) {
            chatObject.data.callTimer = startTimer('callTimer');
            peer.stopBroadcast();
        }
        $('#otherVideoContainer').append(video);
    }
    // Show loading animation.
    var playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.then(function (_) {
            // Automatic playback started!
            // Show playing UI.
        }).catch(function (error) {
            // Auto-play was prevented
            // Show paused UI.
        });
    }
    scaleVideos();
};
function addAudio() {
    // Similar to addVideo()
    // ...
};

// ...
// Handle message broadcast and media-streaming for outgoing call
function createCustomRoom(calleeId) {
    peer.userid = userName;
    peer.toUsername = calleeId;
    getUserMedia(chatObject.data.callType, function (stream) {
        peer.addStream(stream);
        peer.startBroadcasting({
            callerName: loggedInUser.FullName,
            calleeId: calleeId,
            callType: chatObject.data.callType
        });
    });
}
// ...
// Handle Outgoing call
$(document).on('click', '.call_button', function () {
    chatObject.data.callType = $(this).attr('data-call_type');
    var calleeId = $(this).attr('data-username');
    if (typeof chatObject.data.connections[calleeId] != 'undefined' &amp;&amp; chatObject.data.connections[calleeId].onlineStatus != 'offline') {
        createCustomRoom(calleeId);
        chatObject.data.callee = {
            UserId: calleeId
        };
        chatObject.data.callStatus = (chatObject.data.callType == 'video') ? 'outgoing' : 'outgoingAudio';
        chatObject.onOutgoingCall();
    }
});
// ...
// Handle End call
$(document).on('click', '.end_button', function () {
    peer.toUsername = $(this).attr('data-username');
    peer.close();
});
// ...
