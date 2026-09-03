const schoolScreen = document.getElementById("school-screen");
const countdownScreen = document.getElementById("countdown-screen");

const schoolButtons = document.querySelectorAll(".school-button");
const changeSchoolButton = document.getElementById("change-school");

const countdownEl = document.getElementById("countdown");
const countdownLabelEl = document.getElementById("countdown-label");
const currentPeriodEl = document.getElementById("current-period");
const periodTimesEl = document.getElementById("period-times");
const schoolNameEl = document.getElementById("school-name");


/* =========================================
   SCHOOLS
========================================= */

const schools = {
    wilcox: window.PearBellSchedules.wilcox,

    "santa-clara":
        window.PearBellSchedules.santaClara,

    cupertino:
        window.PearBellSchedules.cupertino
};


/* =========================================
   SAVED SCHOOL
========================================= */

let selectedSchool =
    localStorage.getItem("pearbell-school");


/* =========================================
   TIME HELPERS
========================================= */

function timeToDate(timeString) {
    const [hours, minutes] =
        timeString.split(":").map(Number);

    const date = new Date();

    date.setHours(
        hours,
        minutes,
        0,
        0
    );

    return date;
}


function formatTime(timeString) {
    const [hours, minutes] =
        timeString.split(":").map(Number);

    const date = new Date();

    date.setHours(
        hours,
        minutes,
        0,
        0
    );

    return date.toLocaleTimeString(
        [],
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );
}


function getLocalDateString() {
    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            now.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


/* =========================================
   SCHEDULE SELECTION
========================================= */

function getTodayException(school) {
    const today =
        getLocalDateString();

    return (
        school.exceptions?.[today]
        || null
    );
}


function getScheduleForToday(school) {
    const day =
        new Date().getDay();

    const exception =
        getTodayException(school);


    /* -------------------------------------
       Special date
    ------------------------------------- */

    if (exception) {

        if (
            exception.type ===
            "noSchool"
        ) {
            return [];
        }

        if (
            exception.schedule
        ) {
            return exception.schedule;
        }

        if (
            exception.scheduleName &&
            school.specialSchedules?.[
                exception.scheduleName
            ]
        ) {
            return (
                school.specialSchedules[
                    exception.scheduleName
                ]
            );
        }
    }


    /* -------------------------------------
       Weekend
    ------------------------------------- */

    if (
        day === 0 ||
        day === 6
    ) {
        return [];
    }


    /* -------------------------------------
       Monday
    ------------------------------------- */

    if (
        day === 1 &&
        school.schedules.monday
    ) {
        return school.schedules.monday;
    }


    /* -------------------------------------
       Tuesday / Thursday
    ------------------------------------- */

    if (
        (
            day === 2 ||
            day === 4
        ) &&
        school.schedules
            .tuesdayThursday
    ) {
        return (
            school.schedules
                .tuesdayThursday
        );
    }


    /* -------------------------------------
       Wednesday / Friday
    ------------------------------------- */

    if (
        (
            day === 3 ||
            day === 5
        ) &&
        school.schedules
            .wednesdayFriday
    ) {
        return (
            school.schedules
                .wednesdayFriday
        );
    }


    /* -------------------------------------
       Same schedule every weekday
    ------------------------------------- */

    if (
        school.schedules.default
    ) {
        return (
            school.schedules.default
        );
    }


    return [];
}


/* =========================================
   CURRENT / NEXT BLOCK
========================================= */

function findCurrentBlock(schedule) {
    const now =
        new Date();

    for (
        const block of schedule
    ) {
        const start =
            timeToDate(block.start);

        const end =
            timeToDate(block.end);

        if (
            now >= start &&
            now < end
        ) {
            return block;
        }
    }

    return null;
}


function findNextBlock(schedule) {
    const now =
        new Date();

    for (
        const block of schedule
    ) {
        const start =
            timeToDate(block.start);

        if (
            start > now
        ) {
            return block;
        }
    }

    return null;
}


/* =========================================
   COUNTDOWN FORMAT
========================================= */

function formatCountdown(milliseconds) {
    const totalSeconds =
        Math.max(
            0,
            Math.ceil(
                milliseconds / 1000
            )
        );

    const hours =
        Math.floor(
            totalSeconds / 3600
        );

    const minutes =
        Math.floor(
            (
                totalSeconds % 3600
            ) / 60
        );

    const seconds =
        totalSeconds % 60;


    if (
        hours > 0
    ) {
        return (
            `${hours}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`
        );
    }


    return (
        `${minutes}:` +
        `${String(seconds).padStart(2, "0")}`
    );
}


/* =========================================
   MAIN COUNTDOWN
========================================= */

function updateCountdown() {

    if (
        !selectedSchool
    ) {
        return;
    }


    const school =
        schools[selectedSchool];


    if (
        !school
    ) {
        return;
    }


    const schedule =
        getScheduleForToday(
            school
        );

    const exception =
        getTodayException(
            school
        );


    schoolNameEl.textContent =
        school.name;


    /* -------------------------------------
       No schedule today
    ------------------------------------- */

    if (
        schedule.length === 0
    ) {
        countdownEl.textContent =
            "—";


        if (
            exception?.type ===
            "noSchool"
        ) {
            countdownLabelEl.textContent =
                exception.label ||
                "No school today";

            currentPeriodEl.textContent =
                "No School";
        }

        else {

            const day =
                new Date()
                    .getDay();

            if (
                day === 0 ||
                day === 6
            ) {
                countdownLabelEl.textContent =
                    "No school today";

                currentPeriodEl.textContent =
                    "Weekend";
            }

            else {
                countdownLabelEl.textContent =
                    "No schedule today";

                currentPeriodEl.textContent =
                    "No School";
            }
        }


        periodTimesEl.textContent =
            "";

        return;
    }


    /* -------------------------------------
       Current block
    ------------------------------------- */

    const currentBlock =
        findCurrentBlock(
            schedule
        );


    if (
        currentBlock
    ) {
        const end =
            timeToDate(
                currentBlock.end
            );

        const remaining =
            end -
            new Date();


        countdownEl.textContent =
            formatCountdown(
                remaining
            );


        countdownLabelEl.textContent =
            `until ${currentBlock.name} ends`;


        currentPeriodEl.textContent =
            currentBlock.name;


        periodTimesEl.textContent =
            `${formatTime(currentBlock.start)} → ${formatTime(currentBlock.end)}`;


        return;
    }


    /* -------------------------------------
       Next block
    ------------------------------------- */

    const nextBlock =
        findNextBlock(
            schedule
        );


    if (
        nextBlock
    ) {
        const start =
            timeToDate(
                nextBlock.start
            );

        const remaining =
            start -
            new Date();


        countdownEl.textContent =
            formatCountdown(
                remaining
            );


        countdownLabelEl.textContent =
            `until ${nextBlock.name} starts`;


        currentPeriodEl.textContent =
            "Before School";


        periodTimesEl.textContent =
            `First bell: ${formatTime(nextBlock.start)}`;


        return;
    }


    /* -------------------------------------
       School finished
    ------------------------------------- */

    countdownEl.textContent =
        "—";

    countdownLabelEl.textContent =
        "School is over";

    currentPeriodEl.textContent =
        "Done for today";

    periodTimesEl.textContent =
        "";
}


/* =========================================
   SCREEN NAVIGATION
========================================= */

function showSchoolPicker() {
    schoolScreen
        .classList
        .remove("hidden");

    countdownScreen
        .classList
        .add("hidden");
}


function showCountdown() {
    schoolScreen
        .classList
        .add("hidden");

    countdownScreen
        .classList
        .remove("hidden");

    updateCountdown();
}


/* =========================================
   SCHOOL BUTTONS
========================================= */

schoolButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                selectedSchool =
                    button.dataset.school;


                localStorage.setItem(
                    "pearbell-school",
                    selectedSchool
                );


                showCountdown();
            }
        );
    }
);


/* =========================================
   RECHOOSE SCHOOL
========================================= */

changeSchoolButton
    .addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "pearbell-school"
            );


            selectedSchool =
                null;


            showSchoolPicker();
        }
    );


/* =========================================
   INITIAL LOAD
========================================= */

if (
    selectedSchool &&
    schools[selectedSchool]
) {
    showCountdown();
}

else {
    showSchoolPicker();
}


/* =========================================
   TIMER
========================================= */

updateCountdown();

setInterval(
    updateCountdown,
    250
);
