document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('searchInput');

    const talksData = %%TALKS_DATA%%;

    const generateSchedule = (talks) => {
        const schedule = [];
        let currentTime = new Date('2024-01-01T10:00:00');

        const formatTime = (date) => {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        };

        talks.forEach((talk, index) => {
            if (index === 3) {
                schedule.push({
                    type: 'break',
                    title: 'Lunch Break',
                    startTime: formatTime(currentTime),
                    endTime: formatTime(new Date(currentTime.getTime() + 60 * 60 * 1000)),
                });
                currentTime.setMinutes(currentTime.getMinutes() + 60);
            }

            schedule.push({
                type: 'talk',
                startTime: formatTime(currentTime),
                ...talk,
                endTime: formatTime(new Date(currentTime.getTime() + talk.duration * 60 * 1000)),
            });

            currentTime.setMinutes(currentTime.getMinutes() + talk.duration + 10);
        });

        return schedule;
    };

    const renderSchedule = (schedule) => {
        scheduleContainer.innerHTML = '';
        schedule.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('schedule-item');

            if (item.type === 'break') {
                itemDiv.classList.add('break');
                itemDiv.innerHTML = `
                    <div class="time">${item.startTime} - ${item.endTime}</div>
                    <div class="details">
                        <h2>${item.title}</h2>
                    </div>
                `;
            } else {
                itemDiv.innerHTML = `
                    <div class="time">${item.startTime} - ${item.endTime}</div>
                    <div class="details">
                        <h2>${item.title}</h2>
                        <div class="speakers">${item.speakers.join(', ')}</div>
                        <p>${item.description}</p>
                        <div class="category">
                            ${item.category.map(cat => `<span>${cat}</span>`).join('')}
                        </div>
                    </div>
                `;
            }
            scheduleContainer.appendChild(itemDiv);
        });
    };

    const filterTalks = (query) => {
        const filteredTalks = talksData.talks.filter(talk => {
            return talk.category.some(cat => cat.toLowerCase().includes(query.toLowerCase()));
        });
        const schedule = generateSchedule(filteredTalks);
        renderSchedule(schedule);
    };

    searchInput.addEventListener('input', (e) => {
        filterTalks(e.target.value);
    });

    // Initial render
    const initialSchedule = generateSchedule(talksData.talks);
    renderSchedule(initialSchedule);
});
