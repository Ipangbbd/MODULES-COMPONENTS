// Messenger App
document.addEventListener('DOMContentLoaded', function () {
    // Sample data for messenger
    const dialogs = [
        { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", avatar: "JD", online: true },
        { id: 2, name: "Jane Smith", lastMessage: "Meeting at 3pm", avatar: "JS", online: false },
        { id: 3, name: "Mike Johnson", lastMessage: "Please review the design", avatar: "MJ", online: true },
        { id: 4, name: "Sarah Williams", lastMessage: "Thanks for your help!", avatar: "SW", online: false },
        { id: 5, name: "David Brown", lastMessage: "Let's catch up soon", avatar: "DB", online: true }
    ];

    const messages = {
        1: [
            { text: "Hey there!", sent: false, time: "10:30 AM" },
            { text: "Hi! How are you?", sent: true, time: "10:32 AM" },
            { text: "I'm good, thanks for asking. How about you?", sent: false, time: "10:33 AM" },
            { text: "Doing well! Just working on some projects.", sent: true, time: "10:35 AM" }
        ],
        2: [
            { text: "Don't forget about our meeting", sent: false, time: "9:15 AM" },
            { text: "What time was it again?", sent: true, time: "9:20 AM" },
            { text: "Meeting at 3pm in the conference room", sent: false, time: "9:21 AM" }
        ],
        3: [
            { text: "Please review the design I sent", sent: false, time: "2:45 PM" },
            { text: "I'll take a look this afternoon", sent: true, time: "2:50 PM" }
        ],
        4: [
            { text: "Thanks for your help with the project!", sent: false, time: "4:10 PM" },
            { text: "No problem, happy to help!", sent: true, time: "4:12 PM" }
        ],
        5: [
            { text: "Let's catch up soon", sent: false, time: "11:30 AM" },
            { text: "Definitely! How about Friday?", sent: true, time: "11:35 AM" }
        ]
    };

    const dialogsList = document.getElementById('dialogsList');
    const chatView = document.getElementById('chatView');
    const chatMessages = document.getElementById('chatMessages');
    const chatUserName = document.getElementById('chatUserName');
    const backButton = document.getElementById('backButton');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // Render dialogs list
    dialogs.forEach(dialog => {
        const dialogItem = document.createElement('div');
        dialogItem.className = 'dialog-item';
        dialogItem.innerHTML = `
            <div class="dialog-avatar">${dialog.avatar}</div>
            <div class="dialog-info">
                <div class="dialog-name">${dialog.name}</div>
                <div class="dialog-last-message">${dialog.lastMessage}</div>
            </div>
            ${dialog.online ? '<div style="width: 10px; height: 10px; background-color: var(--primary); border-radius: 50%;"></div>' : ''}
        `;
        dialogItem.addEventListener('click', () => openChat(dialog.id, dialog.name));
        dialogsList.appendChild(dialogItem);
    });

    function openChat(userId, userName) {
        dialogsList.style.display = 'none';
        chatView.style.display = 'flex';
        chatUserName.textContent = userName;

        // Clear and render messages
        chatMessages.innerHTML = '';
        if (messages[userId]) {
            messages[userId].forEach(msg => {
                const messageElement = document.createElement('div');
                messageElement.className = `message ${msg.sent ? 'sent' : 'received'}`;
                messageElement.textContent = msg.text;
                chatMessages.appendChild(messageElement);
            });
        }

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    backButton.addEventListener('click', () => {
        dialogsList.style.display = 'block';
        chatView.style.display = 'none';
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message sent';
            messageElement.textContent = messageText;
            chatMessages.appendChild(messageElement);
            messageInput.value = '';

            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simulate reply after 1 second
            setTimeout(() => {
                const replyElement = document.createElement('div');
                replyElement.className = 'message received';
                replyElement.textContent = "Thanks for your message! I'll get back to you soon.";
                chatMessages.appendChild(replyElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Timer
    const timerDisplay = document.getElementById('timerDisplay');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');

    let timerInterval;
    let seconds = 0;
    let isRunning = false;

    function updateTimerDisplay() {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        timerDisplay.textContent =
            `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    startBtn.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            timerInterval = setInterval(() => {
                seconds++;
                updateTimerDisplay();
            }, 1000);
        }
    });

    pauseBtn.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
        }
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        isRunning = false;
        seconds = 0;
        updateTimerDisplay();
    });

    // Canvas Animation
    const canvas = document.getElementById('animation-canvas');
    const ctx = canvas.getContext('2d');

    let x = 50;
    let direction = 1;
    const speed = 2;
    const radius = 30;

    function drawCircle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(x, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
        ctx.fill();

        x += speed * direction;

        if (x + radius > canvas.width || x - radius < 0) {
            direction *= -1;
        }

        requestAnimationFrame(drawCircle);
    }

    drawCircle();

    // Card Disappearance Effect
    const imgUpload = document.getElementById('imageUpload');
    const loadImgBtn = document.getElementById('loadImage');
    const gridSizeInput = document.getElementById('gridSize');
    const imgContainer = document.getElementById('imageContainer');

    loadImgBtn.addEventListener('click', () => imageUpload.click());
    imgUpload.addEventListener('change', handleImageUpload);

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => createImageGrid(reader.result);
            reader.readAsDataURL(file);
        }
    }

    function createImageGrid(imageSrc) {
        imgContainer.innerHTML = ``;
        const gridSize = parseInt(gridSizeInput.value) || 4;
        const cardWidth = imgContainer.clientWidth / gridSize;
        const cardHeight = imgContainer.clientHeight / gridSize;

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const card = document.createElement('div');

                card.className = 'card';
                card.style.width = `${cardWidth}px`;
                card.style.height = `${cardHeight}px`;
                card.style.left = `${col * cardWidth}px`;
                card.style.top = `${row * cardHeight}px`;
                card.style.backgroundImage = `url('${imageSrc}')`;
                card.style.backgroundSize = `${imgContainer.clientWidth}px ${imgContainer.clientHeight}px`;
                card.style.backgroundPosition = `-${col * cardWidth}px -${row * cardHeight}px`;

                card.addEventListener('click', () => makeCardDisappear(card));
                imgContainer.appendChild(card);
            }
        }
    }

    function makeCardDisappear(card) {
        card.classList.add('disappearing');
        setTimeout(() => card.remove(), 500);
        if (!document.querySelector('.card:not(.disappearing)')) {
            setTimeout(() => alert('all card have been disappeared!'), 500);
        }
    }

    // Calendar
    const calendarMonthYear = document.getElementById('calendarMonthYear');
    const calendarDays = document.getElementById('calendarDays');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');

    let currentDate = new Date();

    function renderCalendar() {
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

        const firstDayIndex = firstDay.getDay();
        const lastDayIndex = lastDay.getDay();
        const nextDays = 7 - lastDayIndex - 1;

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        calendarMonthYear.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

        let days = "";

        // Previous month days
        for (let x = firstDayIndex; x > 0; x--) {
            days += `<div class="calendar-day other-month">${prevLastDay.getDate() - x + 1}</div>`;
        }

        // Current month days
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const today = new Date();

            if (i === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()) {
                days += `<div class="calendar-day today">${i}</div>`;
            } else {
                days += `<div class="calendar-day">${i}</div>`;
            }
        }

        // Next month days
        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="calendar-day other-month">${j}</div>`;
        }

        calendarDays.innerHTML = days;

        // Add click event to days
        document.querySelectorAll('.calendar-day:not(.other-month)').forEach(day => {
            day.addEventListener('click', () => {
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                day.classList.add('selected');
            });
        });
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});