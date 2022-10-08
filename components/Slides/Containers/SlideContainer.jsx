import * as React from "react";
import SlideBulletin from "./Slides/SlideBulletin";
import SlideSevereCityInfo from "./Slides/SlideSevereCityInfo";

const SlideContainer = () => (
    <>
        <div id="info-slide-container" className="flex-1 max-h-[522px]">
            <SlideBulletin />
            <SlideSevereCityInfo />
        </div>
    </>
);

export default SlideContainer;
