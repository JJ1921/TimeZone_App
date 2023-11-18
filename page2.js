const UI = {
    date: document.querySelector('.date'),
    am_pm: document.querySelector('.am-pm'),
    second: document.querySelector('.hand--second'),
    minute: document.querySelector('.hand--minute'),
    hour: document.querySelector('.hand--hour'),
};

// Function to update the clock based on the Time Zone selected
function updateCustomClock(hours, minutes, seconds) {
    const secondsDegrees = seconds / 60 * 360;
    const minutesDegrees = (minutes + seconds / 60) / 60 * 360;
    const hoursDegrees = (hours + minutes / 60) / 12 * 360;

    // UI Update
    UI.date.textContent = new Date().getDate();
    UI.am_pm.textContent = hours >= 12 ? 'PM' : 'AM';
    UI.second.style.transform = `rotate(${secondsDegrees}deg)`;
    UI.minute.style.transform = `rotate(${minutesDegrees}deg)`;
    UI.hour.style.transform = `rotate(${hoursDegrees}deg)`;
}

// Function to set a time
function setCustomTimeAndAnimate(hours, minutes, seconds) {
    const customDate = new Date();
    customDate.setHours(hours);
    customDate.setMinutes(minutes);
    customDate.setSeconds(seconds);

    function animateClock() {
        updateCustomClock(customDate.getHours(), customDate.getMinutes(), customDate.getSeconds());
        customDate.setSeconds(customDate.getSeconds() + 1);
        setTimeout(animateClock, 1000); // Update every second
    }

    animateClock();
}

document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'SNRQ7313WJD3';
    const TimeZone = sessionStorage.getItem('timezone');

    if (sessionStorage.getItem('timezone') == "") {
        TimeZone = 'Asia/Manila';
    }
    

    // h2 value
    const h2Element = document.querySelector('h2');
    //h2Element.textContent = `${TimeZone}`;
    if (h2Element.textContent == null) {
        h2Element.textContent = 'Asia/Manila';
    } else {
        h2Element.textContent = TimeZone;
    }


    const apiUrl = `http://api.timezonedb.com/v2/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${TimeZone}`;

    // Fetch the current time of selected Time Zone
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const abidjanTime = document.getElementById('abidjanTime');
            const currentTime = new Date(data.formatted);

            // Extract values
            const d = currentTime.getDate();
            let h = currentTime.getHours();
            const m = currentTime.getMinutes();
            const s = currentTime.getSeconds();

            setCustomTimeAndAnimate(h, m, s);
        })
        .catch(error => console.error('Error fetching Abidjan time:', error));
});