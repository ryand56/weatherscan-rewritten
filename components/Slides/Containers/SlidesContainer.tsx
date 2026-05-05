import * as React from "react";
import type { Location, ExtraInfo } from "../../../hooks/useWeather";
import SlideHeader from "./Headers/SlideHeader";
import { VocalFemale } from "../../../components/VocalAudio";
import VocalAudio from "../../../components/VocalAudio";

import { SlideshowReducer, Slides, ActionType } from "../../../hooks/useSlides";

// Lazy load individual slides
const City = React.lazy(() => import(
    "./Slides/City" /* webpackChunkName: "citySlide", webpackPreload: true */
));
const Health = React.lazy(() => import(
    "./Slides/Health" /* webpackChunkName: "healthSlide", webpackPreload: true */
));
const Travel = React.lazy(() => import(
    "./Slides/Travel" /* webpackChunkName: "travelSlide", webpackPreload: true */
));
const Airports = React.lazy(() => import(
    "./Slides/Airports" /* webpackChunkName: "airportsSlide", webpackPreload: true */
));
const International = React.lazy(() => import(
    "./Slides/International" /* webpackChunkName: "intSlide", webpackPreload: true */
));

interface SlidesContainerProps {
    debug: boolean
    setMainVol: React.Dispatch<React.SetStateAction<number>>
    locInfo?: Partial<Location>
    mainCityInfo?: ExtraInfo
    extraCityInfo?: Map<string, ExtraInfo>
    introLoaded: boolean
    setIntroLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

const getRandomIdx = (max?: number, min?: number) => {
    const minIdx = min ?? 0;
    const maxIdx = max ?? 5;
    return Math.floor(Math.random() * (maxIdx - minIdx) + minIdx);
};

const SlidesContainer = ({ debug, setMainVol, locInfo, mainCityInfo, extraCityInfo, introLoaded, setIntroLoaded }: SlidesContainerProps) => {    
    const [slideState, slideDispatch] = React.useReducer(SlideshowReducer, { index: 0, isCity: true });
    const [vocal, setVocal] = React.useState<VocalFemale>(null);
    const [headerWillUpdate, setHeaderUpdate] = React.useState<boolean>(false);

    const SetVocalDebounce = (vocal: VocalFemale) : Promise<void> => {
        return new Promise(resolve => {
            setVocal(vocal);
            setTimeout(() => {
                setVocal(null);
                resolve();
            }, 500);
        });
    };

    const [cityInfo, setCityInfo] = React.useState<Map<string, ExtraInfo>>(extraCityInfo);
    const [currentCity, setCurrentCity] = React.useState<string>(locInfo.city);
    const [currentInfo, setCurrentInfo] = React.useState<ExtraInfo>(mainCityInfo);

    const isExtraLoc = (location: string) => {
        const extraLoc = extraCityInfo.get(location);
        if (extraLoc !== undefined) {
            return location !== locInfo.city;
        }

        return false;
    };

    const header = React.useMemo(() => {
        return cityInfo ? Array.from(cityInfo.keys()) : [];
    }, [cityInfo]);
    const random = React.useMemo(() => {
        if (header.length === 0) return "";

        let rand = header[getRandomIdx(header.length)];

        let attempts = 0;
        while (!isExtraLoc(rand) && attempts < 10) {
            rand = header[getRandomIdx(header.length)];
            attempts++;
        };

        return rand;
    }, [header]);

    const SlideCallback = React.useCallback(() => setHeaderUpdate(true), [slideState.index]);

    const currentSlide = React.useMemo(() => {
        if (currentCity && currentInfo) {
            if (debug) console.log("Rendering new slide");
            switch (slideState.index) {
                case Slides.CITY:
                    return <City
                        next={SlideCallback}
                        debug={debug}
                        location={currentCity}
                        currentCityInfo={currentInfo}
                        isLoaded={introLoaded}
                        setLoaded={setIntroLoaded}
                        setVocal={SetVocalDebounce}
                    />;
                case Slides.HEALTH:
                    return <Health next={SlideCallback} />;
                case Slides.TRAVEL:
                    return <Travel next={SlideCallback} />;
                case Slides.AIRPORTS:
                    return <Airports next={SlideCallback} />;
                case Slides.INTERNATIONAL:
                    return <International next={SlideCallback} />;
                default:
                    return null;
            }
        }

        return null;
    }, [slideState.index, SlideCallback, currentCity, currentInfo]);



    const locationList = React.useMemo(() => {
        if (!cityInfo || header.length === 0 || random === "") return [];
        return [
            locInfo.city,
            "Health",
            "Travel",
            random,
            ...header,
            "Airports",
            "International",
            ...header.slice().reverse(),
            "Travel"
        ];
    }, [header, random, locInfo.city, cityInfo]);

    const HeaderStartCallback = (toSelect: string) => {
        if (debug) console.log("Header moving to:", toSelect);

        const selectedInfo = cityInfo.get(toSelect);
        if (selectedInfo !== undefined) {
            setCurrentCity(toSelect);
            setCurrentInfo(selectedInfo);
            slideDispatch({ type: ActionType.SET, payload: 0, payloadCity: true });
            return;
        }

        const found = Object.entries(Slides).find(
            ([key]) => key === toSelect.toUpperCase()
        );

        if (found) {
            const [_, slideIdx] = found;
            slideDispatch({
                type: ActionType.SET,
                payload: slideIdx as number,
                payloadCity: false
            });
        } else {
            slideDispatch({ type: ActionType.INCREASE, payload: 1 });
        }
    };

    const HeaderFinishCallback = (selected: string) => {
        setHeaderUpdate(false);
    };

    return (
        <div id="info-slides-container" className="flex flex-col absolute right-infoslides-container-r top-infoslides-container-t w-infoslides-container h-infoslides-container max-h-infoslides-container z-[1] p-slides">
            <SlideHeader
                locations={locationList}
                willUpdate={headerWillUpdate}
                startCallback={HeaderStartCallback}
                finishCallback={HeaderFinishCallback}
            />
            <div id="info-slide-container" className="absolute top-infoslide-container-t h-infoslide-container w-infoslide-container">
                <VocalAudio vocal={vocal} setMainVol={setMainVol} />
                <React.Suspense fallback={<div>Loading...</div>}>
                    {currentSlide}
                </React.Suspense>
            </div>
        </div>
    );
};

export default SlidesContainer;
