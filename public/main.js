
var $window = $(window);
var username;


var $inputMessage = $('.inputMessage'); // Input message input box



var $usernameInput = $('.usernameInput'); // Input for username
var $loginPage = $('.login.page'); // The login page
var $chatPage = $('.chat.page'); // The chatroom page

var $currentInput = $usernameInput.focus();



$window.keydown(function (event) {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
        $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
        if (username) {
            sendMessage();
            socket.emit('stop typing');
            typing = false;
        } else {
            setUsername();
        }
    }
});

// Prevents input from having injected markup
function cleanInput (input) {
    return $('<div/>').text(input).text();
}

// Sets the client's username
function setUsername () {
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
        $loginPage.fadeOut();
        $chatPage.show();
        $loginPage.off('click');
        $currentInput = $inputMessage.focus();

        // Tell the server your username
        socket.emit('add user', username);
    }
}



var socket = io();
$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
});
