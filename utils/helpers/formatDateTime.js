/**
 * Format Date Helper Function
 * @param {string} dateTime - datetime string in the format "2025-12-25T16:35:17.734Z"
 * @returns {string, string} {date, timeWithExtension} - date in the format "25th December, 2025" and time in the format "4:35pm"
 */

export const formatDateTime = (dateTime) => {
    const month = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    };
    let [ date, time ] = dateTime.split("T");

    function getDayExtension(dayIndex) {
        dayIndex = dayIndex.split("")[1];
        switch(dayIndex) {
            case "1":
                return "st";
            case "2": 
                return "nd";
            case "3": 
                return "rd";
            default: 
                return "th";
        }
    };

    // format date
    let [ year, monthIndex, day ] = date.split("-");
    date = `${day < 10 ? day.split("")[1]: day}${getDayExtension(day)} ${month[monthIndex]}, ${year}`;

    // format time
    time = time.split(":");
    const timeWithExtension = time[0] > 12 ? `${Number(time[0]) - 12}:${time[1]}pm`: `${time[0]}:${time[1]}am`;

    return { date, timeWithExtension }
}
