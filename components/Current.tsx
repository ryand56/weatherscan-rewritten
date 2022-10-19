import * as React from "react";
import type { CurrentCond } from "../hooks/useWeather";

interface CurrentProps {
    temp: number
    info: Partial<CurrentCond>
}

const Current = ({ temp, info }: CurrentProps) => {
    const [cycle, setCycle] = React.useState<string[]>([]);
    const [idx, setIdx] = React.useState<number>(0);
    const [infoMsg, setInfoMsg] = React.useState<string>("");

    React.useEffect(() => {
        let intervalTimer: NodeJS.Timeout;
        if (info) {
            if (info.phrase !== "") {
                const tempCycle = [
                    `visibility ${info.visib} ${info.visib != 1 ? "miles" : "mile"}`,
                    `UV index ${info.uvIndex}`,
                    info.phrase,
                    `wind ${info.wind}`,
                    `humidity ${info.humidity}%`,
                    `dew point ${info.dewpt}°`,
                    `pressure ${info.pres}`
                ];

                setCycle(tempCycle);
    
                intervalTimer = setInterval(() => {
                    setIdx((idx) => {
                        if (idx >= (tempCycle.length - 1)) {
                            return 0;
                        } else {
                            return idx + 1;
                        }
                    });
                }, 6000);
            }
        }

        return () => clearInterval(intervalTimer);
    }, [info]);

    React.useEffect(() => {
        if (cycle) {
            if (cycle.length > 0) {
                const msg = cycle[idx];
                setInfoMsg(msg);
            }
        }
    }, [idx]);

    return (
        <div id="current-conditions" className="font-interstate absolute top-current-t left-0 h-current w-current text-left z-current">
            {(temp !== NaN) ? <>
                <div id="current-now" className="text-now absolute top-now-t left-now-l tracking-now text-left transform scale-x-105 scale-y-100 origin-left font-interstate font-bold text-shadow-none text-right text-dark z-now">now</div>
                <div
                    id="current-nowwide"
                    className="text-now absolute top-now-t left-nowwide-l tracking-now text-left transform scale-x-105 scale-y-100 origin-left font-interstate font-bold text-shadow-none text-dark"
                >now</div>
                <div
                    id="current-temp"
                    className="text-temp absolute top-temp-t -left-temp-l text-center w-full transform scale-x-102-5 scale-y-100 origin-left font-interstate font-bold text-shadow-none text-dark"
                >{temp}</div>
                <div
                    id="current-info"
                    className="font-parrow text-info absolute left-info-l top-info-t text-left w-info font-normal leading-info transform scale-x-106 scale-y-100 origin-left whitespace-normal text-shadow-none text-dark"
                >{infoMsg}</div>
            </> : <>
                <div
                    id="current-noreport"
                    className="font-interstate2 font-semibold text-current-noreport absolute top-current-noreport-t left-current-noreport-l text-left w-current-noreport leading-none tracking-current-noreport transform scale-x-110 scale-y-100 text-shadow-noreport origin-left text-dark"
                >no report</div>
            </>}
        </div>
    );
};

export default Current;
