// open chat
function openChat(User) {
    document.getElementById('dialogList').classList.remove('active');
    document.getElementById('chatView').classList.add('active');
    document.getElementById('chat-user').textContent = User;
}

// back button
function goBack() {
    document.getElementById('dialogList').classList.add('active');
    document.getElementById('chatView').classList.remove('active');
}

// send button
function sendMsg() {
    const chatInput = document.getElementById('chatInput');
    const chats = chatInput.value.trim();
    if (chats) {
        const query = document.querySelector('.chat-messages');
        const newChats = document.createElement('div');
        newChats.className = 'message sent';
        newChats.textContent = chats;
        query.appendChild(newChats);
        chatInput.value = '';
        query.scrollTop = query.scrollHeight;
    }
}

// initialize the dialog screen first
document.getElementById('dialogList').classList.add('active');