const socket = io();

let name1;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');


do {
    name1 = prompt('Please enter your name:');

} while (!name1)

// keyup is an event . we want when enter key  is pressed only then event should happen.
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        console.log("hello");
        sendMessage(e.target.value);
    }

});

function sendMessage(message) {
    let msg = {
        user: name1,
        message: message.trim()

    }

    // Append the message
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    // send to server
    socket.emit('message', msg);
}



function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    // let className = type;
    mainDiv.classList.add(type,'message');

    let markup = `
    <h4> ${msg.user} </h4>
    <p> ${msg.message} </p>

    `;

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
}



// Recieve messages
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom();
})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}