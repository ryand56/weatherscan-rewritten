import * as React from "react";
import type { Location, CurrentCond, Alert } from "../hooks/useWeather";
import {
    defaults,
    currentDefaults,
    getMainLocation,
    getClosestLocation,
    getCurrentCond,
    getAlerts,
    getAlertText
} from "../hooks/useWeather";

import SlideBg from "./Slides/SlideBg";
import SlidesContainer from "./Slides/Containers/SlidesContainer";
import DateTime from "./DateTime";
import CCIcon from "./CCIcon";
import Current from "./Current";
import LogoArea from "./LogoArea";
import InfoMarquee from "./Marquee";
import MarqueeSevere from "./MarqueeSevere";

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
    isReady: boolean
    winSize: number[]
    location: string
    language: string
    setMainVol: React.Dispatch<React.SetStateAction<number>>
}

const Display = ({ isReady, winSize, location, language, setMainVol }: DisplayProps) => {
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
    const [extraInfo, setExtraInfo] = React.useState<Map<string, Partial<CurrentCond>>>(new Map<string, Partial<CurrentCond>>());

    const [alerts, setAlerts] = React.useState<Alert[]>([]);
    const [focusedAlert, setFocusedAlert] = React.useState<Alert>(null);
    const [focusedAlertText, setFocusedAlertText] = React.useState<string>(null);

    // Location handler
    React.useEffect(() => {
        if (isReady) {
            if (location !== "") {
                getMainLocation(location, language).then(data => {
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
        }
    }, [isReady, location]);

    const fetchCurrent = (lat: number, lon: number) => {
        getCurrentCond(lat, lon, language).then(data => {
            setCurrentInfo(data);
        }).catch(err => {
            console.error(err);
        });
    };

    const fetchAlerts = (lat: number, lon: number) => {
        getAlerts(lat, lon, language).then(data => {
            setAlerts(data);
        }).catch(err => {
            console.error(err);
        });
    };

    // Current conditions and alerts handler
    React.useEffect(() => {
        if (isReady) {
            const lat = locInfo.latitude;
            const lon = locInfo.longitude;
            
            let intervalTimer: NodeJS.Timeout;
            if (lat && lon) {
                fetchCurrent(lat, lon);
                fetchAlerts(lat, lon);
                intervalTimer = setInterval(() => {
                    fetchCurrent(lat, lon);
                    fetchAlerts(lat, lon);
                }, 300000);
            }

            return () => clearInterval(intervalTimer);
        }
    }, [isReady, locInfo.latitude, locInfo.longitude]);

    React.useEffect(() => {
        if (alerts.length > 0) {
            setFocusedAlert(alerts[0]);
            getAlertText(alerts[0].detailKey, language).then(texts => {
                if (texts.length > 0) {
                    setFocusedAlertText(texts[0].description);
                }
            }).catch(err => {
                console.error(err);
            })
        }
    }, [alerts.length]);

    /*
        <InfoMarquee
            top="Hello World"
            bottom="This is some text. | This is some other text. | Demo"
        />
    */
    return (
        <div id="main" ref={mainRef} className="relative top-1/2 left-1/2 overflow-hidden w-main h-main">
            <img className="block max-h-full max-w-full" src="/images/template-4k.png" alt="background" />
            <SlideBg />
            {isReady && <SlidesContainer setMainVol={setMainVol} currentCityInfo={currentInfo} />}
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
            <LogoArea />
            <InfoMarquee
                top="Hello World"
                bottom="We have currently partnered with Indigo Wireless to offer great wireless service in Tioga County! Go to indigowireless.com or stop in at 100 Main in Wellsboro for more information on this promo. | Save $5.00 a month with easy, painless auto pay system. Sign up Today! | In weeks to come we will be making upgrades to our network to serve your TV experience better! You may experience brief No Signal mesages on your TV. If the message stays on your TV for more than 4 hours please reboot the TV and call us. | Remember that this is all made possible with help from the Weather Ranch Discord Server! | Help from MapGuy11, Goldblaze, and TWCJon! | To stay up to date with all the latest on the emulator join the Discord Server! https://discord.gg/4TpAsRtsAx | NextJs version inspired from https://github.com/buffbears/Weatherscan |"
            />
            {focusedAlert && <MarqueeSevere
                top={focusedAlert.eventDescription}
                bottom={focusedAlertText}
            />}
        </div>
    );
};

export default Display;
