import * as React from "react";
import {
    defaults,
    currentDefaults,
    getMainLocation,
    getClosestLocation,
    getCurrentCond
} from "../hooks/useWeather";

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

    const [locInfo, setLocInfo] = React.useState(defaults);
    const [currentInfo, setCurrentInfo] = React.useState(currentDefaults);

    // Location handler
    React.useEffect(() => {
        console.log(location);
        if (location !== null) {
            getMainLocation(location).then(data => {
                setLocInfo(data);
            }).catch(err => {
                console.error(err);
            });
        } else {
            getClosestLocation().then(data => {
                setLocInfo(data);
            }).catch(err => {
                console.error(err);
            });
        }
    }, [location]);

    const fetchCurrent = (lat, lon) => {
        getCurrentCond(lat, lon).then(data => {
            setCurrentInfo(data);
        }).catch(err => {
            console.error(err);
        });
    };

    // Current conditions handler
    React.useEffect(() => {
        const lat = locInfo.latitude;
        const lon = locInfo.longitude;
        
        let intervalTimer;
        if (lat && lon) {
            fetchCurrent(lat, lon);
            intervalTimer = setInterval(() => {
                fetchCurrent(lat, lon)
            }, 300000);
        }

        return () => {
            clearInterval(intervalTimer);
            intervalTimer = 0;
        }
    }, [locInfo.latitude, locInfo.longitude]);

    return (
        <div id="main" ref={mainRef} className="relative top-1/2 left-1/2 overflow-hidden w-main h-main">
            <img className="block max-h-full max-w-full" src="/images/template-4k.png" />
            <SlideBg />
            <SlidesContainer />
            {locInfo.timezone !== "" && <DateTime tz={locInfo.timezone} />}
            {locInfo.city !== "" && <div
                id="city"
                className="font-interstate font-semibold text-city pt-city-t absolute text-left ml-city-l w-city h-city top-city-t left-0 leading-city flex items-center transform scale-x-103 scale-y-100 origin-left"
            >{locInfo.city}</div>}
            <CCIcon iconCode={currentInfo.icon} windData={currentInfo.windSpeed} />
            <Current
                key={currentInfo.phrase}
                temp={currentInfo.temp}
                info={{
                    visib: currentInfo.visib,
                    uvindex: currentInfo.uvIndex,
                    phrase: currentInfo.phrase,
                    wind: currentInfo.wind,
                    humidity: currentInfo.humidity,
                    dewpt: currentInfo.dewpt,
                    pres: currentInfo.pres
                }}
            />
        </div>
    )
};

export default Display;
