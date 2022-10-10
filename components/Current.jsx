import * as React from "react";

/*
    <div
        id="current-info"
        className="font-parrow text-info absolute left-info-l top-info-t text-left w-info font-normal leading-info transform scale-x-106 scale-y-100 origin-left whitespace-normal text-shadow-none text-dark"
    >{info}</div>
*/
const Current = ({ temp }) => (
    <div id="current-conditions" className="font-interstate absolute top-current-t left-0 h-current w-current text-left z-current">
        {(typeof temp === "number") ? <>
            <div id="current-now" className="text-now absolute top-now-t left-now-l tracking-now text-left transform scale-x-105 scale-y-100 origin-left font-interstate font-bold text-shadow-none text-right text-dark z-now">now</div>
            <div
                id="current-nowwide"
                className="text-now absolute top-now-t left-nowwide-l tracking-now text-left transform scale-x-105 scale-y-100 origin-left font-interstate font-bold text-shadow-none text-dark"
            >now</div>
            <div
                id="current-temp"
                className="text-temp absolute top-temp-t -left-temp-l text-center w-full transform scale-x-102-5 scale-y-100 origin-left font-interstate font-bold text-shadow-none text-dark"
            >{temp}</div>
        </> : <>
            <div
                id="current-noreport"
                className="font-interstate2 font-semibold text-current-noreport absolute top-current-noreport-t left-current-noreport-l text-left w-current-noreport leading-none tracking-current-noreport transform scale-x-110 scale-y-100 text-shadow-noreport origin-left text-dark"
            >no report</div>
        </>}
    </div>
);

export default Current;
