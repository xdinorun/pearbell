window.PearBellSchedules = window.PearBellSchedules || {};

window.PearBellSchedules.wilcox = {
    name: "Adrian Wilcox High School",

    schoolYear: {
        name: "2026-2027",
        start: "2026-08-10",
        end: "2027-06-04"
    },

    schedules: {

        /* =====================================
           MONDAY
        ====================================== */

        monday: [
            {
                name: "1st Period",
                start: "08:45",
                end: "09:35"
            },

            {
                name: "Passing Period",
                start: "09:35",
                end: "09:40"
            },

            {
                name: "2nd Period",
                start: "09:40",
                end: "10:30"
            },

            {
                name: "Passing Period",
                start: "10:30",
                end: "10:40"
            },

            {
                name: "3rd Period",
                start: "10:40",
                end: "11:30"
            },

            {
                name: "Passing Period",
                start: "11:30",
                end: "11:35"
            },

            {
                name: "4th Period + Announcements",
                start: "11:35",
                end: "12:30"
            },

            {
                name: "Lunch",
                start: "12:30",
                end: "13:05"
            },

            {
                name: "Passing Period",
                start: "13:05",
                end: "13:10"
            },

            {
                name: "5th Period",
                start: "13:10",
                end: "14:00"
            },

            {
                name: "Passing Period",
                start: "14:00",
                end: "14:05"
            },

            {
                name: "6th Period",
                start: "14:05",
                end: "14:55"
            },

            {
                name: "Passing Period",
                start: "14:55",
                end: "15:00"
            },

            {
                name: "7th Period",
                start: "15:00",
                end: "15:50"
            }
        ],


        /* =====================================
           TUESDAY / THURSDAY
        ====================================== */

        tuesdayThursday: [
            {
                name: "1st Period",
                start: "08:45",
                end: "10:15"
            },

            {
                name: "Passing Period",
                start: "10:15",
                end: "10:25"
            },

            {
                name: "3rd Period + Announcements",
                start: "10:25",
                end: "12:00"
            },

            {
                name: "Lunch",
                start: "12:00",
                end: "12:35"
            },

            {
                name: "Passing Period",
                start: "12:35",
                end: "12:40"
            },

            {
                name: "5th Period",
                start: "12:40",
                end: "14:10"
            },

            {
                name: "Passing Period",
                start: "14:10",
                end: "14:15"
            },

            {
                name: "7th Period",
                start: "14:15",
                end: "15:45"
            }
        ],


        /* =====================================
           WEDNESDAY / FRIDAY
        ====================================== */

        wednesdayFriday: [
            {
                name: "2nd Period",
                start: "08:45",
                end: "10:15"
            },

            {
                name: "Passing Period",
                start: "10:15",
                end: "10:25"
            },

            {
                name: "SSR + Announcements",
                start: "10:25",
                end: "11:20"
            },

            {
                name: "Lunch",
                start: "11:20",
                end: "11:50"
            },

            {
                name: "Passing Period",
                start: "11:50",
                end: "12:00"
            },

            {
                name: "4th Period",
                start: "12:00",
                end: "13:30"
            },

            {
                name: "Passing Period",
                start: "13:30",
                end: "13:35"
            },

            {
                name: "6th Period",
                start: "13:35",
                end: "15:05"
            }
        ]
    },


    /* =========================================
       VERIFIED SPECIAL SCHEDULES
    ========================================== */

    specialSchedules: {

        finalsDay1: [
            {
                name: "1st Period Final",
                start: "08:45",
                end: "10:45"
            },

            {
                name: "Passing Period",
                start: "10:45",
                end: "10:50"
            },

            {
                name: "2nd Period Final",
                start: "10:50",
                end: "12:50"
            },

            {
                name: "Lunch",
                start: "12:50",
                end: "13:25"
            },

            {
                name: "Passing Period",
                start: "13:25",
                end: "13:30"
            },

            {
                name: "7th Period Final",
                start: "13:30",
                end: "15:30"
            }
        ],


        finalsDay2: [
            {
                name: "3rd Period Final",
                start: "08:45",
                end: "10:45"
            },

            {
                name: "Brunch",
                start: "10:45",
                end: "11:00"
            },

            {
                name: "Passing Period",
                start: "11:00",
                end: "11:05"
            },

            {
                name: "4th Period Final",
                start: "11:05",
                end: "13:05"
            }
        ],


        finalsDay3: [
            {
                name: "5th Period Final",
                start: "08:45",
                end: "10:45"
            },

            {
                name: "Brunch",
                start: "10:45",
                end: "11:00"
            },

            {
                name: "Passing Period",
                start: "11:00",
                end: "11:05"
            },

            {
                name: "6th Period Final",
                start: "11:05",
                end: "13:05"
            }
        ]
    },


    /* =========================================
       DATE EXCEPTIONS

       Important:
       If Wilcox confirms that a special schedule
       exists but PearBell does not have enough
       information to safely reconstruct it,
       we use "scheduleUnavailable" rather than
       guessing.
    ========================================== */

    exceptions: {

        /* ---------- AUGUST 2026 ---------- */

        "2026-08-11": {
            type: "scheduleUnavailable",
            label: "Special 1–7 schedule today — times not verified"
        },

        "2026-08-12": {
            type: "scheduleUnavailable",
            label: "Special 1–7 schedule today — times not verified"
        },


        /* ---------- SEPTEMBER 2026 ---------- */

        "2026-09-07": {
            type: "noSchool",
            label: "Labor Day — No School"
        },

        "2026-09-08": {
            type: "noSchool",
            label: "Professional Development — No School"
        },

        "2026-09-09": {
            type: "scheduleUnavailable",
            label: "Adjusted 1–7 schedule today — times not verified"
        },


        /* ---------- OCTOBER 2026 ---------- */

        "2026-10-09": {
            type: "scheduleUnavailable",
            label: "Homecoming special schedule — check Wilcox schedule"
        },

        "2026-10-12": {
            type: "noSchool",
            label: "No School"
        },

        "2026-10-13": {
            type: "noSchool",
            label: "No School"
        },

        "2026-10-14": {
            type: "scheduleUnavailable",
            label: "Adjusted 1–7 schedule today — times not verified"
        },


        /* ---------- NOVEMBER 2026 ---------- */

        "2026-11-10": {
            type: "scheduleUnavailable",
            label: "Adjusted 1–7 schedule today — times not verified"
        },

        "2026-11-11": {
            type: "noSchool",
            label: "Veterans Day — No School"
        },

        "2026-11-23": {
            type: "noSchool",
            label: "Thanksgiving Break — No School"
        },

        "2026-11-24": {
            type: "noSchool",
            label: "Thanksgiving Break — No School"
        },

        "2026-11-25": {
            type: "noSchool",
            label: "Thanksgiving Break — No School"
        },

        "2026-11-26": {
            type: "noSchool",
            label: "Thanksgiving Break — No School"
        },

        "2026-11-27": {
            type: "noSchool",
            label: "Thanksgiving Break — No School"
        },


        /* ---------- DECEMBER 2026 ---------- */

        "2026-12-15": {
            type: "scheduleUnavailable",
            label: "Adjusted 1–7 schedule today — times not verified"
        },

        "2026-12-16": {
            type: "specialSchedule",
            scheduleName: "finalsDay1",
            label: "Finals — Periods 1, 2, and 7"
        },

        "2026-12-17": {
            type: "specialSchedule",
            scheduleName: "finalsDay2",
            label: "Finals — Periods 3 and 4"
        },

        "2026-12-18": {
            type: "specialSchedule",
            scheduleName: "finalsDay3",
            label: "Finals — Periods 5 and 6"
        },

        "2026-12-21": {
            type: "noSchool",
            label: "Winter Break — No School"
        },

        "2026-12-22": {
            type: "noSchool",
            label: "Winter Break — No School"
        },

        "2026-12-23": {
            type: "noSchool",
            label: "Winter Break — No School"
        },

        "2026-12-24": {
            type: "noSchool",
            label: "Winter Break — No School"
        },

        "2026-12-25": {
            type: "noSchool",
            label: "Winter Break — No School"
        },

        "2026-12-28": {
            type: "noSchool",
            label: "Winter Break — No School"
        },

        "2026-12-29": {
            type: "noSchool",
            label: "Winter Break — No School"
        },

        "2026-12-30": {
            type: "noSchool",
            label: "Winter Break — No School"
        },

        "2026-12-31": {
            type: "noSchool",
            label: "Winter Break — No School"
        },


        /* ---------- JANUARY 2027 ---------- */

        "2027-01-01": {
            type: "noSchool",
            label: "Winter Break — No School"
        },

        "2027-01-04": {
            type: "noSchool",
            label: "Professional Development — No School"
        },

        "2027-01-18": {
            type: "noSchool",
            label: "Martin Luther King Jr. Day — No School"
        },


        /* ---------- FEBRUARY 2027 ---------- */

        "2027-02-15": {
            type: "noSchool",
            label: "February Break — No School"
        },

        "2027-02-16": {
            type: "noSchool",
            label: "February Break — No School"
        },

        "2027-02-17": {
            type: "noSchool",
            label: "February Break — No School"
        },

        "2027-02-18": {
            type: "noSchool",
            label: "February Break — No School"
        },

        "2027-02-19": {
            type: "noSchool",
            label: "February Break — No School"
        },


        /* ---------- MARCH 2027 ---------- */

        "2027-03-18": {
            type: "noSchool",
            label: "Professional Development — No School"
        },

        "2027-03-19": {
            type: "noSchool",
            label: "Professional Development — No School"
        },


        /* ---------- APRIL 2027 ---------- */

        "2027-04-12": {
            type: "noSchool",
            label: "Spring Break — No School"
        },

        "2027-04-13": {
            type: "noSchool",
            label: "Spring Break — No School"
        },

        "2027-04-14": {
            type: "noSchool",
            label: "Spring Break — No School"
        },

        "2027-04-15": {
            type: "noSchool",
            label: "Spring Break — No School"
        },

        "2027-04-16": {
            type: "noSchool",
            label: "Spring Break — No School"
        },


        /* ---------- MAY 2027 ---------- */

        "2027-05-31": {
            type: "noSchool",
            label: "Memorial Day — No School"
        }
    }
};
