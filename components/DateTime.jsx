import * as React from "react";

const DateTime = () => {
    const [date, setDate] = React.useState("Jan 01");
    const [time, setTime] = React.useState("12:00:00pm");

    const updateTime = () => {
        const date = new Date();
        
        const formatDate = date.toString().slice(4, 10).trimEnd();
        const formatTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
            minute: "numeric",
            second: "numeric"
        }).replace(/ /g, "").toLowerCase();

        setDate(formatDate);
        setTime(formatTime);
    };

    React.useEffect(() => {
        updateTime();
        let interval = setInterval(updateTime, 500);

        return () => {
            clearInterval(interval);
            interval = 0;
        };
    }, []);

    return (
        <div id="date-time" className="absolute top-date-time-t w-date-time font-interstate font-bold text-shadow-none text-right text-dark">
            <div id="date" className="font-interstate-mono text-date leading-date font-bold text-shadow-none text-right text-dark">{date}</div>
            <div id="time" className="font-interstate-mono text-date leading-date font-bold text-shadow-none text-right text-dark">{time}</div>
        </div>
    );
};

export default DateTime;
