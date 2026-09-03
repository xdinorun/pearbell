const schoolScreen = document.getElementById("school-screen");
const countdownScreen = document.getElementById("countdown-screen");

const schoolButtons = document.querySelectorAll(".school-button");
const changeSchoolButton = document.getElementById("change-school");

const countdownEl = document.getElementById("countdown");
const countdownLabelEl = document.getElementById("countdown-label");
const currentPeriodEl = document.getElementById("current-period");
const periodTimesEl = document.getElementById("period-times");
const schoolNameEl = document.getElementById("school-name");

const schools = {
    wilcox: {
        name: "Adrian Wilcox High School",

        schedules: {
            monday: [
                { name: "1st Period", start: "08:45", end: "09:35" },
                { name: "Passing Period", start: "09:35", end: "09:40" },

                { name: "2nd Period", start: "09:40", end: "10:30" },
                { name: "Passing Period", start: "10:30", end: "10:40" },

                { name: "3rd Period", start: "10:40", end: "11:30" },
                { name: "Passing Period", start: "11:30", end: "11:35" },

                { name: "4th Period + Announcements", start: "11:35", end: "12:30" },

                { name: "Lunch", start: "12:30", end: "13:05" },
                { name: "Passing Period", start: "13:05", end: "13:10" },

                { name: "5th Period", start: "13:10", end: "14:00" },
                { name: "Passing Period", start: "14:00", end: "14:05" },

                { name: "6th Period", start: "14:05", end: "14:55" },
                { name: "Passing Period", start: "14:55", end: "15:00" },

                { name: "7th Period", start: "15:00", end: "15:50" }
            ],

            tuesdayThursday: [
                { name: "1st Period", start: "08:45", end: "10:15" },
                { name: "Passing Period", start: "10:15", end: "10:25" },

                { name: "3rd Period + Announcements", start: "10:25", end: "12:00" },

                { name: "Lunch", start: "12:00", end: "12:35" },
                { name: "Passing Period", start: "12:35", end: "12:40" },

                { name: "5th Period", start: "12:40", end: "14:10" },
                { name: "Passing Period", start: "14:10", end: "14:15" },

                { name: "7th Period", start: "14:15", end: "15:45" }
            ],

            wednesdayFriday: [
                { name: "2nd Period", start: "08:45", end: "10:15" },
                { name: "Passing Period", start: "10:15", end: "10:25" },

                { name: "SSR + Announcements", start: "10:25", end: "11:20" },

                { name: "Lunch", start: "11:20", end: "11:50" },
                { name: "Passing Period", start: "11:50", end: "12:00" },

                { name: "4th Period", start: "12:00", end: "13:30" },
                { name: "Passing Period", start: "13:30", end: "13:35" },

                { name: "6th Period", start: "13:35", end: "15:05" }
            ]
        }
    },

    "santa-clara": {
        name: "Santa Clara High School",

        schedules: {
            default: [
                { name: "1st Period", start: "08:30", end: "09:20" },
                { name: "Passing Period", start: "09:20", end: "09:27" },

                { name: "2nd Period", start: "09:27", end: "10:17" },
                { name: "Passing Period", start: "10:17", end: "10:24" },

                { name: "3rd Period", start: "10:24", end: "11:14" },

                { name: "Lunch", start: "11:14", end: "11:54" },

                { name: "4th Period", start: "11:54", end: "12:44" },
                { name: "Passing Period", start: "12:44", end: "12:51" },

                { name: "5th Period", start: "12:51", end: "13:41" },
                { name: "Passing Period", start: "13:41", end: "13:48" },

                { name: "6th Period", start: "13:48", end: "14:38" }
            ]
        }
    },

    cupertino: {
        name: "Cupertino High School",

        schedules: {
            monday: [
                { name: "1st Period", start: "08:30", end: "09:15" },
                { name: "Passing Period", start: "09:15", end: "09:20" },

                { name: "2nd Period", start: "09:20", end: "10:05" },
                { name: "Passing Period", start: "10:05", end: "10:10" },

                { name: "Tutorial", start: "10:10", end: "10:35" },
                { name: "Passing Period", start: "10:35", end: "10:40" },

                { name: "3rd Period", start: "10:40", end: "11:25" },

                { name: "Brunch", start: "11:25", end: "11:40" },
                { name: "Passing Period", start: "11:40", end: "11:50" },

                { name: "4th Period", start: "11:50", end: "12:35" },
                { name: "Passing Period", start: "12:35", end: "12:40" },

                { name: "5th Period", start: "12:40", end: "13:25" },

                { name: "Lunch", start: "13:25", end: "14:05" },
                { name: "Passing Period", start: "14:05", end: "14:15" },

                { name: "6th Period", start: "14:15", end: "15:00" },
                { name: "Passing Period", start: "15:00", end: "15:05" },

                { name: "7th Period", start: "15:05", end: "15:50" }
            ],

            tuesdayThursday: [
                { name: "1st Period", start: "08:30", end: "10:00" },
                { name: "Passing Period", start: "10:00", end: "10:05" },

                { name: "2nd Period", start: "10:05", end: "11:35" },

                { name: "Brunch", start: "11:35", end: "11:50" },
                { name: "Passing Period", start: "11:50", end: "12:00" },

                { name: "3rd Period", start: "12:00", end: "13:30" },

                { name: "Lunch", start: "13:30", end: "14:10" },
                { name: "Passing Period", start: "14:10", end: "14:20" },

                { name: "7th Period", start: "14:20", end: "15:50" }
            ],

            wednesdayFriday: [
                { name: "4th Period", start: "08:30", end: "10:05" },
                { name: "Passing Period", start: "10:05", end: "10:10" },

                { name: "Tutorial", start: "10:10", end: "10:50" },

                { name: "Brunch", start: "10:50", end: "11:05" },
                { name: "Passing Period", start: "11:05", end: "11:15" },

                { name: "5th Period", start: "11:15", end: "12:45" },

                { name: "Lunch", start: "12:45", end: "13:25" },
                { name: "Passing Period", start: "13:25", end: "13:35" },

                { name: "6th Period", start: "13:35", end: "15:05" }
            ]
        }
    }
};

let selectedSchool = localStorage.getItem("pearbell-school");

function timeToDate(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date;
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);

    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });
}

function getScheduleForToday(school) {
    const day = new Date().getDay();

    // Sunday or Saturday
    if (day === 0 || day === 6) {
        return [];
    }

    // Wilcox
    if (school === schools.wilcox) {
        if (day === 1) {
            return school.schedules.monday;
        }

        if (day === 2 || day === 4) {
            return school.schedules.tuesdayThursday;
        }

        if (day === 3 || day === 5) {
            return school.schedules.wednesdayFriday;
        }
    }

    // Cupertino
    if (school === schools.cupertino) {
        if (day === 1) {
            return school.schedules.monday;
        }

        if (day === 2 || day === 4) {
            return school.schedules.tuesdayThursday;
        }

        if (day === 3 || day === 5) {
            return school.schedules.wednesdayFriday;
        }
    }

    // Schools that currently use one default weekday schedule
    if (school.schedules.default) {
        return school.schedules.default;
    }

    return [];
}

function findCurrentBlock(schedule) {
    const now = new Date();

    for (const block of schedule) {
        const start = timeToDate(block.start);
        const end = timeToDate(block.end);

        if (now >= start && now < end) {
            return block;
        }
    }

    return null;
}

function findNextBlock(schedule) {
    const now = new Date();

    for (const block of schedule) {
        const start = timeToDate(block.start);

        if (start > now) {
            return block;
        }
    }

    return null;
}

function formatCountdown(milliseconds) {
    const totalSeconds = Math.max(
        0,
        Math.ceil(milliseconds / 1000)
    );

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function updateCountdown() {
    if (!selectedSchool) {
        return;
    }

    const school = schools[selectedSchool];

    if (!school) {
        return;
    }

    const schedule = getScheduleForToday(school);

    schoolNameEl.textContent = school.name;

    if (schedule.length === 0) {
        countdownEl.textContent = "—";
        countdownLabelEl.textContent = "No school today";
        currentPeriodEl.textContent = "Weekend";
        periodTimesEl.textContent = "";

        return;
    }

    const currentBlock = findCurrentBlock(schedule);

    if (currentBlock) {
        const end = timeToDate(currentBlock.end);
        const remaining = end - new Date();

        countdownEl.textContent = formatCountdown(remaining);

        countdownLabelEl.textContent =
            `until ${currentBlock.name} ends`;

        currentPeriodEl.textContent = currentBlock.name;

        periodTimesEl.textContent =
            `${formatTime(currentBlock.start)} → ${formatTime(currentBlock.end)}`;

        return;
    }

    const nextBlock = findNextBlock(schedule);

    if (nextBlock) {
        const start = timeToDate(nextBlock.start);
        const remaining = start - new Date();

        countdownEl.textContent = formatCountdown(remaining);

        countdownLabelEl.textContent =
            `until ${nextBlock.name} starts`;

        currentPeriodEl.textContent = "Between periods";

        periodTimesEl.textContent =
            `Next: ${formatTime(nextBlock.start)}`;

        return;
    }

    countdownEl.textContent = "—";
    countdownLabelEl.textContent = "School is over";
    currentPeriodEl.textContent = "Done for today";
    periodTimesEl.textContent = "";
}

function showSchoolPicker() {
    schoolScreen.classList.remove("hidden");
    countdownScreen.classList.add("hidden");
}

function showCountdown() {
    schoolScreen.classList.add("hidden");
    countdownScreen.classList.remove("hidden");

    updateCountdown();
}

schoolButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedSchool = button.dataset.school;

        localStorage.setItem(
            "pearbell-school",
            selectedSchool
        );

        showCountdown();
    });
});

changeSchoolButton.addEventListener("click", () => {
    localStorage.removeItem("pearbell-school");

    selectedSchool = null;

    showSchoolPicker();
});

if (selectedSchool && schools[selectedSchool]) {
    showCountdown();
} else {
    showSchoolPicker();
}

updateCountdown();

setInterval(updateCountdown, 250);
