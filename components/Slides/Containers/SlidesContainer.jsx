import * as React from "react";
import SlideHeader from "./Headers/SlideHeader";
import SlideSevereHeader from "./Headers/SlideSevereHeader";
import SlideSevereHeaderMsg from "./Headers/SlideSevereHeadMsg";
import SlideContainer from "./SlideContainer";

const SlidesContainer = () => (
    <>
        <div id="info-slides-container" className="absolute right-[75px] top-[92px] w-[887px] h-[569px] max-h-[569px] z-[1] p-slides">
            <SlideHeader />
            <SlideSevereHeader />
            <SlideSevereHeaderMsg />
            <SlideContainer />
        </div>
    </>
);

export default SlidesContainer;
