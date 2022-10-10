import * as React from "react";
import { getMainLocation } from "../hooks/useWeather";

import SlideBg from "./Slides/SlideBg";
import SlidesContainer from "./Slides/Containers/SlidesContainer";
import DateTime from "./DateTime";
import CCIcon from "./CCIcon";
import Current from "./Current";

const resizeWindow = (mainRef, winWidth, winHeight) => {
    const mainAspect = 4/3;
    const windowAspect = winWidth / winHeight;
    let scale;

    const refWidth = mainRef.current.clientWidth;
    const refHeight = mainRef.current.clientHeight;

    if (windowAspect >= mainAspect) {
        scale = winHeight / refHeight;
    } else {
        scale = winWidth / refWidth;
    }

    mainRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
};

const Display = ({ winSize, location }) => {
    const [innerWidth, innerHeight] = winSize;
    const mainRef = React.useRef();

    const resizeListener = (e) => {
        resizeWindow(mainRef, innerWidth, innerHeight);
    };

    // Resize handler
    React.useEffect(() => {
        if (typeof window === undefined) {
            return;
        }

        if (mainRef && mainRef.current) {
            resizeListener();
        }
    }, [mainRef, innerWidth, innerHeight]);

    const [city, setCity] = React.useState(null);

    // Location handler
    React.useEffect(() => {
        if (location) {
            getMainLocation(location).then(data => {
                setCity(data.city);
            }).catch(err => {
                console.error(err);
            });
        }
    }, [location]);

    return (
        <div id="main" ref={mainRef} className="relative top-1/2 left-1/2 overflow-hidden w-[1440px] h-[1080px] will-change-transform">
            <img className="block max-h-full max-w-full" src="/images/template-4k.png" />
            <SlideBg />
            <SlidesContainer />
            <DateTime />
            {city && <div
                id="city"
                className="font-interstate font-semibold text-city pt-city-t absolute text-left ml-city-l w-city h-city top-city-t left-0 leading-city flex items-center transform scale-x-103 scale-y-100 origin-left"
            >{city}</div>}
            <CCIcon />
            <Current />
        </div>
    )
};

export default Display;
