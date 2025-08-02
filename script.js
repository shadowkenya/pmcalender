document.addEventListener('DOMContentLoaded', () => {
    const monthYear = document.getElementById('month-year');
    const currentDateDisplay = document.getElementById('current-date');
    const currentTimeDisplay = document.getElementById('current-time');
    const datesList = document.querySelector('.calendar-dates');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const yearSelect = document.getElementById('year-select');

    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Function to update the time every second
    function updateTime() {
        const now = new Date();
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        currentTimeDisplay.textContent = now.toLocaleTimeString('en-US', options);
    }
    
    // Update time initially and then every second
    updateTime();
    setInterval(updateTime, 1000);

    // Function to generate years for the dropdown menu
    function populateYearSelector() {
        for (let i = 2025; i <= 2050; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
        yearSelect.value = currentYear;
    }

    // Function to render the calendar
    function renderCalendar() {
        // Clear previous dates
        datesList.innerHTML = '';
        
        // Update header with current month and year
        monthYear.textContent = `${months[currentMonth]} ${currentYear}`;

        // Update current date display
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateDisplay.textContent = today.toLocaleDateString('en-US', options);

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

        // Add empty cells for days from the previous month
        for (let i = firstDayOfMonth; i > 0; i--) {
            const listItem = document.createElement('li');
            listItem.classList.add('inactive');
            listItem.textContent = lastDayOfPrevMonth - i + 1;
            datesList.appendChild(listItem);
        }

        // Add days for the current month
        for (let i = 1; i <= lastDayOfMonth; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = i;
            
            // Highlight today's date
            if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                listItem.classList.add('today');
            }
            
            datesList.appendChild(listItem);
        }

        // Add empty cells for days from the next month to complete the last row
        const totalCells = datesList.children.length;
        const remainingCells = 42 - totalCells; // 6 rows * 7 days
        for (let i = 1; i <= remainingCells; i++) {
            const listItem = document.createElement('li');
            listItem.classList.add('inactive');
            listItem.textContent = i;
            datesList.appendChild(listItem);
        }
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
            if (currentYear < 2025) {
                currentYear = 2025;
            }
            yearSelect.value = currentYear;
        }
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
            if (currentYear > 2050) {
                currentYear = 2050;
            }
            yearSelect.value = currentYear;
        }
        renderCalendar();
    });

    // Event listener for year selector
    yearSelect.addEventListener('change', (e) => {
        currentYear = parseInt(e.target.value);
        renderCalendar();
    });

    // Initial call to populate years and render the calendar
    populateYearSelector();
    renderCalendar();
});