import * as React from "react";

const Current = ({ temp, info }) => (
    <div id="current-conditions" className="font-interstate absolute top-current-t left-0 h-current w-current text-left z-current">
        {(typeof temp === "string" && typeof info === "string") ? <>
            <div id="current-now" className="font-interstate font-bold text-shadow-none text-right text-dark z-now">now</div>
            <div
                id="current-nowwide"
                className="text-nowwide absolute top-nowwide-t left-nowwide-l tracking-nowwide text-left transform scale-x-105 scale-y-100 origin-left"
            >now</div>
            <div
                id="current-temp"
                className="text-temp absolute top-temp-t -left-temp-l text-center w-full transform scale-x-102-5 scale-y-100 origin-left"
            >{temp}</div>
            <div
                id="current-info"
                className="font-parrow text-info absolute left-info-l top-info-t text-left w-info font-normal leading-info transform scale-x-106 scale-y-100 origin-left whitespace-normal text-shadow-none text-dark"
            >{info}</div>
        </> : <>
            <div
                id="current-noreport"
                className="font-interstate2 font-semibold text-current-noreport absolute top-current-noreport-t left-current-noreport-l text-left w-current-noreport leading-none tracking-current-noreport transform scale-x-110 scale-y-100 text-shadow-noreport origin-left text-dark"
            >no report</div>
        </>}
    </div>
);

export default Current;
