import * as React from "react";
import SlideHeaderScroll from "./SlideHeaderScroll";

const SlideSevereHeadMsg = () => (
    <>
        <div id="severe-header-weathermessage" className="absolute top-slidehead left-slidehead bg-slidehead h-slidehead text-slidehead whitespace-nowrap min-w-slidehead overflow-hidden hidden">
            <SlideHeaderScroll message="SEVERE WEATHER UPDATE" />
            <div className="absolute w-gradient top-0 bg-slideheadgrad" />
        </div>
    </>
);

export default SlideSevereHeadMsg;
