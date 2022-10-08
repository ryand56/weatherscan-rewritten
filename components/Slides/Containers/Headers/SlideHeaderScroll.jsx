import * as React from "react";

const SlideHeaderScroll = ({ message }) => (
    <>
        <div
            className="relative inline-block origin-left-center top-[50%] leading-hscroller font-interstate text-hscroller"
            style={{ transform: "scale(106%, 100%) translateY(-50%)" }}
        >{message ? message : ""}</div>
    </>
);

export default SlideHeaderScroll;
