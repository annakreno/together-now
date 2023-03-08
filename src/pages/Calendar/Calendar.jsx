
import "./Calendar.css";

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default function Calendar() {
    const todayObj = new Date();
    const todayStr = JSON.stringify(todayObj);
    const year = todayStr.slice(1, 5);
    function getDateInt(dateStr) {
        if (dateStr.slice(9, 11).slice(0,1) == 0) {
            return parseInt(dateStr.slice(9, 11).slice(1,2));
        } else {
            return parseInt(dateStr.slice(9, 11))
        }
    }
    const day = getDateInt(todayStr);
    const dayOfWeek = todayObj.getDay();
    function getMonthInt(month) {
        if (month.slice(0,1) == 0) {
            return parseInt(month.slice(1,2));
        } else {
            return parseInt(month);
        }
    };
    const month = getMonthInt(todayStr.slice(6, 8))

    function getFistDayOfMonth(day, dayOfWeek) {
        console.log(day + dayOfWeek)
        return day + dayOfWeek
    }

    const numEmptyDivs = getFistDayOfMonth(day, dayOfWeek)
    const emptyDivsArray = Array(numEmptyDivs).fill().map((_, idx) => <div className="calendarDays" key={idx}>empty</div>)

    const calendarDays = [
        {
            name: "January",
            noDays: 31,
        }, 
        {
            name: "February",
            noDays: 28,
        },
        {
            name: "March",
            noDays: 31,
        },
        {
            name: "April",
            noDays: 30,
        },
        {
            name: "May",
            noDays: 31,},
        {
            name: "June",
            noDays: 30,
        },
        {
            name: "July",
            noDays: 31,
        },
        {
            name: "August",
            noDays: 31,
        },
        {
            name: "September",
            noDays: 30,
        },
        {
            name: "October",
            noDays: 31,
        },
        {
            name: "November",
            noDays: 30,
        },
        {
            name: "December",
            noDays: 31,
        },
    ];

    const divsArray = Array(calendarDays[month - 1].noDays).fill().map((_, idx) => <div className="calendarDays" key={idx}> {idx + 1}</div>)

    return (
        <div className="calendarPageContainer">
            <div className="pageTitle">{calendarDays[month - 1].name}:</div>
            <div className="calendarContainer">
                <div className="daysOfWeek">
                    <div id="Sunday"> Sunday</div>
                    <div id="Monday"> Monday</div>
                    <div id="Tuesday"> Tuesday</div>
                    <div id="Wednesday"> Wednesday</div>
                    <div id="Thursday"> Thursday</div>
                    <div id="Friday"> Friday</div>
                    <div id="Saturday"> Saturday</div>
                </div>
                {emptyDivsArray}
                {divsArray}
            </div>
        </div>
    )
}