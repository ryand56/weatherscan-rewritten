import * as React from "react";
import SlideBulletin from "./Slides/SlideBulletin";
import SlideCityInfo from "./Slides/SlideCityInfo";

const SlideContainer = () => {
    // Slideshow goes here

    return (
        <div id="info-slide-container" className="flex-1 max-h-[522px]">
            <SlideBulletin />
            <SlideCityInfo />
        </div>
    );
};

export default SlideContainer;
