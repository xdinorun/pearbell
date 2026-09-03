const schoolScreen =
    document.getElementById("school-screen");

const countdownScreen =
    document.getElementById("countdown-screen");

const schoolButtons =
    document.querySelectorAll(".school-button");

const changeSchoolButton =
    document.getElementById("change-school");

const countdownEl =
    document.getElementById("countdown");

const countdownLabelEl =
    document.getElementById("countdown-label");

const currentPeriodEl =
    document.getElementById("current-period");

const periodTimesEl =
    document.getElementById("period-times");

const schoolNameEl =
    document.getElementById("school-name");


/* =========================================
   SCHOOLS
========================================= */

const schools = {
    wilcox:
        window.PearBellSchedules.wilcox,

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
   DATE / TIME HELPERS
========================================= */

function getDateString(date) {
    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function getLocalDateString() {
    return getDateString(
        new Date()
    );
}


function createDateWithTime(
    baseDate,
    timeString
) {
    const [hours, minutes] =
        timeString
            .split(":")
            .map(Number);

    const date =
        new Date(baseDate);

    date.setHours(
        hours,
        minutes,
        0,
        0
    );

    return date;
}


function timeToDate(timeString) {
    return createDateWithTime(
        new Date(),
        timeString
    );
}


function formatTime(timeString) {
    const date =
        createDateWithTime(
            new Date(),
            timeString
        );

    return date.toLocaleTimeString(
        [],
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );
}


function formatNextSchoolDate(
    date,
    timeString
) {
    const schoolTime =
        createDateWithTime(
            date,
            timeString
        );

    const dateText =
        schoolTime.toLocaleDateString(
            [],
            {
                weekday: "long",
                month: "short",
                day: "numeric"
            }
        );

    const timeText =
        schoolTime.toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );

    return `${dateText} • ${timeText}`;
}


/* =========================================
   SCHOOL YEAR
========================================= */

function isOutsideSchoolYear(
    school,
    date = new Date()
) {
    if (
        !school.schoolYear ||
        typeof school.schoolYear !== "object"
    ) {
        return false;
    }

    if (
        !school.schoolYear.start ||
        !school.schoolYear.end
    ) {
        return false;
    }

    const dateString =
        getDateString(date);

    return (
        dateString <
            school.schoolYear.start ||
        dateString >
            school.schoolYear.end
    );
}


/* =========================================
   EXCEPTIONS
========================================= */

function getExceptionForDate(
    school,
    date
) {
    const dateString =
        getDateString(date);

    return (
        school.exceptions?.[
            dateString
        ] ||
        null
    );
}


function getTodayException(school) {
    return getExceptionForDate(
        school,
        new Date()
    );
}


/* =========================================
   GET SCHEDULE FOR ANY DATE
========================================= */

function getScheduleForDate(
    school,
    date
) {
    const day =
        date.getDay();

    const exception =
        getExceptionForDate(
            school,
            date
        );


    /* -------------------------------------
       Outside school year
    ------------------------------------- */

    if (
        isOutsideSchoolYear(
            school,
            date
        )
    ) {
        return [];
    }


    /* -------------------------------------
       Special-date exceptions
    ------------------------------------- */

    if (exception) {

        if (
            exception.type ===
            "noSchool"
        ) {
            return [];
        }


        if (
            exception.type ===
            "scheduleUnavailable"
        ) {
            return [];
        }


        if (
            exception.schedule &&
            Array.isArray(
                exception.schedule
            )
        ) {
            return exception.schedule;
        }


        if (
            exception.scheduleName
        ) {

            if (
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


            if (
                school.schedules?.[
                    exception.scheduleName
                ]
            ) {
                return (
                    school.schedules[
                        exception.scheduleName
                    ]
                );
            }
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
        return (
            school.schedules.monday
        );
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


function getScheduleForToday(school) {
    return getScheduleForDate(
        school,
        new Date()
    );
}


/* =========================================
   FIND NEXT SCHOOL START
========================================= */

function findNextSchoolStart(school) {

    const now =
        new Date();


    /*
       Search up to 60 days ahead.

       This is enough to cross weekends and
       normal school breaks while remaining
       inside the current school-year data.
    */

    for (
        let offset = 1;
        offset <= 60;
        offset++
    ) {

        const date =
            new Date(now);

        date.setDate(
            now.getDate() + offset
        );

        date.setHours(
            0,
            0,
            0,
            0
        );


        /*
           Stop if this school has a defined
           school year and we've gone beyond it.
        */

        if (
            school.schoolYear &&
            typeof school.schoolYear ===
                "object" &&
            school.schoolYear.end &&
            getDateString(date) >
                school.schoolYear.end
        ) {
            return null;
        }


        const exception =
            getExceptionForDate(
                school,
                date
            );


        /*
           We know school occurs, but we don't
           trust ourselves to know its start time.

           Don't skip over this day and pretend
           the next normal day is the next day
           of school.
        */

        if (
            exception?.type ===
            "scheduleUnavailable"
        ) {
            return {
                unavailable: true,
                date,
                label:
                    exception.label ||
                    "Special schedule"
            };
        }


        const schedule =
            getScheduleForDate(
                school,
                date
            );


        if (
            schedule.length === 0
        ) {
            continue;
        }


        const firstBlock =
            schedule[0];


        const start =
            createDateWithTime(
                date,
                firstBlock.start
            );


        return {
            unavailable: false,
            date,
            start,
            firstBlock
        };
    }


    return null;
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
            timeToDate(
                block.start
            );

        const end =
            timeToDate(
                block.end
            );

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
            timeToDate(
                block.start
            );

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


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (
                totalSeconds % 86400
            ) / 3600
        );


    const minutes =
        Math.floor(
            (
                totalSeconds % 3600
            ) / 60
        );


    const seconds =
        totalSeconds % 60;


    /*
       Longer countdowns:
       2d 14:32:08
    */

    if (
        days > 0
    ) {
        return (
            `${days}d ` +
            `${String(hours).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`
        );
    }


    /*
       Same-day countdowns over one hour:
       2:32:08
    */

    if (
        hours > 0
    ) {
        return (
            `${hours}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`
        );
    }


    /*
       Normal class countdown:
       32:08
    */

    return (
        `${minutes}:` +
        `${String(seconds).padStart(2, "0")}`
    );
}


/* =========================================
   SHOW NEXT SCHOOL COUNTDOWN
========================================= */

function showNextSchoolCountdown(
    school,
    currentLabel
) {
    const nextSchool =
        findNextSchoolStart(
            school
        );


    /*
       No upcoming verified school day found.
    */

    if (
        !nextSchool
    ) {
        countdownEl.textContent =
            "—";

        countdownLabelEl.textContent =
            "No upcoming schedule available";

        currentPeriodEl.textContent =
            currentLabel;

        periodTimesEl.textContent =
            "";

        return;
    }


    /*
       The next school day is known to have
       a special schedule, but we don't know
       its exact starting time.
    */

    if (
        nextSchool.unavailable
    ) {
        countdownEl.textContent =
            "—";

        countdownLabelEl.textContent =
            "Next school schedule not verified";

        currentPeriodEl.textContent =
            currentLabel;

        periodTimesEl.textContent =
            nextSchool.label;

        return;
    }


    const remaining =
        nextSchool.start -
        new Date();


    countdownEl.textContent =
        formatCountdown(
            remaining
        );


    countdownLabelEl.textContent =
        "until school starts";


    currentPeriodEl.textContent =
        currentLabel;


    periodTimesEl.textContent =
        `Next: ${formatNextSchoolDate(
            nextSchool.date,
            nextSchool.firstBlock.start
        )}`;
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
       Outside school year
    ------------------------------------- */

    if (
        isOutsideSchoolYear(
            school
        )
    ) {
        countdownEl.textContent =
            "—";

        countdownLabelEl.textContent =
            "School is not in session";

        currentPeriodEl.textContent =
            "Summer Break";

        periodTimesEl.textContent =
            "";

        return;
    }


    /* -------------------------------------
       Today's schedule is intentionally
       unavailable
    ------------------------------------- */

    if (
        exception?.type ===
        "scheduleUnavailable"
    ) {
        countdownEl.textContent =
            "—";

        countdownLabelEl.textContent =
            exception.label ||
            "Special schedule today";

        currentPeriodEl.textContent =
            "Special Schedule";

        periodTimesEl.textContent =
            "";

        return;
    }


    /* -------------------------------------
       No school today

       Still count down to the next known
       school start.
    ------------------------------------- */

    if (
        exception?.type ===
        "noSchool"
    ) {
        showNextSchoolCountdown(
            school,
            exception.label ||
                "No School"
        );

        return;
    }


    /* -------------------------------------
       Weekend

       Count down to Monday / next valid
       school day.
    ------------------------------------- */

    if (
        schedule.length === 0
    ) {
        const day =
            new Date().getDay();


        if (
            day === 0 ||
            day === 6
        ) {
            showNextSchoolCountdown(
                school,
                "Weekend"
            );
        }

        else {
            showNextSchoolCountdown(
                school,
                "No School"
            );
        }


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
            `${formatTime(
                currentBlock.start
            )} → ${formatTime(
                currentBlock.end
            )}`;


        return;
    }


    /* -------------------------------------
       Before school / gap before block
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
            `First bell: ${formatTime(
                nextBlock.start
            )}`;


        return;
    }


    /* -------------------------------------
       AFTER SCHOOL

       Instead of stopping, count down
       to the next school day.
    ------------------------------------- */

    showNextSchoolCountdown(
        school,
        "School is over"
    );
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
