import * as React from "react";
import SlideHeaderScroll from "./SlideHeaderScroll";

interface SlideHeaderProps {
    locations: string[]
}

const SlideHeader = ({ locations }: SlideHeaderProps) => (
    <>
        <div id="slides-header" className="flex-1 bg-slidehead min-h-slidehead max-h-slidehead text-slidehead whitespace-nowrap min-w-slidehead overflow-hidden relative text-white w-full p-slidehead">
            <SlideHeaderScroll locations={locations} />
            <div id="slides-header-gradient" className="absolute w-gradient top-0 bg-slideheadgrad h-full right-gradient-r" />
        </div>
    </>
);

export default SlideHeader;
