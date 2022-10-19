import * as React from "react";
import type { Location, CurrentCond } from "../hooks/useWeather";
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

const resizeWindow = (
    mainRef: React.MutableRefObject<HTMLDivElement>,
    winWidth: number,
    winHeight: number
) => {
    const mainAspect = 4/3;
    const windowAspect = winWidth / winHeight;
    let scale: number;

    const refWidth = mainRef.current.clientWidth;
    const refHeight = mainRef.current.clientHeight;

    if (windowAspect >= mainAspect) {
        scale = winHeight / refHeight;
    } else {
        scale = winWidth / refWidth;
    }

    mainRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
};

interface DisplayProps {
    winSize: number[]
    location: string | string[]
}

const Display = ({ winSize, location }: DisplayProps) => {
    const [innerWidth, innerHeight] = winSize;
    const mainRef = React.useRef<HTMLDivElement>();

    const resize = () => {
        resizeWindow(mainRef, innerWidth, innerHeight);
    };

    // Resize handler
    React.useEffect(() => {
        if (typeof window === undefined) {
            return;
        }

        if (mainRef && mainRef.current) {
            resize();
        }
    }, [mainRef, innerWidth, innerHeight]);

    const [locInfo, setLocInfo] = React.useState<Partial<Location>>(defaults);
    const [currentInfo, setCurrentInfo] = React.useState<Partial<CurrentCond>>(currentDefaults);

    // Location handler
    React.useEffect(() => {
        console.log(location);
        if (location !== "") {
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

    const fetchCurrent = (lat: number, lon: number) => {
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
        
        let intervalTimer: NodeJS.Timeout;
        if (lat && lon) {
            fetchCurrent(lat, lon);
            intervalTimer = setInterval(() => {
                fetchCurrent(lat, lon)
            }, 300000);
        }

        return () => clearInterval(intervalTimer);
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
                info={currentInfo}
            />
        </div>
    )
};

export default Display;
