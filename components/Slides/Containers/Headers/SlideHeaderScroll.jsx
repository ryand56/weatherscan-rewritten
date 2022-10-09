import * as React from "react";

const SlideHeaderScroll = ({ message }) => (
    <>
        <div
            className="transform scale-x-106 scale-y-100 -translate-y-1/2 relative inline-block origin-left-center top-1/2 leading-hscroller font-interstate text-hscroller"
        >{message ? message : ""}</div>
    </>
);

export default SlideHeaderScroll;
