import * as React from "react";
import SlideBulletin from "./Slides/SlideBulletin";

const SlideContainer = () => {
    // Slideshow goes here

    // <SlideCityInfo />
    return (
        <div id="info-slide-container" className="flex-1 max-h-[522px]">
            <SlideBulletin />
        </div>
    );
};

export default SlideContainer;
