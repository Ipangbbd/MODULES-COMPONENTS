const calGrid = document.getElementById('calGrid');
const monthYear = document.getElementById('monthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');

let currenDate = new Date();

function renderCal(date) {
    calGrid.innerHTML = ``;
    const year = date.getFullYear();
    const month = date.getMonth();

    const monthsName = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    monthYear.textContent = `${monthsName[month]} ${year}`;

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('day');
        calGrid.appendChild(dayElement);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptySlot = document.createElement('div');
        calGrid.appendChild(emptySlot);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;

        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayElement.classList.add('today');
        }

        calGrid.appendChild(dayElement);
    }
}

prevMonth.addEventListener('click', () => {
    currenDate.setMonth(currenDate.getMonth() - 1);
    renderCal(currenDate);
});

nextMonth.addEventListener('click', () => {
    currenDate.setMonth(currenDate.getMonth() + 1)
    renderCal(currenDate);
});

renderCal(currenDate);  