import "./Calendar.css";

export default function Calendar() {
    const today = JSON.stringify(new Date());
    const year = today.slice(1, 5);
    const day = today.slice(9, 11)
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
    ]
    
    function getMonth(month) {
        if (month.slice(0,1) == 0) {
            return parseInt(month.slice(1,2));
        } else {
            return parseInt(month);
        }
    };

    function getDayOfWeek(num) {
        return <div>{num}</div>
    }

    const monthIdx = getMonth(today.slice(6, 8)) - 1;

    const dayOfWeek = getDayOfWeek(12)

    const divsArray = Array(calendarDays[monthIdx].noDays).fill().map((_, idx) => <div className="calendarDays" key={idx}> {idx + 1}</div>)

    return (
        <div className="calendarPageContainer">
            <div className="pageTitle">{calendarDays[monthIdx].name}:</div>
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
                {dayOfWeek}
                {divsArray}
            </div>
        </div>
    )
}