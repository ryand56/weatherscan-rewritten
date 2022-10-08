import * as React from "react";
import SlideHeaderScroll from "./SlideHeaderScroll";

const SlideHeader = () => (
    <>
        <div id="slides-header" className="absolute top-slidehead left-slidehead bg-slidehead h-slidehead text-slidehead whitespace-nowrap min-w-slidehead overflow-hidden relative text-white w-full p-slidehead">
            <SlideHeaderScroll />
            <div className="absolute w-gradient top-0 bg-slideheadgrad" />
        </div>
    </>
);

export default SlideHeader;
