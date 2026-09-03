/* =========================================
   ELEMENTS
========================================= */

const schoolScreen =
    document.getElementById(
        "school-screen"
    );

const countdownScreen =
    document.getElementById(
        "countdown-screen"
    );

const schoolSelect =
    document.getElementById(
        "school-select"
    );

const schoolConfirmButton =
    document.getElementById(
        "school-confirm"
    );

const changeSchoolButton =
    document.getElementById(
        "change-school"
    );

const countdownEl =
    document.getElementById(
        "countdown"
    );

const countdownLabelEl =
    document.getElementById(
        "countdown-label"
    );

const currentPeriodEl =
    document.getElementById(
        "current-period"
    );

const periodTimesEl =
    document.getElementById(
        "period-times"
    );

const nextBlockContainer =
    document.getElementById(
        "next-block-container"
    );

const nextPeriodEl =
    document.getElementById(
        "next-period"
    );

const nextPeriodTimesEl =
    document.getElementById(
        "next-period-times"
    );

const schoolNameEl =
    document.getElementById(
        "school-name"
    );


/* =========================================
   THEME ELEMENTS
========================================= */

const themeToggle =
    document.getElementById(
        "theme-toggle"
    );

const themePanel =
    document.getElementById(
        "theme-panel"
    );

const themeClose =
    document.getElementById(
        "theme-close"
    );

const backgroundColorInput =
    document.getElementById(
        "background-color"
    );

const textColorInput =
    document.getElementById(
        "text-color"
    );

const resetThemeButton =
    document.getElementById(
        "reset-theme"
    );

const themePresets =
    document.querySelectorAll(
        ".theme-preset"
    );


/* =========================================
   SCHOOLS
========================================= */

const schools = {

    wilcox:
        window.PearBellSchedules
            .wilcox,

    "santa-clara":
        window.PearBellSchedules
            .santaClara,

    cupertino:
        window.PearBellSchedules
            .cupertino
};


/* =========================================
   SAVED SCHOOL
========================================= */

let selectedSchool =
    localStorage.getItem(
        "pearbell-school"
    );


/* =========================================
   INTRO ANIMATION
========================================= */

function playIntroAnimation() {

    /*
        Remove the animation class first.
        This resets the animation even if
        the user already saw it earlier.
    */

    schoolScreen.classList.remove(
        "play-intro"
    );


    /*
        Force the browser to acknowledge
        the reset before adding it again.
        This makes Chrome reliably replay it.
    */

    void schoolScreen.offsetWidth;


    schoolScreen.classList.add(
        "play-intro"
    );
}


/* =========================================
   DATE HELPERS
========================================= */

function getDateString(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );

    return (
        `${year}-${month}-${day}`
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

    const result =
        new Date(baseDate);

    result.setHours(
        hours,
        minutes,
        0,
        0
    );

    return result;
}


function timeToDate(
    timeString
) {

    return createDateWithTime(
        new Date(),
        timeString
    );
}


function formatTime(
    timeString
) {

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


function formatDateAndTime(
    date,
    timeString
) {

    const dateWithTime =
        createDateWithTime(
            date,
            timeString
        );

    const dateText =
        dateWithTime.toLocaleDateString(
            [],
            {
                weekday: "long",
                month: "short",
                day: "numeric"
            }
        );

    const timeText =
        dateWithTime.toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );

    return (
        `${dateText} • ${timeText}`
    );
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
        typeof school.schoolYear
            !== "object"
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
        getDateString(
            date
        );

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
        getDateString(
            date
        );

    return (
        school.exceptions?.[
            dateString
        ] ||
        null
    );
}


/* =========================================
   SCHEDULE FOR DATE
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


    if (
        isOutsideSchoolYear(
            school,
            date
        )
    ) {
        return [];
    }


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
            Array.isArray(
                exception.schedule
            )
        ) {
            return (
                exception.schedule
            );
        }


        if (
            exception.scheduleName
        ) {

            if (
                school
                    .specialSchedules?.[
                        exception
                            .scheduleName
                    ]
            ) {

                return (
                    school
                        .specialSchedules[
                            exception
                                .scheduleName
                        ]
                );
            }


            if (
                school.schedules?.[
                    exception
                        .scheduleName
                ]
            ) {

                return (
                    school.schedules[
                        exception
                            .scheduleName
                    ]
                );
            }
        }
    }


    if (
        day === 0 ||
        day === 6
    ) {
        return [];
    }


    if (
        day === 1 &&
        school.schedules.monday
    ) {
        return (
            school.schedules.monday
        );
    }


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
   CURRENT BLOCK
========================================= */

function findCurrentBlock(
    schedule
) {

    const now =
        new Date();


    for (
        let index = 0;
        index < schedule.length;
        index++
    ) {

        const block =
            schedule[index];

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

            return {
                block,
                index
            };
        }
    }


    return null;
}


/* =========================================
   NEXT BLOCK
========================================= */

function findNextBlock(
    schedule
) {

    const now =
        new Date();


    for (
        let index = 0;
        index < schedule.length;
        index++
    ) {

        const block =
            schedule[index];

        const start =
            timeToDate(
                block.start
            );


        if (
            start > now
        ) {

            return {
                block,
                index
            };
        }
    }


    return null;
}


/* =========================================
   NEXT SCHOOL DAY
========================================= */

function findNextSchoolStart(
    school
) {

    const now =
        new Date();


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


        if (
            school.schoolYear &&
            typeof school.schoolYear
                === "object" &&
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
   COUNTDOWN FORMAT
========================================= */

function formatCountdown(
    milliseconds
) {

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
   NEXT BLOCK DISPLAY
========================================= */

function showNextBlockInfo(
    schedule,
    currentIndex
) {

    const next =
        schedule[
            currentIndex + 1
        ];


    if (!next) {

        nextBlockContainer
            .classList
            .add(
                "hidden"
            );

        return;
    }


    nextBlockContainer
        .classList
        .remove(
            "hidden"
        );


    nextPeriodEl.textContent =
        next.name;


    nextPeriodTimesEl.textContent =
        `${formatTime(next.start)} → ${formatTime(next.end)}`;
}


/* =========================================
   NEXT SCHOOL COUNTDOWN
========================================= */

function showNextSchoolCountdown(
    school,
    statusLabel
) {

    const nextSchool =
        findNextSchoolStart(
            school
        );


    nextBlockContainer
        .classList
        .add(
            "hidden"
        );


    if (!nextSchool) {

        countdownEl.textContent =
            "—";

        countdownLabelEl.textContent =
            "No upcoming schedule available";

        currentPeriodEl.textContent =
            statusLabel;

        periodTimesEl.textContent =
            "";

        return;
    }


    if (
        nextSchool.unavailable
    ) {

        countdownEl.textContent =
            "—";

        countdownLabelEl.textContent =
            "Next school schedule not verified";

        currentPeriodEl.textContent =
            statusLabel;

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
        statusLabel;


    periodTimesEl.textContent =
        `Next: ${formatDateAndTime(
            nextSchool.date,
            nextSchool.firstBlock.start
        )}`;
}


/* =========================================
   UPDATE COUNTDOWN
========================================= */

function updateCountdown() {

    if (
        !selectedSchool
    ) {
        return;
    }


    const school =
        schools[
            selectedSchool
        ];


    if (!school) {
        return;
    }


    schoolNameEl.textContent =
        school.name;


    const now =
        new Date();


    const schedule =
        getScheduleForDate(
            school,
            now
        );


    const exception =
        getExceptionForDate(
            school,
            now
        );


    /* OUTSIDE SCHOOL YEAR */

    if (
        isOutsideSchoolYear(
            school,
            now
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

        nextBlockContainer
            .classList
            .add(
                "hidden"
            );

        return;
    }


    /* SPECIAL SCHEDULE NOT VERIFIED */

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

        nextBlockContainer
            .classList
            .add(
                "hidden"
            );

        return;
    }


    /* NO SCHOOL */

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


    /* WEEKEND */

    if (
        schedule.length === 0
    ) {

        const day =
            now.getDay();


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


    /* CURRENT BLOCK */

    const current =
        findCurrentBlock(
            schedule
        );


    if (current) {

        const block =
            current.block;


        const end =
            timeToDate(
                block.end
            );


        const remaining =
            end - now;


        countdownEl.textContent =
            formatCountdown(
                remaining
            );


        countdownLabelEl.textContent =
            `until ${block.name} ends`;


        currentPeriodEl.textContent =
            block.name;


        periodTimesEl.textContent =
            `${formatTime(block.start)} → ${formatTime(block.end)}`;


        showNextBlockInfo(
            schedule,
            current.index
        );


        return;
    }


    /* BEFORE SCHOOL */

    const next =
        findNextBlock(
            schedule
        );


    if (next) {

        const block =
            next.block;


        const start =
            timeToDate(
                block.start
            );


        const remaining =
            start - now;


        countdownEl.textContent =
            formatCountdown(
                remaining
            );


        countdownLabelEl.textContent =
            `until ${block.name} starts`;


        currentPeriodEl.textContent =
            "Before School";


        periodTimesEl.textContent =
            `First bell: ${formatTime(block.start)}`;


        nextBlockContainer
            .classList
            .remove(
                "hidden"
            );


        nextPeriodEl.textContent =
            block.name;


        nextPeriodTimesEl.textContent =
            `${formatTime(block.start)} → ${formatTime(block.end)}`;


        return;
    }


    /* AFTER SCHOOL */

    showNextSchoolCountdown(
        school,
        "School is over"
    );
}


/* =========================================
   SCHOOL PICKER
========================================= */

function showSchoolPicker() {

    countdownScreen
        .classList
        .add(
            "hidden"
        );


    schoolScreen
        .classList
        .remove(
            "hidden"
        );


    schoolSelect.value =
        "";


    schoolConfirmButton.disabled =
        true;


    /*
        Replay the pear animation every
        time this screen is opened.
    */

    requestAnimationFrame(
        () => {
            playIntroAnimation();
        }
    );
}


function showCountdown() {

    schoolScreen
        .classList
        .add(
            "hidden"
        );


    countdownScreen
        .classList
        .remove(
            "hidden"
        );


    updateCountdown();
}


/* =========================================
   SCHOOL DROPDOWN

   IMPORTANT:
   Changing the dropdown DOES NOT select
   the school.

   It ONLY enables the Continue button.
========================================= */

schoolSelect
    .addEventListener(
        "change",
        event => {

            /*
                Stop this change event from
                triggering anything elsewhere.
            */

            event.stopPropagation();


            const value =
                schoolSelect.value;


            schoolConfirmButton.disabled =
                !value ||
                !schools[value];
        }
    );


/* =========================================
   CONTINUE

   This is the ONLY place where a newly
   chosen school is saved/opened.
========================================= */

schoolConfirmButton
    .addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();


            const value =
                schoolSelect.value;


            if (
                !value ||
                !schools[value]
            ) {
                return;
            }


            selectedSchool =
                value;


            localStorage.setItem(
                "pearbell-school",
                selectedSchool
            );


            showCountdown();
        }
    );


/* =========================================
   CHANGE SCHOOL
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
   THEMES
========================================= */

const DEFAULT_BACKGROUND =
    "#ffffff";

const DEFAULT_TEXT =
    "#111111";


function applyTheme(
    background,
    text,
    save = true
) {

    document.documentElement
        .style
        .setProperty(
            "--background",
            background
        );


    document.documentElement
        .style
        .setProperty(
            "--text",
            text
        );


    backgroundColorInput.value =
        background;


    textColorInput.value =
        text;


    const themeColorMeta =
        document.querySelector(
            'meta[name="theme-color"]'
        );


    if (
        themeColorMeta
    ) {

        themeColorMeta
            .setAttribute(
                "content",
                background
            );
    }


    if (save) {

        localStorage.setItem(
            "pearbell-background",
            background
        );


        localStorage.setItem(
            "pearbell-text",
            text
        );
    }
}


function loadTheme() {

    const background =
        localStorage.getItem(
            "pearbell-background"
        ) ||
        DEFAULT_BACKGROUND;


    const text =
        localStorage.getItem(
            "pearbell-text"
        ) ||
        DEFAULT_TEXT;


    applyTheme(
        background,
        text,
        false
    );
}


function openThemePanel() {

    themePanel
        .classList
        .remove(
            "hidden"
        );


    themeToggle
        .setAttribute(
            "aria-expanded",
            "true"
        );
}


function closeThemePanel() {

    themePanel
        .classList
        .add(
            "hidden"
        );


    themeToggle
        .setAttribute(
            "aria-expanded",
            "false"
        );
}


themeToggle
    .addEventListener(
        "click",
        () => {

            const isHidden =
                themePanel
                    .classList
                    .contains(
                        "hidden"
                    );


            if (isHidden) {
                openThemePanel();
            }

            else {
                closeThemePanel();
            }
        }
    );


themeClose
    .addEventListener(
        "click",
        closeThemePanel
    );


backgroundColorInput
    .addEventListener(
        "input",
        () => {

            applyTheme(
                backgroundColorInput.value,
                textColorInput.value
            );
        }
    );


textColorInput
    .addEventListener(
        "input",
        () => {

            applyTheme(
                backgroundColorInput.value,
                textColorInput.value
            );
        }
    );


themePresets
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    applyTheme(
                        button.dataset.background,
                        button.dataset.text
                    );
                }
            );
        }
    );


resetThemeButton
    .addEventListener(
        "click",
        () => {

            applyTheme(
                DEFAULT_BACKGROUND,
                DEFAULT_TEXT
            );
        }
    );


document
    .addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {
                closeThemePanel();
            }
        }
    );


document
    .addEventListener(
        "click",
        event => {

            if (
                themePanel
                    .classList
                    .contains(
                        "hidden"
                    )
            ) {
                return;
            }


            if (
                themePanel.contains(
                    event.target
                ) ||
                themeToggle.contains(
                    event.target
                )
            ) {
                return;
            }


            closeThemePanel();
        }
    );


/* =========================================
   INITIAL LOAD
========================================= */

loadTheme();


if (
    selectedSchool &&
    schools[
        selectedSchool
    ]
) {

    showCountdown();
}

else {

    selectedSchool =
        null;


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
