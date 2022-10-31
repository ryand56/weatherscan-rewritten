import * as React from "react";
import SlideHeaderScroll from "./SlideHeaderScroll";

interface SlideHeaderProps {
    locations: string[]
    willUpdate: boolean
    cycleCallback: () => void
}

const SlideHeader = ({ locations, willUpdate, cycleCallback }: SlideHeaderProps) => (
    <>
        <div id="slides-header" className="bg-slidehead text-slidehead whitespace-nowrap min-w-slidehead overflow-hidden absolute top-[2.5px] left-[2.5px] h-[42.5px] text-white w-full p-slidehead">
            <SlideHeaderScroll locations={locations} willUpdate={willUpdate} cycleCallback={cycleCallback} />
            <div id="slides-header-gradient" className="absolute w-gradient top-0 bg-slideheadgrad h-full right-gradient-r" />
        </div>
    </>
);

export default SlideHeader;
