const socket = io();

const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessageButton");

sendMessageButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message !== "") {
        sendMessage(message);
        messageInput.value = "";
    }
});

function sendMessage(message) {
    const listItem = document.createElement("li");
    listItem.textContent = message;
    chatMessages.appendChild(listItem);

    // msg to  server
    socket.emit("chat message", message);
}

// chat for server
socket.on("chat message", message => {
    const listItem = document.createElement("li");
    listItem.textContent = message;
    chatMessages.appendChild(listItem);
});
