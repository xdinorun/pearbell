window.PearBellSchedules = window.PearBellSchedules || {};

window.PearBellSchedules.wilcox = {
    name: "Adrian Wilcox High School",
    schoolYear: "2026-2027",

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
    },

    // Special dates for this school year will go here.
    // Example:
    //
    // exceptions: {
    //     "2026-09-07": {
    //         type: "noSchool",
    //         label: "Labor Day"
    //     }
    // }

    exceptions: {}
};
