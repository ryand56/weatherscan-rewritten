import * as React from "react";
import SlideHeaderScroll from "./SlideHeaderScroll";

const SlideSevereHeader = () => (
    <>
        <div id="severe-header" className="absolute top-slidehead left-slidehead bg-slidehead h-slidehead text-slidehead whitespace-nowrap min-w-slidehead overflow-hidden hidden">
            <SlideHeaderScroll />
            <div className="absolute w-gradient top-0 bg-slideheadgrad" />
        </div>
    </>
);

export default SlideSevereHeader;
